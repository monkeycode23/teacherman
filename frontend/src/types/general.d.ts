import { ClassroomStats } from "../store/classroom.store";


// src/types/event.ts
export type EventType = "exam" | "task" | "meeting";

export interface Event {
  _id: string;
  title: string;
  description: string;
  type: EventType;

  classroom: Classroom;
  startDate: Date; // ISO
  endDate: Date;   // ISO
  createdAt: string;
  updatedAt: string;
}
export interface Student {
  _id: string;
  names: string;
  lastname:string;
  email?: string;
  avatar?: string;
  enrollmentDate?: string;
  attendance?: number;
  averageGrade?: number;
  classroomId?:string
  courseId?:string
}

export interface Comment {
  id: string;
  studentName: string;
  studentAvatar: string;
  content: string;
  timestamp: string;
  replies: Comment[];
}

export interface Material {
  id: string;
  type: 'file' | 'image' | 'video' | 'link';
  title: string;
  url: string;
  thumbnail?: string;
  uploadedAt: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  createdAt: string;
}

export interface Answer {
  id: string;
  authorId: string;
  content: string;
  createdAt: string;
}
export interface TopicEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'exam' | 'deadline' | 'review' | 'other';
}

export interface Topic {
  _id: string;
  title: string;
  classroomId?:string;
  description: string;
  resources: Material[];
  comments: Comment[];
  quizzes: Quiz[];
  events: TopicEvent[];
  createdAt: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  maxScore: number;
  submissions: {
    studentId: string;
    submittedAt?: string;
    score?: number;
    status: 'pending' | 'submitted' | 'graded';
  }[];
}

export interface Classroom {
  _id: string;
  name: string;
  subject?: string;
  description?:string;
  color?: string;
  students?: Student[] | string[];
  teacher?:Teacher | string;
  topics?: Topic[];
  assignments?: Assignment[];
  homeworks?:any[];
  schedule?: {
    day: string;
    time: string;
  }[];
  stats?:ClassroomStats;
  createdAt?:string
}





export interface Teacher {
  _id?: string;
  name:string
}

export interface User {
  email: string;
  avatar:string;
  username?: string;
  _id?: string;
  emailVerified?: boolean;
  roles:string[]
}


/* 

export interface Resource {
  id: string;
  name: string;
  url: string;
  type: string;
}


export interface Question {
  id: string;
  authorId: string;
  content: string;
  answers: Answer[];
}

export interface Quiz {
  id: string;
  title: string;
  questions: unknown[];
}

export interface Event {
  id: string;
  title: string;
  date: string;
  description?: string;
}

export interface Topic {
  id: string;
  classroomId: string;
  title: string;
  description?: string;
  resources: Resource[];
  qa: Question[];
  quizzes: Quiz[];
  events: Event[];
  createdAt: string;
}

*/



export interface Course {
  id: string;
  name: string;
  color: string;
}



export interface ClassSchedule {
  id: string;
  courseId: string;
  date: Date;
  startTime: string;
  endTime: string;
}

export interface Session {
  _id: string;
  startTime: string;
  endTime: string;
  classroom?: Classroom;
  sessionDate: Date;
  title?: string;
  status:string;
  progress?:number;
  activities: Activity[];
  attendance?: { [studentId: string]: boolean };
}

export interface Activity {
  _id: string;
  type: 'attendance' | 'reading' | 'exercises' | 'oral_lesson' | 'custom';
  title: string;
  completed: boolean;
  order: number;
  progress:number
}