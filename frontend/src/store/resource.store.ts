import { create } from "zustand";
import { nanoid } from "nanoid";
import { Material } from "../types/general";

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

interface ResourcesState {
  resources: Material[];

  addResource: (data: MaterialInput) => string;
  updateResource: (
    id: string,
    data: Partial<Omit<MaterialWithTopic, "id" | "topicId">>
  ) => void;
  removeResource: (id: string) => void;
   setResources:(resources:Material[])=>void;
  getResourcesByTopic: (topicId: string) => MaterialWithTopic[];
}

export const useResourcesStore = create<ResourcesState>((set, get) => ({
  resources: [],

  setResources:(resources)=>set({resources}),
  addResource: (data) => {
    const id = nanoid();

    const newResource: MaterialWithTopic = {
      id,
      topicId: data.topicId,
      type: data.type,
      title: data.title,
      url: data.url,
      thumbnail: data.thumbnail,
      uploadedAt: new Date().toISOString(),
    };

    set((state) => ({
      resources: [...state.resources, newResource],
    }));

    return id;
  },

  updateResource: (id, data) => {
    set((state) => ({
      resources: state.resources.map((r) =>
        r.id === id ? { ...r, ...data } : r
      ),
    }));
  },

  removeResource: (id) => {
    set((state) => ({
      resources: state.resources.filter((r) => r.id !== id),
    }));
  },

  getResourcesByTopic: (topicId) =>
    get().resources.filter((r) => r.topicId === topicId),
}));
