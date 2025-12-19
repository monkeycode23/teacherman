import { create } from "zustand";
import { nanoid } from "nanoid";


import { Classroom,Student } from "../types/general";

import { classrooms } from "../data/example";


export interface ClassroomStats {
  totalStudents: number;
  totalTasks: number;
  averageScore: number;
}


export interface ClassroomInput {
    _id:string;
  name: string;
  description?: string;
  teacher: string;
  color:string
   subject:string;
  
}

// =========================
// Store de Aulas / Classrooms
// =========================

interface ClassroomsState {
  classrooms: Classroom[];
  classroom:Classroom|null;
  
  createClassroom: (data: ClassroomInput) => void;
  updateClassroom: (classroomId: string, data: Partial<Classroom>) => void;
  removeClassroom: (classroomId: string) => void;
  addStudent: (classroomId: string, student: Student) => void;
  removeStudent: (classroomId: string, studentId: string) => void;
  addTopicToClassroom: (classroomId: string, topicId: string) => void;
  setClassroom: (classroom:Classroom|undefined)=>void 

    setClassrooms: (classroom:Classroom[])=>void 
}

export const useClassroomsStore = create<ClassroomsState>((set) => ({
  classrooms:  [],
  classroom: null,

   setClassroom: (classroom) => {
    if(!classroom) return 
    set((state) => ({
      classroom
    }));
  },


  setClassrooms:(classrooms)=> set({classrooms}),
  createClassroom: (classroom) => {
    

    const newClassroom: Classroom = {
      
     ...classroom,
      stats: {
        totalStudents: 0,
        totalTasks: 0,
        averageScore: 0,
      },
      createdAt: new Date().toISOString(),
    };

    set((state) => ({
      classrooms: [ newClassroom,...state.classrooms],
    }));

    
  },

  updateClassroom: (classroomId, data) => {
    set((state) => ({
      classrooms: state.classrooms.map((c) =>
        c._id === classroomId ? { ...c, ...data } : c
      ),
    }));
  },

  removeClassroom: (classroomId) => {
    set((state) => ({
      classrooms: state.classrooms.filter((c) => c._id !== classroomId),
    }));
  },

  addStudent: (classroomId, student) => {
    set((state) => ({
      classrooms: state.classrooms.map((c) => {
        if (c._id !== classroomId) return c;
        const students = [...c.students, student];
        return {
          ...c,
          students,
         /*  stats: { ...c.stats, totalStudents: students.length }, */
        };
      }),
    }));
  },

  removeStudent: (classroomId, studentId) => {
    /* set((state) => ({
      classrooms: state.classrooms.map((c) => {
        if (c.id !== classroomId) return c;
        const students = c.students.filter((s) => s.id !== studentId);
        return {
          ...c,
          students,
          stats: { ...c.stats, totalStudents: students.length },
        };
      }),
    })); */
  },

  addTopicToClassroom: (classroomId, topicId) => {
    set((state) => ({
      classrooms: state.classrooms.map((c) =>
        c._id === classroomId
          ? { ...c, topics: [...c.topics, topicId] }
          : c
      ),
    }));
  },
}));

