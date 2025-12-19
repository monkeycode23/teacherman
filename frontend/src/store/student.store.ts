import { create } from "zustand";
import { nanoid } from "nanoid";
import { Material, Student } from "../types/general";

export interface MaterialInput {
  topicId: string;
  type: Material["type"];
  title: string;
  url: string;
  thumbnail?: string;
}

export interface MaterialWithTopic extends Material {
  topicId: string;
}

interface StudentState {
  students: Student[];
    student:Student | null
  addStudent: (data: Student) =>void;
  updateStudent: (
    id: string,
    data: Partial<Omit<MaterialWithTopic, "id" | "topicId">>
  ) => void;
  removeStudent: (id: string) => void;
   setStudents:(Students:Student[])=>void;
  /* getStudentsByTopic: (topicId: string) => MaterialWithTopic[]; */
}

export const useStudentsStore = create<StudentState>((set, get) => ({
  students: [],
    student:null,
  setStudents:(students)=>set({students}),
  addStudent: (data) => {
    set((state) => ({
      students: [data,...state.students, ],
    }));

    
  },

  updateStudent: (id, data) => {
    set((state) => ({
      students: state.students.map((r) =>
        r._id === id ? { ...r, ...data } : r
      ),
    }));
  },

  removeStudent: (id) => {
    set((state) => ({
      students: state.students.filter((r) => r._id !== id),
    }));
  },

}));
