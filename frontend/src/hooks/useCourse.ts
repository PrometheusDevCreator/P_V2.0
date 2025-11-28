import { useCallback } from 'react';
import { useCourseStore } from '@/store/courseStore';

export function useCourse() {
  const store = useCourseStore();

  const isValid = useCallback(() => {
    const { currentCourse } = store;
    if (!currentCourse) return false;

    return Boolean(
      currentCourse.title?.trim() &&
      currentCourse.level &&
      currentCourse.thematic
    );
  }, [store]);

  const getCompletionPercentage = useCallback(() => {
    const { currentCourse } = store;
    if (!currentCourse) return 0;

    let completed = 0;
    const total = 10;

    if (currentCourse.title?.trim()) completed++;
    if (currentCourse.code?.trim()) completed++;
    if (currentCourse.level) completed++;
    if (currentCourse.thematic) completed++;
    if (currentCourse.description?.trim()) completed++;
    if (currentCourse.overview?.trim()) completed++;
    if (currentCourse.targetAudience?.trim()) completed++;
    if (currentCourse.duration && currentCourse.duration > 0) completed++;
    if (currentCourse.deliveryMethod) completed++;
    if (currentCourse.learningObjectives && currentCourse.learningObjectives.length > 0) completed++;

    return Math.round((completed / total) * 100);
  }, [store]);

  const getTerminalObjectives = useCallback(() => {
    return store.currentCourse?.learningObjectives?.filter(
      (obj) => obj.type === 'terminal'
    ) || [];
  }, [store.currentCourse?.learningObjectives]);

  const getEnablingObjectives = useCallback((terminalId: string) => {
    return store.currentCourse?.learningObjectives?.filter(
      (obj) => obj.type === 'enabling' && obj.parentId === terminalId
    ) || [];
  }, [store.currentCourse?.learningObjectives]);

  return {
    ...store,
    isValid,
    getCompletionPercentage,
    getTerminalObjectives,
    getEnablingObjectives,
  };
}
