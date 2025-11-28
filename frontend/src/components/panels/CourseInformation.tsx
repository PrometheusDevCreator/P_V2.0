import { BookOpen, Code, Clock, Users, Layers, Palette } from 'lucide-react';
import { GlowingBox } from '@/components/ui/GlowingBox';
import { useCourseStore } from '@/store/courseStore';
import type { CourseLevelId, CourseThematicId, DeliveryMethod } from '@/types/course';

const COURSE_LEVELS: { id: CourseLevelId; name: string }[] = [
  { id: 'awareness', name: 'Awareness' },
  { id: 'foundational', name: 'Foundational' },
  { id: 'basic', name: 'Basic' },
  { id: 'intermediate', name: 'Intermediate' },
  { id: 'advanced', name: 'Advanced' },
  { id: 'expert', name: 'Expert' },
  { id: 'senior', name: 'Senior' },
];

const COURSE_THEMATICS: { id: CourseThematicId; name: string; color: string }[] = [
  { id: 'defence-security', name: 'Defence and Security', color: '#00ff88' },
  { id: 'intelligence', name: 'Intelligence', color: '#00ccff' },
  { id: 'policing', name: 'Policing', color: '#0066ff' },
  { id: 'leadership', name: 'Leadership', color: '#ff6600' },
  { id: 'crisis-response', name: 'Crisis Response', color: '#ff0066' },
  { id: 'resilience', name: 'Resilience', color: '#9933ff' },
  { id: 'personal-skills', name: 'Personal Skills', color: '#ffcc00' },
  { id: 'user-defined', name: 'User Defined', color: '#ffffff' },
];

const DELIVERY_METHODS: DeliveryMethod[] = [
  'Instructor-Led Training (ILT)',
  'Virtual Instructor-Led Training (VILT)',
  'Self-Paced eLearning',
  'Blended Learning',
  'On-the-Job Training',
  'Workshop',
  'Seminar',
  'Simulation-Based Training',
  'Mobile Learning',
];

export function CourseInformation() {
  const { currentCourse, updateCourse } = useCourseStore();

  const handleChange = (field: string, value: string | number) => {
    updateCourse({ [field]: value });
  };

  const selectedThematic = COURSE_THEMATICS.find((t) => t.id === currentCourse?.thematic);

  return (
    <GlowingBox className="p-4" glowColor="cyan" intensity="medium">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-5 h-5 text-prometheus-cyan-400" />
        <h2 className="text-lg font-semibold text-prometheus-text-primary">
          Course Information
        </h2>
      </div>

      <div className="space-y-4">
        {/* Course Title */}
        <div>
          <label className="block text-xs text-prometheus-text-muted uppercase tracking-wide mb-1">
            Course Title
          </label>
          <input
            type="text"
            value={currentCourse?.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="Enter course title..."
            className="prometheus-input"
          />
        </div>

        {/* Course Code */}
        <div>
          <label className="flex items-center gap-1 text-xs text-prometheus-text-muted uppercase tracking-wide mb-1">
            <Code className="w-3 h-3" />
            Course Code
          </label>
          <input
            type="text"
            value={currentCourse?.code || ''}
            onChange={(e) => handleChange('code', e.target.value)}
            placeholder="e.g., PRO-101"
            className="prometheus-input"
          />
        </div>

        {/* Course Level */}
        <div>
          <label className="flex items-center gap-1 text-xs text-prometheus-text-muted uppercase tracking-wide mb-1">
            <Layers className="w-3 h-3" />
            Course Level
          </label>
          <select
            value={currentCourse?.level || ''}
            onChange={(e) => handleChange('level', e.target.value)}
            className="prometheus-select"
          >
            <option value="">Select level...</option>
            {COURSE_LEVELS.map((level) => (
              <option key={level.id} value={level.id}>
                {level.name}
              </option>
            ))}
          </select>
        </div>

        {/* Course Thematic */}
        <div>
          <label className="flex items-center gap-1 text-xs text-prometheus-text-muted uppercase tracking-wide mb-1">
            <Palette className="w-3 h-3" />
            Course Thematic
          </label>
          <select
            value={currentCourse?.thematic || ''}
            onChange={(e) => handleChange('thematic', e.target.value)}
            className="prometheus-select"
            style={
              selectedThematic
                ? { borderColor: `${selectedThematic.color}40` }
                : undefined
            }
          >
            <option value="">Select thematic...</option>
            {COURSE_THEMATICS.map((thematic) => (
              <option key={thematic.id} value={thematic.id}>
                {thematic.name}
              </option>
            ))}
          </select>
        </div>

        {/* Custom Thematic (shown when User Defined is selected) */}
        {currentCourse?.thematic === 'user-defined' && (
          <div>
            <label className="block text-xs text-prometheus-text-muted uppercase tracking-wide mb-1">
              Custom Thematic Name
            </label>
            <input
              type="text"
              value={currentCourse?.customThematic || ''}
              onChange={(e) => handleChange('customThematic', e.target.value)}
              placeholder="Enter custom thematic..."
              className="prometheus-input"
            />
          </div>
        )}

        {/* Duration */}
        <div>
          <label className="flex items-center gap-1 text-xs text-prometheus-text-muted uppercase tracking-wide mb-1">
            <Clock className="w-3 h-3" />
            Duration (hours)
          </label>
          <input
            type="number"
            value={currentCourse?.duration || ''}
            onChange={(e) => handleChange('duration', parseInt(e.target.value) || 0)}
            placeholder="0"
            min="0"
            className="prometheus-input"
          />
        </div>

        {/* Delivery Method */}
        <div>
          <label className="flex items-center gap-1 text-xs text-prometheus-text-muted uppercase tracking-wide mb-1">
            <Users className="w-3 h-3" />
            Delivery Method
          </label>
          <select
            value={currentCourse?.deliveryMethod || ''}
            onChange={(e) => handleChange('deliveryMethod', e.target.value)}
            className="prometheus-select"
          >
            <option value="">Select method...</option>
            {DELIVERY_METHODS.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
        </div>

        {/* Target Audience */}
        <div>
          <label className="block text-xs text-prometheus-text-muted uppercase tracking-wide mb-1">
            Target Audience
          </label>
          <input
            type="text"
            value={currentCourse?.targetAudience || ''}
            onChange={(e) => handleChange('targetAudience', e.target.value)}
            placeholder="Describe target audience..."
            className="prometheus-input"
          />
        </div>
      </div>
    </GlowingBox>
  );
}
