import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type {
  Course,
  LearningObjective,
  ChatMessage,
  ExportFormat,
  AIGenerationRequest,
} from '@/types/course';
import { api } from '@/utils/api';

interface CourseState {
  // Course Data
  currentCourse: Partial<Course> | null;
  courses: Course[];

  // UI State
  isLoading: boolean;
  isSaving: boolean;
  isGenerating: boolean;
  isChatting: boolean;
  error: string | null;

  // Chat State
  chatMessages: ChatMessage[];

  // Course Actions
  createNewCourse: () => void;
  updateCourse: (updates: Partial<Course>) => void;
  saveCourse: () => Promise<void>;
  loadCourse: (id?: string) => Promise<void>;
  deleteCourse: (id: string) => Promise<void>;
  resetCourse: () => void;
  duplicateCourse: () => void;

  // Learning Objectives Actions
  addObjective: (objective: LearningObjective) => void;
  updateObjective: (id: string, updates: Partial<LearningObjective>) => void;
  removeObjective: (id: string) => void;
  reorderObjectives: (objectiveIds: string[]) => void;

  // AI Generation Actions
  generateContent: (type: AIGenerationRequest['generationType']) => Promise<void>;

  // Chat Actions
  sendChatMessage: (content: string) => Promise<void>;
  clearChat: () => void;

  // Export Actions
  exportCourse: (format: ExportFormat) => Promise<void>;

  // Utility Actions
  setError: (error: string | null) => void;
  clearError: () => void;
}

const createDefaultCourse = (): Partial<Course> => ({
  id: `course-${Date.now()}`,
  code: '',
  title: '',
  level: undefined,
  thematic: undefined,
  status: 'DRAFT',
  description: '',
  overview: '',
  targetAudience: '',
  duration: 0,
  deliveryMethod: undefined,
  learningObjectives: [],
  modules: [],
  assessments: [],
  metadata: {
    createdDate: new Date().toISOString(),
    updatedDate: new Date().toISOString(),
    author: '',
    version: '1.0.0',
  },
});

