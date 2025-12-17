// src/store/event.store.ts
import { create } from "zustand";
import { Event } from "../types/general";

interface EventState {
  events: Event[];
  selectedEvent: Event | null;
  loading: boolean;
  error: string | null;
    sessions:any[]
  // actions
  setEvents: (events: Event[]) => void;
  addEvent: (event: Event) => void;
  updateEvent: (event: Event) => void;
  deleteEvent: (id: string) => void;
  selectEvent: (event: Event | null) => void;
  clearError: () => void;
}

export const useEventStore = create<EventState>((set) => ({
  events: [],
  selectedEvent: null,
  loading: false,
  error: null,
    sessions:[],
  setEvents: (events) =>
    set({ events }),

  addEvent: (event) =>
    set((state) => ({
      events: [...state.events, event],
    })),

  updateEvent: (event) =>
    set((state) => ({
      events: state.events.map((e) =>
        e._id === event._id ? event : e
      ),
      selectedEvent:
        state.selectedEvent?._id === event._id
          ? event
          : state.selectedEvent,
    })),

  deleteEvent: (id) =>
    set((state) => ({
      events: state.events.filter((e) => e._id !== id),
      selectedEvent:
        state.selectedEvent?._id === id
          ? null
          : state.selectedEvent,
    })),

  selectEvent: (event) =>
    set({ selectedEvent: event }),

  clearError: () =>
    set({ error: null }),
}));
