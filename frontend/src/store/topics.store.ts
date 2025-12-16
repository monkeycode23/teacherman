import { create } from "zustand";
import { nanoid } from "nanoid";
import { Topic, Material, QuizQuestion, Answer, Quiz } from "../types/general";
export interface TopicInput {
  classroomId: string;
  title: string;
  description?: string;
}

interface TopicsState {
  topics: Topic[];
  topic: Topic | null;
  setTopics: (data: Topic[]) => void;
  createTopic: (data: Topic) => void;
  updateTopic: (topicId: string, data: Partial<Topic>) => void;
  removeTopic: (topicId: string) => void;
  addResource: (topicId: string, resource: Material) => void;
  addQuestion: (topicId: string, question: QuizQuestion) => void;
  addAnswer: (topicId: string, questionId: string, answer: Answer) => void;
  addQuiz: (topicId: string, quiz: Quiz) => void;
  addEvent: (topicId: string, event: Event) => void;
}

export const useTopicsStore = create<TopicsState>((set) => ({
  topics: [],
  topic: null,
  setTopics: (data: Topic[]) => set({ topics: data }),
  createTopic: (topic) => {

    set((state) => ({
      topics: [...state.topics,topic],
    }));
  
  },

  updateTopic: (topicId, data) => {
    set((state) => ({
      topics: state.topics.map((t) =>
        t._id === topicId ? { ...t, ...data } : t
      ),
    }));
  },

  removeTopic: (topicId) => {
    set((state) => ({
      topics: state.topics.filter((t) => t._id !== topicId),
    }));
  },

  addResource: (topicId, resource) => {
    set((state) => ({
      topics: state.topics.map((t) =>
        t._id === topicId ? { ...t, resources: [...t.resources, resource] } : t
      ),
    }));
  },

  addQuestion: (topicId, question) => {
    set((state) => ({
      topics: state.topics.map((t) =>
        t._id === topicId ? { ...t, qa: [...t.comments, question] } : t
      ),
    }));
  },

  addAnswer: (topicId, questionId, answer) => {
    set((state) => ({
      topics: state.topics.map((t) => {
        if (t._id !== topicId) return t;
        return {
          ...t,
          qa: t.comments.map((q) =>
            q.id === questionId ? { ...q, answers: [...q.replies, answer] } : q
          ),
        };
      }),
    }));
  },

  addQuiz: (topicId, quiz) => {
    set((state) => ({
      topics: state.topics.map((t) =>
        t._id === topicId ? { ...t, quizzes: [...t.quizzes, quiz] } : t
      ),
    }));
  },

  addEvent: (topicId, event) => {
    /* set((state) => ({
      topics: state.topics.map((t) =>
        t.id === topicId ? { ...t, events: [...t.events, event] } : t
      ),
    })); */
  },
}));
