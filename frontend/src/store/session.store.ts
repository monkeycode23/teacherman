// src/store/session.store.ts
import { create } from "zustand";
import { Activity, Session } from "../types/general";

interface SessionState {
  sessions: Session[];
  selectedSession: Session | null;
  loading: boolean;
  error: string | null;

  // actions
  setSessions: (sessions: Session[]) => void;
  addSession: (session: Session) => void;
  updateSession: (session: Session) => void;
  deleteSession: (id: string) => void;
  selectSession: (session: Session | null) => void;
  clearError: () => void;

}

export const useSessionStore = create<SessionState>((set) => ({
  sessions: [],
  selectedSession: null,
  loading: false,
  error: null,

  setSessions: (sessions) =>
    set({ sessions }),

  addSession: (session) =>
    set((state) => ({
      sessions: [...state.sessions, session],
    })),




   

  updateSession: (session) =>
    set((state) => ({
      sessions: state.sessions.map((s) =>
        s._id === session._id ? session : s
      ),
      selectedSession:
        state.selectedSession?._id === session._id
          ? session
          : state.selectedSession,
    })),

  deleteSession: (id) =>
    set((state) => ({
      sessions: state.sessions.filter((s) => s._id !== id),
      selectedSession:
        state.selectedSession?._id === id
          ? null
          : state.selectedSession,
    })),

  selectSession: (session) =>
    set({ selectedSession: session }),

  clearError: () =>
    set({ error: null }),
}));
