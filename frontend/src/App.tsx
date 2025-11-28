import { useState, useEffect } from 'react';
import { useCourseStore } from '@/store/courseStore';

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { currentCourse, updateCourse, saveCourse, resetCourse } = useCourseStore();
  const [objectives, setObjectives] = useState(['', '', '']);
  const [chatInput, setChatInput] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const addObjective = (index: number) => {
    const newObjectives = [...objectives];
    newObjectives.splice(index + 1, 0, '');
    setObjectives(newObjectives);
  };

  return (
    <div className="min-h-screen bg-[#080810] text-white font-mono text-sm">
      <div className="p-4 max-w-[1400px] mx-auto">

        {/* Header Row */}
        <div className="flex justify-between items-start mb-2">
          {/* Left - Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border border-cyan-500/50 rounded flex items-center justify-center bg-[#0a0a12]">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-cyan-400" fill="currentColor">
                <path d="M12 2C13 4 15 6 15 9C15 11 14 12 12 13C10 12 9 11 9 9C9 6 11 4 12 2Z"/>
                <path d="M12 13C14 14 16 16 16 19C16 21 14 22 12 22C10 22 8 21 8 19C8 16 10 14 12 13Z" opacity="0.7"/>
              </svg>
            </div>
            <div>
              <h1 className="text-base tracking-[0.2em] text-white font-normal">PROMETHEUS COURSE</h1>
              <h2 className="text-base tracking-[0.2em] text-white font-normal">GENERATION SYSTEM 2.0</h2>
            </div>
          </div>

          {/* Center - Course Selector */}
          <div className="flex items-center gap-3">
            <span className="text-gray-500 text-xs">SELECT COURSE:</span>
            <select className="bg-[#0a0a12] border border-cyan-500/30 text-white px-3 py-1.5 min-w-[280px] focus:outline-none focus:border-cyan-400 text-sm">
              <option value="">V</option>
            </select>
            <button className="px-4 py-1.5 bg-[#12121a] border border-gray-700 text-gray-400 hover:border-cyan-400 hover:text-cyan-400 transition-colors text-xs tracking-wider">
              LOAD
            </button>
          </div>

          {/* Right - Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => saveCourse()}
              className="px-5 py-1.5 bg-[#12121a] border border-gray-700 text-gray-400 hover:border-cyan-400 hover:text-cyan-400 transition-colors text-xs tracking-wider"
            >
              SAVE
            </button>
            <button className="px-5 py-1.5 bg-[#12121a] border border-gray-700 text-gray-400 hover:border-cyan-400 hover:text-cyan-400 transition-colors text-xs tracking-wider">
              DELETE
            </button>
          </div>
        </div>

        {/* Reset button row */}
        <div className="flex justify-end mb-3">
          <button
            onClick={() => resetCourse()}
            className="px-5 py-1.5 bg-[#12121a] border border-gray-700 text-gray-400 hover:border-cyan-400 hover:text-cyan-400 transition-colors text-xs tracking-wider"
          >
            RESET
          </button>
        </div>

        {/* Date/Time and Course Info Row */}
        <div className="flex gap-6 mb-3 text-xs">
          <div className="text-cyan-400">
            {formatDate(currentTime)}    {formatTime(currentTime)}
          </div>
          <div className="flex gap-6 text-gray-400">
            <span>Course Loaded: <span className="text-green-400">{currentCourse?.title || 'Example'}</span></span>
            <span>Duration: <span className="text-cyan-400">{currentCourse?.duration || 3} Days</span></span>
            <span>Level: <span className="text-green-400">{currentCourse?.level || 'Basic'}</span></span>
            <span>Thematic: <span className="text-green-400">{currentCourse?.thematic || 'Intelligence'}</span></span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-[240px_1fr_200px] gap-3">

          {/* Left Column - Learning Objectives */}
          <div>
            <GlowPanel title="LEARNING OBJECTIVES" icon>
              <div className="space-y-2">
                {objectives.map((obj, index) => (
                  <div key={index} className="flex items-stretch gap-1">
                    <span className="text-gray-500 text-xs w-4 flex items-center">{index + 1}</span>
                    <input
                      type="text"
                      value={obj}
                      onChange={(e) => {
                        const newObj = [...objectives];
                        newObj[index] = e.target.value;
                        setObjectives(newObj);
                      }}
                      className="flex-1 bg-[#0a0a12] border border-gray-700/50 px-2 py-3 text-xs focus:outline-none focus:border-cyan-400 min-h-[50px]"
                    />
                    <button
                      onClick={() => addObjective(index)}
                      className="w-6 border border-gray-700/50 text-gray-500 hover:border-cyan-400 hover:text-cyan-400 flex items-center justify-center text-lg"
                    >
                      +
                    </button>
                  </div>
                ))}
              </div>
            </GlowPanel>
          </div>

          {/* Center Column */}
          <div className="space-y-3">
            {/* Course Information */}
            <GlowPanel title="COURSE INFORMATION">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <label className="text-gray-500 text-xs w-20 text-right">Title:</label>
                  <input
                    type="text"
                    value={currentCourse?.title || ''}
                    onChange={(e) => updateCourse({ title: e.target.value })}
                    className="flex-1 bg-[#0a0a12] border border-gray-700/50 px-2 py-1 text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-gray-500 text-xs w-20 text-right">Level:</label>
                  <select
                    value={currentCourse?.level || ''}
                    onChange={(e) => updateCourse({ level: e.target.value as any })}
                    className="flex-1 bg-[#0a0a12] border border-gray-700/50 px-2 py-1 text-xs focus:outline-none focus:border-cyan-400"
                  >
                    <option value="">V</option>
                    <option value="awareness">Awareness</option>
                    <option value="foundational">Foundational</option>
                    <option value="basic">Basic</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="expert">Expert</option>
                    <option value="senior">Senior</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-gray-500 text-xs w-20 text-right">Thematic:</label>
                  <select
                    value={currentCourse?.thematic || ''}
                    onChange={(e) => updateCourse({ thematic: e.target.value as any })}
                    className="flex-1 bg-[#0a0a12] border border-gray-700/50 px-2 py-1 text-xs focus:outline-none focus:border-cyan-400"
                  >
                    <option value="">V</option>
                    <option value="defence-security">Defence and Security</option>
                    <option value="intelligence">Intelligence</option>
                    <option value="policing">Policing</option>
                    <option value="leadership">Leadership</option>
                    <option value="crisis-response">Crisis Response</option>
                    <option value="resilience">Resilience</option>
                    <option value="personal-skills">Personal Skills</option>
                    <option value="user-defined">User Defined</option>
                  </select>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 flex-1">
                    <label className="text-gray-500 text-xs w-20 text-right">Duration:</label>
                    <input
                      type="text"
                      value={currentCourse?.duration || ''}
                      onChange={(e) => updateCourse({ duration: parseInt(e.target.value) || 0 })}
                      className="flex-1 bg-[#0a0a12] border border-gray-700/50 px-2 py-1 text-xs focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div className="flex items-center gap-2 flex-1">
                    <label className="text-gray-500 text-xs w-12 text-right">Code:</label>
                    <input
                      type="text"
                      value={currentCourse?.code || ''}
                      onChange={(e) => updateCourse({ code: e.target.value })}
                      className="flex-1 bg-[#0a0a12] border border-gray-700/50 px-2 py-1 text-xs focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-gray-500 text-xs w-20 text-right">Developer:</label>
                  <input
                    type="text"
                    value={currentCourse?.metadata?.author || ''}
                    onChange={(e) => updateCourse({ metadata: { ...currentCourse?.metadata, author: e.target.value } as any })}
                    className="flex-1 bg-[#0a0a12] border border-gray-700/50 px-2 py-1 text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>
            </GlowPanel>

            {/* Course Description */}
            <GlowPanel title="COURSE DESCRIPTION" icon>
              <textarea
                value={currentCourse?.description || ''}
                onChange={(e) => updateCourse({ description: e.target.value })}
                className="w-full h-24 bg-[#0a0a12] border border-gray-700/50 px-2 py-1 resize-none focus:outline-none focus:border-cyan-400 text-xs"
              />
            </GlowPanel>

            {/* Manager Buttons */}
            <div className="grid grid-cols-3 gap-3">
              <ManagerButton title="SCALAR" subtitle="MANAGER" />
              <ManagerButton title="CONTENT" subtitle="MANAGER" />
              <ManagerButton title="LESSON" subtitle="MANAGER" />
            </div>

            {/* Prometheus AI */}
            <GlowPanel title="PROMETHEUS AI">
              <div className="text-red-500 text-xs mb-2">AI Chat Text Window here:</div>
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="w-full bg-[#0a0a12] border border-gray-700/50 px-2 py-2 text-xs focus:outline-none focus:border-cyan-400"
                placeholder=""
              />
            </GlowPanel>
          </div>

          {/* Right Column - Generate */}
          <div>
            <GlowPanel title="GENERATE">
              <div className="space-y-2">
                <GenerateButton>COURSE PRESENTATION</GenerateButton>
                <GenerateButton>HANDBOOK</GenerateButton>
                <GenerateButton>LESSON PLAN</GenerateButton>
                <GenerateButton>TIMETABLE</GenerateButton>
                <GenerateButton>INSTRUCTOR NOTES</GenerateButton>
                <GenerateButton>EXAM</GenerateButton>
                <GenerateButton>INFORMATION SHEET</GenerateButton>
              </div>
            </GlowPanel>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-3 text-xs border-t border-gray-800/50 pt-3">
          <div className="flex gap-6">
            <span className="text-gray-500">OWNER:<span className="text-green-400 ml-1">{currentCourse?.metadata?.author || 'MATTHEW DODDS'}</span></span>
            <span className="text-gray-500">START DATE:<span className="text-cyan-400 ml-1">{formatDate(new Date())}</span></span>
            <span className="text-gray-500">STATUS:<span className="text-green-400 ml-1">IN DEVELOPMENT</span></span>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">PROGRESS:<span className="text-cyan-400 ml-1">15%</span></span>
              <div className="w-24 h-1.5 bg-gray-800 border border-gray-700/50">
                <div className="h-full bg-gradient-to-r from-cyan-500 to-green-500" style={{ width: '15%' }}></div>
              </div>
            </div>
          </div>
          <div className="text-gray-500">
            APPROVED FOR USE Y/N: <span className="text-green-400">N</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Glowing Panel Component
function GlowPanel({ title, icon, children }: { title: string; icon?: boolean; children: React.ReactNode }) {
  return (
    <div className="relative">
      {/* Cyan glow effect */}
      <div className="absolute -inset-[1px] bg-cyan-400/20 blur-[2px]"></div>

      {/* Panel */}
      <div className="relative border border-cyan-500/50 bg-[#0a0a12]">
        {/* Header */}
        <div className="flex items-center justify-between px-2 py-1.5 border-b border-cyan-500/30">
          <span className="text-xs tracking-wider text-gray-400">{title}</span>
          {icon && (
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-cyan-400" fill="currentColor">
              <path d="M12 2C13 4 15 6 15 9C15 11 14 12 12 13C10 12 9 11 9 9C9 6 11 4 12 2Z"/>
            </svg>
          )}
        </div>

        {/* Content */}
        <div className="p-2">
          {children}
        </div>
      </div>
    </div>
  );
}

// Manager Button Component
function ManagerButton({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <button className="relative group">
      <div className="absolute -inset-[1px] bg-cyan-400/10 blur-[2px] group-hover:bg-cyan-400/20 transition-colors"></div>
      <div className="relative border border-cyan-500/50 bg-[#0a0a12] px-3 py-4 text-center hover:border-cyan-400 transition-colors">
        <div className="text-xs tracking-wider text-gray-400">{title}</div>
        <div className="text-xs tracking-wider text-gray-400">{subtitle}</div>
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-cyan-400 mx-auto mt-2" fill="currentColor">
          <path d="M12 2C13 4 15 6 15 9C15 11 14 12 12 13C10 12 9 11 9 9C9 6 11 4 12 2Z"/>
        </svg>
      </div>
    </button>
  );
}

// Generate Button Component
function GenerateButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="w-full py-2.5 bg-[#12121a] border border-gray-700/50 text-gray-400 hover:border-cyan-400 hover:text-cyan-400 transition-colors text-xs tracking-wider">
      {children}
    </button>
  );
}

export default App;
