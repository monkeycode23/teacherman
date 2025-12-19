// src/store/activity.store.ts
import { create } from "zustand";
import { Activity } from "../types/general";

interface ActivityState {
  activities: Activity[];
  selectedActivity: Activity | null;
  loading: boolean;
  error: string | null;

  attendances:Record<string  ,boolean>
  // actions
  setActivities: (activities: Activity[]) => void;
  addActivity: (activity: Activity) => void;
  updateActivity: (activityId:string,activity: Activity) => void;
  deleteActivity: (id: string) => void;
  selectActivity: (activity: Activity | null) => void;
  clearError: () => void;
  toggleStudentAttendance:(studentId:string)=>void
}

export const useActivityStore = create<ActivityState>((set) => ({
  activities: [],
  attendances: {},
  selectedActivity: null,
  loading: false,
  error: null,

  toggleStudentAttendance:(studentId)=>set((state)=>{

    const attendance = state.attendances[studentId]


    if(attendance){
        return {
                ...state,
            attendances:{
                ...state.attendances,
                [studentId]:!state.attendances[studentId]
            }
        }
    }
    else return {
        ...state,
        attendances:{
            ...state.attendances,
            [studentId]:true
            
        }
    }
    
    
  }),
  // SET
  setActivities: (activities) =>
    set({ activities }),

  // ADD
  addActivity: (activity) =>
    set((state) => ({
      activities: [...state.activities, activity],
    })),

  // UPDATE
  updateActivity: (activityId,activity) =>
    set((state) => ({
      activities: state.activities.map((a) =>
        a._id === activityId ? activity : a
      ),
      selectedActivity:
        state.selectedActivity?._id === activityId
          ? activity
          : state.selectedActivity,
    })),

  // DELETE
  deleteActivity: (id) =>
    set((state) => ({
      activities: state.activities.filter((a) => a._id !== id),
      selectedActivity:
        state.selectedActivity?._id === id
          ? null
          : state.selectedActivity,
    })),

  // SELECT
  selectActivity: (activity) =>
    set({ selectedActivity: activity }),

  // ERROR
  clearError: () =>
    set({ error: null }),
}));
