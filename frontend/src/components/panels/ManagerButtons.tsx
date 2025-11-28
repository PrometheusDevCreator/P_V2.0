import { Save, FolderOpen, FileDown, Trash2, Copy, RefreshCw } from 'lucide-react';
import { GlowingBox } from '@/components/ui/GlowingBox';
import { NeonButton } from '@/components/ui/NeonButton';
import { FlameButton } from '@/components/ui/FlameButton';
import { useCourseStore } from '@/store/courseStore';

export function ManagerButtons() {
  const {
    saveCourse,
    loadCourse,
    exportCourse,
    resetCourse,
    duplicateCourse,
    isSaving,
    isLoading,
  } = useCourseStore();

  const handleSave = async () => {
    await saveCourse();
  };

  const handleLoad = () => {
    // Open file dialog or course list modal
    loadCourse();
  };

  const handleExport = async (format: 'json' | 'pdf' | 'docx') => {
    await exportCourse(format);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset the course? All unsaved changes will be lost.')) {
      resetCourse();
    }
  };

  const handleDuplicate = () => {
    duplicateCourse();
  };

  return (
    <GlowingBox className="p-4" glowColor="cyan" intensity="low">
      <h3 className="text-sm font-medium text-prometheus-text-secondary mb-3">
        Course Management
      </h3>

      <div className="flex flex-wrap gap-3">
        {/* Primary Actions */}
        <div className="flex gap-2">
          <FlameButton
            variant="primary"
            size="md"
            icon={<Save className="w-4 h-4" />}
            onClick={handleSave}
            loading={isSaving}
          >
            Save Course
          </FlameButton>

          <NeonButton
            variant="cyan"
            size="md"
            icon={<FolderOpen className="w-4 h-4" />}
            onClick={handleLoad}
            loading={isLoading}
          >
            Load Course
          </NeonButton>
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-10 bg-prometheus-border-primary" />

        {/* Export Options */}
        <div className="flex gap-2">
          <NeonButton
            variant="green"
            size="md"
            icon={<FileDown className="w-4 h-4" />}
            onClick={() => handleExport('json')}
          >
            Export JSON
          </NeonButton>

          <NeonButton
            variant="purple"
            size="md"
            icon={<FileDown className="w-4 h-4" />}
            onClick={() => handleExport('pdf')}
          >
            Export PDF
          </NeonButton>
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-10 bg-prometheus-border-primary" />

        {/* Secondary Actions */}
        <div className="flex gap-2">
          <NeonButton
            variant="cyan"
            size="md"
            icon={<Copy className="w-4 h-4" />}
            onClick={handleDuplicate}
          >
            Duplicate
          </NeonButton>

          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-prometheus-text-muted hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/30 transition-all duration-200"
          >
            <RefreshCw className="w-4 h-4" />
            Reset
          </button>

          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-prometheus-text-muted hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/30 transition-all duration-200"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>

      {/* Last Saved Info */}
      <div className="mt-3 pt-3 border-t border-prometheus-border-primary">
        <p className="text-xs text-prometheus-text-muted">
          Last saved: <span className="text-prometheus-text-secondary">Never</span>
        </p>
      </div>
    </GlowingBox>
  );
}
