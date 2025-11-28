import { Clock, FileText, Target, CheckCircle } from 'lucide-react';
import { GlowingBox } from '@/components/ui/GlowingBox';
import { useCourseStore } from '@/store/courseStore';

interface StatusItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color?: 'cyan' | 'flame' | 'green' | 'purple';
}

function StatusItem({ icon, label, value, color = 'cyan' }: StatusItemProps) {
  const colorClasses = {
    cyan: 'text-prometheus-cyan-400',
    flame: 'text-prometheus-flame-400',
    green: 'text-green-400',
    purple: 'text-purple-400',
  };

  return (
    <div className="flex items-center gap-3">
      <div className={`${colorClasses[color]}`}>{icon}</div>
      <div>
        <p className="text-xs text-prometheus-text-muted uppercase tracking-wide">{label}</p>
        <p className="text-sm font-medium text-prometheus-text-primary">{value}</p>
      </div>
    </div>
  );
}

export function StatusBar() {
  const { currentCourse } = useCourseStore();

  const getStatusColor = () => {
    switch (currentCourse?.status) {
      case 'DRAFT':
        return '#666666';
      case 'IN_PROGRESS':
        return '#ffcc00';
      case 'REVIEW':
        return '#ff9900';
      case 'APPROVED':
        return '#00cc66';
      case 'PUBLISHED':
        return '#00ffff';
      default:
        return '#666666';
    }
  };

  const getStatusLabel = () => {
    switch (currentCourse?.status) {
      case 'DRAFT':
        return 'Draft';
      case 'IN_PROGRESS':
        return 'In Progress';
      case 'REVIEW':
        return 'Under Review';
      case 'APPROVED':
        return 'Approved';
      case 'PUBLISHED':
        return 'Published';
      case 'ARCHIVED':
        return 'Archived';
      default:
        return 'No Course';
    }
  };

  return (
    <GlowingBox className="p-4" glowColor="cyan" intensity="low">
      <div className="flex items-center justify-between flex-wrap gap-4">
        {/* Course Status Indicator */}
        <div className="flex items-center gap-3">
          <div
            className="w-3 h-3 rounded-full animate-pulse"
            style={{ backgroundColor: getStatusColor() }}
          />
          <div>
            <p className="text-xs text-prometheus-text-muted uppercase tracking-wide">Status</p>
            <p className="text-sm font-semibold" style={{ color: getStatusColor() }}>
              {getStatusLabel()}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-10 bg-prometheus-border-primary" />

        {/* Status Items */}
        <StatusItem
          icon={<FileText className="w-4 h-4" />}
          label="Course Code"
          value={currentCourse?.code || '---'}
          color="cyan"
        />

        <div className="hidden md:block w-px h-10 bg-prometheus-border-primary" />

        <StatusItem
          icon={<Clock className="w-4 h-4" />}
          label="Duration"
          value={currentCourse?.duration ? `${currentCourse.duration}h` : '---'}
          color="flame"
        />

        <div className="hidden md:block w-px h-10 bg-prometheus-border-primary" />

        <StatusItem
          icon={<Target className="w-4 h-4" />}
          label="Objectives"
          value={currentCourse?.learningObjectives?.length?.toString() || '0'}
          color="green"
        />

        <div className="hidden md:block w-px h-10 bg-prometheus-border-primary" />

        <StatusItem
          icon={<CheckCircle className="w-4 h-4" />}
          label="Modules"
          value={currentCourse?.modules?.length?.toString() || '0'}
          color="purple"
        />
      </div>
    </GlowingBox>
  );
}