export const useCourseStore = create<CourseState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial State
        currentCourse: createDefaultCourse(),
        courses: [],
        isLoading: false,
        isSaving: false,
        isGenerating: false,
        isChatting: false,
        error: null,
        chatMessages: [],

        // Course Actions
        createNewCourse: () => {
          set({ currentCourse: createDefaultCourse() });
        },

        updateCourse: (updates) => {
          set((state) => ({
            currentCourse: state.currentCourse
              ? {
                  ...state.currentCourse,
                  ...updates,
                  metadata: {
                    ...state.currentCourse.metadata,
                    updatedDate: new Date().toISOString(),
                  } as Course['metadata'],
                }
              : null,
          }));
        },

        saveCourse: async () => {
          const { currentCourse } = get();
          if (!currentCourse) return;

          set({ isSaving: true, error: null });
          try {
            const response = await api.saveCourse(currentCourse as Course);
            set((state) => ({
              currentCourse: response,
              courses: state.courses.some((c) => c.id === response.id)
                ? state.courses.map((c) => (c.id === response.id ? response : c))
                : [...state.courses, response],
              isSaving: false,
            }));
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : 'Failed to save course',
              isSaving: false,
            });
          }
        },

        loadCourse: async (id) => {
          set({ isLoading: true, error: null });
          try {
            if (id) {
              const course = await api.getCourse(id);
              set({ currentCourse: course, isLoading: false });
            } else {
              const courses = await api.getCourses();
              set({ courses, isLoading: false });
            }
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : 'Failed to load course',
              isLoading: false,
            });
          }
        },

        deleteCourse: async (id) => {
          set({ isLoading: true, error: null });
          try {
            await api.deleteCourse(id);
            set((state) => ({
              courses: state.courses.filter((c) => c.id !== id),
              currentCourse:
                state.currentCourse?.id === id ? createDefaultCourse() : state.currentCourse,
              isLoading: false,
            }));
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : 'Failed to delete course',
              isLoading: false,
            });
          }
        },

        resetCourse: () => {
          set({ currentCourse: createDefaultCourse(), chatMessages: [] });
        },

        duplicateCourse: () => {
          const { currentCourse } = get();
          if (!currentCourse) return;

          const duplicated: Partial<Course> = {
            ...currentCourse,
            id: `course-${Date.now()}`,
            title: `${currentCourse.title || 'Untitled'} (Copy)`,
            code: `${currentCourse.code || ''}-COPY`,
            status: 'DRAFT',
            metadata: {
              ...currentCourse.metadata,
              createdDate: new Date().toISOString(),
              updatedDate: new Date().toISOString(),
            } as Course['metadata'],
          };

          set({ currentCourse: duplicated });
        },

        // Learning Objectives Actions
        addObjective: (objective) => {
          set((state) => ({
            currentCourse: state.currentCourse
              ? {
                  ...state.currentCourse,
                  learningObjectives: [
                    ...(state.currentCourse.learningObjectives || []),
                    objective,
                  ],
                }
              : null,
          }));
        },

        updateObjective: (id, updates) => {
          set((state) => ({
            currentCourse: state.currentCourse
              ? {
                  ...state.currentCourse,
                  learningObjectives: state.currentCourse.learningObjectives?.map((obj) =>
                    obj.id === id ? { ...obj, ...updates } : obj
                  ),
                }
              : null,
          }));
        },

        removeObjective: (id) => {
          set((state) => ({
            currentCourse: state.currentCourse
              ? {
                  ...state.currentCourse,
                  learningObjectives: state.currentCourse.learningObjectives?.filter(
                    (obj) => obj.id !== id && obj.parentId !== id
                  ),
                }
              : null,
          }));
        },

        reorderObjectives: (objectiveIds) => {
          set((state) => {
            if (!state.currentCourse?.learningObjectives) return state;

            const reordered = objectiveIds
              .map((id, index) => {
                const obj = state.currentCourse?.learningObjectives?.find((o) => o.id === id);
                return obj ? { ...obj, order: index } : null;
              })
              .filter(Boolean) as LearningObjective[];

            return {
              currentCourse: {
                ...state.currentCourse,
                learningObjectives: reordered,
              },
            };
          });
        },

        // AI Generation Actions
        generateContent: async (type) => {
          const { currentCourse } = get();
          if (!currentCourse) return;

          set({ isGenerating: true, error: null });
          try {
            const response = await api.generateContent({
              courseId: currentCourse.id || '',
              generationType: type,
              context: JSON.stringify({
                title: currentCourse.title,
                level: currentCourse.level,
                thematic: currentCourse.thematic,
                targetAudience: currentCourse.targetAudience,
              }),
            });

            if (response.success && response.data) {
              set((state) => ({
                currentCourse: state.currentCourse
                  ? { ...state.currentCourse, ...response.data }
                  : null,
                isGenerating: false,
              }));
            } else {
              throw new Error(response.message || 'Generation failed');
            }
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : 'Failed to generate content',
              isGenerating: false,
            });
          }
        },

        // Chat Actions
        sendChatMessage: async (content) => {
          const userMessage: ChatMessage = {
            id: `msg-${Date.now()}`,
            role: 'user',
            content,
            timestamp: new Date().toISOString(),
          };

          set((state) => ({
            chatMessages: [...state.chatMessages, userMessage],
            isChatting: true,
          }));

          try {
            const response = await api.sendChatMessage(content, get().currentCourse);

            const assistantMessage: ChatMessage = {
              id: `msg-${Date.now()}`,
              role: 'assistant',
              content: response.message || 'I apologize, but I could not process your request.',
              timestamp: new Date().toISOString(),
            };

            set((state) => ({
              chatMessages: [...state.chatMessages, assistantMessage],
              isChatting: false,
            }));
          } catch (error) {
            const errorMessage: ChatMessage = {
              id: `msg-${Date.now()}`,
              role: 'assistant',
              content: 'I apologize, but an error occurred. Please try again.',
              timestamp: new Date().toISOString(),
            };

            set((state) => ({
              chatMessages: [...state.chatMessages, errorMessage],
              isChatting: false,
              error: error instanceof Error ? error.message : 'Chat error',
            }));
          }
        },

        clearChat: () => {
          set({ chatMessages: [] });
        },

        // Export Actions
        exportCourse: async (format) => {
          const { currentCourse } = get();
          if (!currentCourse) return;

          set({ isLoading: true, error: null });
          try {
            const response = await api.exportCourse({
              courseId: currentCourse.id || '',
              format,
              includeMetadata: true,
            });

            if (response.success && response.downloadUrl) {
              window.open(response.downloadUrl, '_blank');
            }
            set({ isLoading: false });
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : 'Failed to export course',
              isLoading: false,
            });
          }
        },

        // Utility Actions
        setError: (error) => set({ error }),
        clearError: () => set({ error: null }),
      }),
      {
        name: 'prometheus-course-store',
        partialize: (state) => ({
          currentCourse: state.currentCourse,
          courses: state.courses,
          chatMessages: state.chatMessages,
        }),
      }
    )
  )
);
