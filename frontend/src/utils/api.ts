import axios from 'axios';
import type {
  Course,
  AIGenerationRequest,
  AIGenerationResponse,
  ExportRequest,
  ExportResponse,
} from '@/types/course';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const api = {
  // Course CRUD Operations
  async getCourses(): Promise<Course[]> {
    const response = await apiClient.get('/courses');
    return response.data;
  },

  async getCourse(id: string): Promise<Course> {
    const response = await apiClient.get(`/courses/${id}`);
    return response.data;
  },

  async saveCourse(course: Course): Promise<Course> {
    if (course.id && !course.id.startsWith('course-')) {
      // Update existing course
      const response = await apiClient.put(`/courses/${course.id}`, course);
      return response.data;
    } else {
      // Create new course
      const response = await apiClient.post('/courses', course);
      return response.data;
    }
  },

  async deleteCourse(id: string): Promise<void> {
    await apiClient.delete(`/courses/${id}`);
  },

  // AI Generation
  async generateContent(request: AIGenerationRequest): Promise<AIGenerationResponse> {
    const response = await apiClient.post('/ai/generate', request);
    return response.data;
  },

  // Chat
  async sendChatMessage(
    message: string,
    courseContext?: Partial<Course> | null
  ): Promise<{ message: string }> {
    const response = await apiClient.post('/ai/chat', {
      message,
      courseContext,
    });
    return response.data;
  },

  // Export
  async exportCourse(request: ExportRequest): Promise<ExportResponse> {
    const response = await apiClient.post('/export', request);
    return response.data;
  },

  // Lexicon
  async getLexicon(): Promise<Record<string, unknown>> {
    const response = await apiClient.get('/lexicon');
    return response.data;
  },
};

export default api;
