import { Sparkles, Zap, BookOpen, FileText, CheckSquare, Layers } from 'lucide-react';
import { GlowingBox } from '@/components/ui/GlowingBox';
import { FlameButton } from '@/components/ui/FlameButton';
import { NeonButton } from '@/components/ui/NeonButton';
import { useCourseStore } from '@/store/courseStore';

interface GenerationOptionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  loading?: boolean;
}

function GenerationOption({ icon, title, description, onClick, loading }: GenerationOptionProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="w-full p-3 rounded-lg bg-prometheus-bg-tertiary border border-prometheus-border-primary hover:border-prometheus-cyan-500/30 hover:bg-prometheus-bg-secondary transition-all duration-200 text-left group"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-prometheus-cyan-500/10 text-prometheus-cyan-400 group-hover:bg-prometheus-cyan-500/20 transition-colors">
          {icon}
        </div>
        <div>
          <h4 className="text-sm font-medium text-prometheus-text-primary group-hover:text-prometheus-cyan-400 transition-colors">
            {title}
          </h4>
          <p className="text-xs text-prometheus-text-muted mt-0.5">{description}</p>
        </div>
      </div>
    </button>
  );
}

export function GeneratePanel() {
  const { isGenerating, generateContent, currentCourse } = useCourseStore();

  const handleGenerateFull = async () => {
    await generateContent('full');
  };

  const handleGenerateObjectives = async () => {
    await generateContent('objectives');
  };

  const handleGenerateModules = async () => {
    await generateContent('modules');
  };

  const handleGenerateAssessments = async () => {
    await generateContent('assessments');
  };

  const isConfigured = currentCourse?.title && currentCourse?.level && currentCourse?.thematic;

  return (
    <GlowingBox className="p-4" glowColor="flame" intensity="medium">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-prometheus-flame-400" />
        <h2 className="text-lg font-semibold text-prometheus-text-primary">
          AI Generation
        </h2>
      </div>

      {/* Status Indicator */}
      <div className="flex items-center gap-2 mb-4 p-2 rounded-lg bg-prometheus-bg-tertiary">
        <div
          className={`w-2 h-2 rounded-full ${
            isConfigured ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'
          }`}
        />
        <span className="text-xs text-prometheus-text-secondary">
          {isConfigured
            ? 'Ready to generate'
            : 'Configure course details to enable generation'}
        </span>
      </div>

      {/* Full Generation Button */}
      <FlameButton
        variant="primary"
        size="lg"
        icon={<Zap className="w-5 h-5" />}
        onClick={handleGenerateFull}
        loading={isGenerating}
        disabled={!isConfigured}
        className="w-full mb-4"
      >
        Generate Full Course
      </FlameButton>

      {/* Divider */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-px bg-prometheus-border-primary" />
        <span className="text-xs text-prometheus-text-muted uppercase">or generate</span>
        <div className="flex-1 h-px bg-prometheus-border-primary" />
      </div>

      {/* Individual Generation Options */}
      <div className="space-y-2">
        <GenerationOption
          icon={<BookOpen className="w-4 h-4" />}
          title="Learning Objectives"
          description="Generate terminal and enabling objectives"
          onClick={handleGenerateObjectives}
          loading={isGenerating}
        />

        <GenerationOption
          icon={<Layers className="w-4 h-4" />}
          title="Course Modules"
          description="Generate module structure and lessons"
          onClick={handleGenerateModules}
          loading={isGenerating}
        />

        <GenerationOption
          icon={<CheckSquare className="w-4 h-4" />}
          title="Assessments"
          description="Generate assessment criteria and rubrics"
          onClick={handleGenerateAssessments}
          loading={isGenerating}
        />

        <GenerationOption
          icon={<FileText className="w-4 h-4" />}
          title="Description"
          description="Generate course overview and description"
          onClick={() => generateContent('description')}
          loading={isGenerating}
        />
      </div>

      {/* Generation Progress */}
      {isGenerating && (
        <div className="mt-4 p-3 rounded-lg bg-prometheus-flame-500/10 border border-prometheus-flame-500/30">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-4 border-2 border-prometheus-flame-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-prometheus-flame-400">Generating...</span>
          </div>
          <div className="w-full h-1 bg-prometheus-bg-tertiary rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-prometheus-flame-500 to-prometheus-flame-400 animate-pulse w-2/3" />
          </div>
        </div>
      )}
    </GlowingBox>
  );
}
