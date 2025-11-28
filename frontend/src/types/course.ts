// Course Level Types
export type CourseLevelId =
  | 'awareness'
  | 'foundational'
  | 'basic'
  | 'intermediate'
  | 'advanced'
  | 'expert'
  | 'senior';

export interface CourseLevel {
  id: CourseLevelId;
  name: string;
  description: string;
  hoursRange: {
    min: number;
    max: number;
  };
  targetAudience: string;
}

// Course Thematic Types
export type CourseThematicId =
  | 'defence-security'
  | 'intelligence'
  | 'policing'
  | 'leadership'
  | 'crisis-response'
  | 'resilience'
  | 'personal-skills'
  | 'user-defined';

export interface CourseThematic {
  id: CourseThematicId;
  name: string;
  description: string;
  keywords: string[];
  color: string;
}

// Course Status Types
export type CourseStatusCode =
  | 'DRAFT'
  | 'IN_PROGRESS'
  | 'REVIEW'
  | 'APPROVED'
  | 'PUBLISHED'
  | 'ARCHIVED';

export interface CourseStatus {
  code: CourseStatusCode;
  label: string;
  color: string;
}

// Learning Objective Types
export interface LearningObjective {
  id: string;
  type: 'terminal' | 'enabling';
  text: string;
  parentId?: string;
  order: number;
}

// Module and Lesson Types
export interface Lesson {
  id: string;
  number: number;
  title: string;
  duration: number;
  content: string;
  keyPoints: string[];
  activities: string[];
}

export interface Module {
  id: string;
  number: number;
  title: string;
  description: string;
  duration: number;
  lessons: Lesson[];
}

// Assessment Types
export type AssessmentType =
  | 'Multiple Choice Quiz'
  | 'Written Assessment'
  | 'Practical Exercise'
  | 'Scenario-Based Assessment'
  | 'Performance Evaluation'
  | 'Portfolio Review'
  | 'Peer Assessment'
  | 'Self-Assessment'
  | 'Oral Examination'
  | 'Capstone Project';

export interface Assessment {
  id: string;
  type: AssessmentType;
  title: string;
  description: string;
  criteria: string[];
  passingScore: number;
  duration: number;
}

// Delivery Method Types
export type DeliveryMethod =
  | 'Instructor-Led Training (ILT)'
  | 'Virtual Instructor-Led Training (VILT)'
  | 'Self-Paced eLearning'
  | 'Blended Learning'
  | 'On-the-Job Training'
  | 'Workshop'
  | 'Seminar'
  | 'Simulation-Based Training'
  | 'Mobile Learning';

// Course Metadata
export interface CourseMetadata {
  createdDate: string;
  updatedDate: string;
  author: string;
  reviewer?: string;
  organization?: string;
  version: string;
}

// Main Course Interface
export interface Course {
  id: string;
  code: string;
  title: string;
  level: CourseLevelId;
  thematic: CourseThematicId;
  customThematic?: string;
  status: CourseStatusCode;
  description: string;
  overview: string;
  targetAudience: string;
  duration: number;
  deliveryMethod: DeliveryMethod;
  learningObjectives: LearningObjective[];
  modules: Module[];
  assessments: Assessment[];
  metadata: CourseMetadata;
}

// Course Creation/Update DTOs
export interface CreateCourseDTO {
  title: string;
  code: string;
  level: CourseLevelId;
  thematic: CourseThematicId;
  customThematic?: string;
  description: string;
  overview: string;
  targetAudience: string;
  duration: number;
  deliveryMethod: DeliveryMethod;
  author: string;
  organization?: string;
}

export interface UpdateCourseDTO extends Partial<CreateCourseDTO> {
  id: string;
}

// AI Generation Types
export interface AIGenerationRequest {
  courseId: string;
  generationType: 'objectives' | 'modules' | 'assessments' | 'full';
  context?: string;
  preferences?: Record<string, unknown>;
}

export interface AIGenerationResponse {
  success: boolean;
  data?: Partial<Course>;
  message?: string;
  tokens_used?: number;
}

// Chat Message Types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

// Export Types
export type ExportFormat = 'json' | 'pdf' | 'docx' | 'scorm';

export interface ExportRequest {
  courseId: string;
  format: ExportFormat;
  includeMetadata: boolean;
}

export interface ExportResponse {
  success: boolean;
  downloadUrl?: string;
  message?: string;
}
