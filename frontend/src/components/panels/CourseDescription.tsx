import { FileText, Sparkles } from 'lucide-react';
import { GlowingBox } from '@/components/ui/GlowingBox';
import { NeonButton } from '@/components/ui/NeonButton';
import { useCourseStore } from '@/store/courseStore';

export function CourseDescription() {
  const { currentCourse, updateCourse, isGenerating, generateContent } = useCourseStore();

  const handleOverviewChange = (value: string) => {
    updateCourse({ overview: value });
  };

  const handleDescriptionChange = (value: string) => {
    updateCourse({ description: value });
  };

  const handleGenerateDescription = async () => {
    await generateContent('description');
  };

  return (
    <GlowingBox className="p-4" glowColor="cyan" intensity="medium">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-prometheus-cyan-400" />
          <h2 className="text-lg font-semibold text-prometheus-text-primary">
            Course Description
          </h2>
        </div>
        <NeonButton
          variant="purple"
          size="sm"
          icon={<Sparkles className="w-4 h-4" />}
          onClick={handleGenerateDescription}
          loading={isGenerating}
        >
          AI Generate
        </NeonButton>
      </div>

      <div className="space-y-4">
        {/* Course Overview */}
        <div>
          <label className="block text-xs text-prometheus-text-muted uppercase tracking-wide mb-1">
            Course Overview
            <span className="text-prometheus-text-muted/60 ml-1">(Brief summary)</span>
          </label>
          <textarea
            value={currentCourse?.overview || ''}
            onChange={(e) => handleOverviewChange(e.target.value)}
            placeholder="Provide a brief overview of the course (2-3 sentences)..."
            className="prometheus-textarea h-24"
          />
          <div className="flex justify-between mt-1">
            <span className="text-xs text-prometheus-text-muted">
              Recommended: 50-100 words
            </span>
            <span className="text-xs text-prometheus-text-muted">
              {currentCourse?.overview?.split(/\s+/).filter(Boolean).length || 0} words
            </span>
          </div>
        </div>

        {/* Full Description */}
        <div>
          <label className="block text-xs text-prometheus-text-muted uppercase tracking-wide mb-1">
            Full Description
            <span className="text-prometheus-text-muted/60 ml-1">(Detailed)</span>
          </label>
          <textarea
            value={currentCourse?.description || ''}
            onChange={(e) => handleDescriptionChange(e.target.value)}
            placeholder="Provide a comprehensive description of the course content, learning outcomes, and what students will gain..."
            className="prometheus-textarea h-40"
          />
          <div className="flex justify-between mt-1">
            <span className="text-xs text-prometheus-text-muted">
              Recommended: 150-300 words
            </span>
            <span className="text-xs text-prometheus-text-muted">
              {currentCourse?.description?.split(/\s+/).filter(Boolean).length || 0} words
            </span>
          </div>
        </div>

        {/* Writing Tips */}
        <div className="p-3 rounded-lg bg-prometheus-bg-tertiary border border-prometheus-border-primary">
          <p className="text-xs text-prometheus-text-muted">
            <span className="text-prometheus-cyan-400 font-medium">Tip:</span> A good course
            description should include the main topics covered, the skills participants will
            develop, and any prerequisites or prior knowledge required.
          </p>
        </div>
      </div>
    </GlowingBox>
  );
}
