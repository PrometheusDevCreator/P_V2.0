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
            <div className="w-10 h-10 border-2 border-[#4BACC6] rounded-md flex items-center justify-center bg-[#0a0a12]">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#4BACC6]" fill="currentColor">
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
            <span className="text-[#F2F2F2] text-xs">SELECT COURSE:</span>
            <select className="bg-[#0a0a12] border-2 border-[#4BACC6] text-white px-3 py-1.5 min-w-[280px] focus:outline-none rounded-md text-sm">
              <option value="">Select course...</option>
            </select>
            <button className="px-5 py-1.5 bg-[#12121a] border-2 border-[#4BACC6] text-[#F2F2F2] hover:bg-[#4BACC6]/20 transition-colors text-xs tracking-wider rounded-md min-w-[80px]">
              LOAD
            </button>
          </div>

          {/* Right - Action Buttons */}
          <div className="flex flex-col gap-1">
            <div className="flex gap-2">
              <button
                onClick={() => saveCourse()}
                className="px-5 py-1.5 bg-[#12121a] border-2 border-[#4BACC6] text-[#F2F2F2] hover:bg-[#4BACC6]/20 transition-colors text-xs tracking-wider rounded-md min-w-[80px]"
              >
                SAVE
              </button>
              <button className="px-5 py-1.5 bg-[#12121a] border-2 border-[#4BACC6] text-[#F2F2F2] hover:bg-[#4BACC6]/20 transition-colors text-xs tracking-wider rounded-md min-w-[80px]">
                DELETE
              </button>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => resetCourse()}
                className="px-5 py-1.5 bg-[#12121a] border-2 border-[#4BACC6] text-[#F2F2F2] hover:bg-[#4BACC6]/20 transition-colors text-xs tracking-wider rounded-md min-w-[80px]"
              >
                RESET
              </button>
            </div>
          </div>
        </div>

        {/* Date/Time and Course Info Row */}
        <div className="flex gap-6 mb-3 text-xs">
          <div className="text-green-400">
            {formatDate(currentTime)}    {formatTime(currentTime)}
          </div>
          <div className="flex gap-6 text-[#F2F2F2]">
            <span>Course Loaded: <span className="text-green-400">{currentCourse?.title || 'Example'}</span></span>
            <span>Duration: <span className="text-green-400">{currentCourse?.duration || 3} Days</span></span>
            <span>Level: <span className="text-green-400">{currentCourse?.level || 'Basic'}</span></span>
            <span>Thematic: <span className="text-green-400">{currentCourse?.thematic || 'Intelligence'}</span></span>
          </div>
        </div>

        {/* Main Content Grid - center column reduced by 1/4 */}
        <div className="grid grid-cols-[240px_0.75fr_200px] gap-3">

          {/* Left Column - Learning Objectives */}
          <div>
            <GlowPanel title="LEARNING OBJECTIVES" icon variant="default">
              <div className="space-y-2">
                {objectives.map((obj, index) => (
                  <div key={index} className="flex items-stretch gap-1">
                    <span className="text-[#F2F2F2] text-xs w-4 flex items-center">{index + 1}</span>
                    <input
                      type="text"
                      value={obj}
                      onChange={(e) => {
                        const newObj = [...objectives];
                        newObj[index] = e.target.value;
                        setObjectives(newObj);
                      }}
                      className="flex-1 bg-[#0a0a12] border-2 border-[#4BACC6]/50 rounded-md px-2 py-3 text-xs focus:outline-none focus:border-[#4BACC6] min-h-[50px]"
                    />
                    <button
                      onClick={() => addObjective(index)}
                      className="w-6 border-2 border-[#4BACC6]/50 rounded-md text-[#F2F2F2] hover:border-[#4BACC6] hover:bg-[#4BACC6]/20 flex items-center justify-center text-lg"
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
            {/* Course Information - thicker border (15% more) */}
            <GlowPanel title="COURSE INFORMATION" variant="thick">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <label className="text-[#F2F2F2] text-xs w-20 text-right">Title:</label>
                  <input
                    type="text"
                    value={currentCourse?.title || ''}
                    onChange={(e) => updateCourse({ title: e.target.value })}
                    className="flex-1 bg-[#0a0a12] border-2 border-[#4BACC6]/50 rounded-md px-2 py-1 text-xs focus:outline-none focus:border-[#4BACC6]"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-[#F2F2F2] text-xs w-20 text-right">Level:</label>
                  <select
                    value={currentCourse?.level || ''}
                    onChange={(e) => updateCourse({ level: e.target.value as any })}
                    className="flex-1 bg-[#0a0a12] border-2 border-[#4BACC6]/50 rounded-md px-2 py-1 text-xs focus:outline-none focus:border-[#4BACC6]"
                  >
                    <option value="">Select level...</option>
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
                  <label className="text-[#F2F2F2] text-xs w-20 text-right">Thematic:</label>
                  <select
                    value={currentCourse?.thematic || ''}
                    onChange={(e) => updateCourse({ thematic: e.target.value as any })}
                    className="flex-1 bg-[#0a0a12] border-2 border-[#4BACC6]/50 rounded-md px-2 py-1 text-xs focus:outline-none focus:border-[#4BACC6]"
                  >
                    <option value="">Select thematic...</option>
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
                    <label className="text-[#F2F2F2] text-xs w-20 text-right">Duration:</label>
                    <input
                      type="text"
                      value={currentCourse?.duration || ''}
                      onChange={(e) => updateCourse({ duration: parseInt(e.target.value) || 0 })}
                      className="flex-1 bg-[#0a0a12] border-2 border-[#4BACC6]/50 rounded-md px-2 py-1 text-xs focus:outline-none focus:border-[#4BACC6]"
                    />
                  </div>
                  <div className="flex items-center gap-2 flex-1">
                    <label className="text-[#F2F2F2] text-xs w-12 text-right">Code:</label>
                    <input
                      type="text"
                      value={currentCourse?.code || ''}
                      onChange={(e) => updateCourse({ code: e.target.value })}
                      className="flex-1 bg-[#0a0a12] border-2 border-[#4BACC6]/50 rounded-md px-2 py-1 text-xs focus:outline-none focus:border-[#4BACC6]"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-[#F2F2F2] text-xs w-20 text-right">Developer:</label>
                  <input
                    type="text"
                    value={currentCourse?.metadata?.author || ''}
                    onChange={(e) => updateCourse({ metadata: { ...currentCourse?.metadata, author: e.target.value } as any })}
                    className="flex-1 bg-[#0a0a12] border-2 border-[#4BACC6]/50 rounded-md px-2 py-1 text-xs focus:outline-none focus:border-[#4BACC6]"
                  />
                </div>
              </div>
            </GlowPanel>

            {/* Course Description - height increased by 1/5 (h-24 -> h-[115px]) */}
            <GlowPanel title="COURSE DESCRIPTION" icon variant="default">
              <textarea
                value={currentCourse?.description || ''}
                onChange={(e) => updateCourse({ description: e.target.value })}
                className="w-full h-[115px] bg-[#0a0a12] border-2 border-[#4BACC6]/50 rounded-md px-2 py-1 resize-none focus:outline-none focus:border-[#4BACC6] text-xs"
              />
            </GlowPanel>

            {/* Manager Buttons - height decreased by 1/5, no flame icon, silver grey border */}
            <div className="grid grid-cols-3 gap-3">
              <ManagerButton title="SCALAR" subtitle="MANAGER" />
              <ManagerButton title="CONTENT" subtitle="MANAGER" />
              <ManagerButton title="LESSON" subtitle="MANAGER" />
            </div>

            {/* Prometheus AI - height increased by 1/3, gold border, no red text */}
            <GlowPanel title="PROMETHEUS AI" variant="gold">
              <div className="h-[100px] bg-[#0a0a12] border-2 border-[#CC9900]/50 rounded-md">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="w-full h-full bg-transparent px-2 py-2 text-xs focus:outline-none"
                  placeholder=""
                />
              </div>
            </GlowPanel>
          </div>

          {/* Right Column - Generate */}
          <div>
            <GlowPanel title="GENERATE" variant="default">
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
            <span className="text-[#F2F2F2]">OWNER:<span className="text-green-400 ml-1">{currentCourse?.metadata?.author || 'MATTHEW DODDS'}</span></span>
            <span className="text-[#F2F2F2]">START DATE:<span className="text-green-400 ml-1">{formatDate(new Date())}</span></span>
            <span className="text-[#F2F2F2]">STATUS:<span className="text-green-400 ml-1">IN DEVELOPMENT</span></span>
            <div className="flex items-center gap-2">
              <span className="text-[#F2F2F2]">PROGRESS:<span className="text-green-400 ml-1">15%</span></span>
              <div className="w-24 h-1.5 bg-gray-800 border border-gray-700/50 rounded">
                <div className="h-full bg-gradient-to-r from-[#4BACC6] to-green-500 rounded" style={{ width: '15%' }}></div>
              </div>
            </div>
          </div>
          <div className="text-[#F2F2F2]">
            APPROVED FOR USE Y/N: <span className="text-green-400">N</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Glowing Panel Component with variants
function GlowPanel({ title, icon, variant = 'default', children }: { title: string; icon?: boolean; variant?: 'default' | 'thick' | 'gold'; children: React.ReactNode }) {
  const borderColor = variant === 'gold' ? '#CC9900' : '#4BACC6';
  const borderWidth = variant === 'thick' ? '3px' : '2px';

  return (
    <div className="relative">
      {/* Glow effect */}
      <div
        className="absolute -inset-[1px] blur-[3px] rounded-md"
        style={{
          background: `linear-gradient(135deg, ${borderColor}40, ${borderColor}20, ${borderColor}40)`
        }}
      ></div>

      {/* Panel */}
      <div
        className="relative bg-[#0a0a12] rounded-md"
        style={{
          border: `${borderWidth} solid ${borderColor}`,
          background: `linear-gradient(180deg, #0a0a12 0%, #080810 100%)`
        }}
      >
        {/* Header with gradient border */}
        <div
          className="flex items-center justify-between px-3 py-2 rounded-t-md"
          style={{
            borderBottom: `1px solid ${borderColor}60`,
            background: `linear-gradient(90deg, ${borderColor}10, transparent, ${borderColor}10)`
          }}
        >
          <span className="text-xs tracking-wider text-[#F2F2F2]">{title}</span>
          {icon && (
            <svg viewBox="0 0 24 24" className="w-4 h-4" style={{ color: borderColor }} fill="currentColor">
              <path d="M12 2C13 4 15 6 15 9C15 11 14 12 12 13C10 12 9 11 9 9C9 6 11 4 12 2Z"/>
            </svg>
          )}
        </div>

        {/* Content */}
        <div className="p-3">
          {children}
        </div>
      </div>
    </div>
  );
}

// Manager Button Component - silver grey border, no flame icon, reduced height
function ManagerButton({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <button className="relative group w-full">
      {/* Glow effect */}
      <div className="absolute -inset-[1px] bg-[#7F7F7F]/20 blur-[2px] rounded-md group-hover:bg-[#7F7F7F]/30 transition-colors"></div>

      {/* Button */}
      <div
        className="relative bg-[#0a0a12] px-3 py-3 text-center rounded-md transition-colors hover:bg-[#7F7F7F]/10"
        style={{
          border: '2px solid #7F7F7F',
          background: 'linear-gradient(180deg, #12121a 0%, #0a0a12 100%)'
        }}
      >
        <div className="text-xs tracking-wider text-[#F2F2F2]">{title}</div>
        <div className="text-xs tracking-wider text-[#F2F2F2]">{subtitle}</div>
      </div>
    </button>
  );
}

// Generate Button Component with gradient border
function GenerateButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      className="relative w-full py-2.5 bg-[#12121a] text-[#F2F2F2] hover:bg-[#4BACC6]/10 transition-colors text-xs tracking-wider rounded-md"
      style={{
        border: '2px solid #4BACC6',
        background: 'linear-gradient(180deg, #12121a 0%, #0a0a12 100%)'
      }}
    >
      {children}
    </button>
  );
}

export default App;
