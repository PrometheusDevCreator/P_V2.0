import { useState } from 'react';
import { Target, Plus, Trash2, ChevronDown, ChevronRight, GripVertical } from 'lucide-react';
import { GlowingBox } from '@/components/ui/GlowingBox';
import { NeonButton } from '@/components/ui/NeonButton';
import { useCourseStore } from '@/store/courseStore';
import type { LearningObjective } from '@/types/course';

export function LearningObjectives() {
  const { currentCourse, addObjective, removeObjective, updateObjective } = useCourseStore();
  const [expandedTerminal, setExpandedTerminal] = useState<string[]>([]);
  const [newObjectiveText, setNewObjectiveText] = useState('');
  const [newObjectiveType, setNewObjectiveType] = useState<'terminal' | 'enabling'>('terminal');

  const terminalObjectives = currentCourse?.learningObjectives?.filter(
    (obj) => obj.type === 'terminal'
  ) || [];

  const getEnablingObjectives = (terminalId: string): LearningObjective[] => {
    return currentCourse?.learningObjectives?.filter(
      (obj) => obj.type === 'enabling' && obj.parentId === terminalId
    ) || [];
  };

  const toggleTerminal = (id: string) => {
    setExpandedTerminal((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleAddObjective = () => {
    if (!newObjectiveText.trim()) return;

    const newObjective: LearningObjective = {
      id: `obj-${Date.now()}`,
      type: newObjectiveType,
      text: newObjectiveText,
      order: (currentCourse?.learningObjectives?.length || 0) + 1,
    };

    addObjective(newObjective);
    setNewObjectiveText('');
  };

  return (
    <GlowingBox className="p-4" glowColor="cyan" intensity="medium">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-prometheus-cyan-400" />
          <h2 className="text-lg font-semibold text-prometheus-text-primary">
            Learning Objectives
          </h2>
        </div>
        <span className="text-sm text-prometheus-text-muted">
          {currentCourse?.learningObjectives?.length || 0} objectives
        </span>
      </div>

      {/* Objectives List */}
      <div className="space-y-2 mb-4 max-h-60 overflow-y-auto">
        {terminalObjectives.length === 0 ? (
          <p className="text-prometheus-text-muted text-sm text-center py-4">
            No learning objectives defined yet
          </p>
        ) : (
          terminalObjectives.map((terminal) => (
            <div key={terminal.id} className="space-y-1">
              {/* Terminal Objective */}
              <div className="flex items-center gap-2 p-2 rounded-lg bg-prometheus-bg-tertiary border border-prometheus-border-primary hover:border-prometheus-cyan-500/30 transition-colors">
                <button
                  onClick={() => toggleTerminal(terminal.id)}
                  className="text-prometheus-text-muted hover:text-prometheus-cyan-400"
                >
                  {expandedTerminal.includes(terminal.id) ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
                <GripVertical className="w-4 h-4 text-prometheus-text-muted cursor-grab" />
                <span className="flex-1 text-sm text-prometheus-text-primary">
                  {terminal.text}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-prometheus-cyan-500/20 text-prometheus-cyan-400">
                  Terminal
                </span>
                <button
                  onClick={() => removeObjective(terminal.id)}
                  className="p-1 text-prometheus-text-muted hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Enabling Objectives */}
              {expandedTerminal.includes(terminal.id) && (
                <div className="ml-8 space-y-1">
                  {getEnablingObjectives(terminal.id).map((enabling) => (
                    <div
                      key={enabling.id}
                      className="flex items-center gap-2 p-2 rounded-lg bg-prometheus-bg-secondary border border-prometheus-border-primary/50"
                    >
                      <GripVertical className="w-4 h-4 text-prometheus-text-muted cursor-grab" />
                      <span className="flex-1 text-sm text-prometheus-text-secondary">
                        {enabling.text}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded bg-purple-500/20 text-purple-400">
                        Enabling
                      </span>
                      <button
                        onClick={() => removeObjective(enabling.id)}
                        className="p-1 text-prometheus-text-muted hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Add New Objective */}
      <div className="space-y-2 pt-3 border-t border-prometheus-border-primary">
        <div className="flex gap-2">
          <select
            value={newObjectiveType}
            onChange={(e) => setNewObjectiveType(e.target.value as 'terminal' | 'enabling')}
            className="prometheus-select text-sm w-32"
          >
            <option value="terminal">Terminal</option>
            <option value="enabling">Enabling</option>
          </select>
          <input
            type="text"
            value={newObjectiveText}
            onChange={(e) => setNewObjectiveText(e.target.value)}
            placeholder="Enter learning objective..."
            className="prometheus-input flex-1 text-sm"
            onKeyDown={(e) => e.key === 'Enter' && handleAddObjective()}
          />
        </div>
        <NeonButton
          variant="cyan"
          size="sm"
          onClick={handleAddObjective}
          icon={<Plus className="w-4 h-4" />}
          className="w-full"
        >
          Add Objective
        </NeonButton>
      </div>
    </GlowingBox>
  );
}
