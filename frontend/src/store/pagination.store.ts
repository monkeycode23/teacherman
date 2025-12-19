


export interface PaginationState {
  page: number;
  limit: number;
  total: number;
}

export type SortOrder = "asc" | "desc";

export type Filters = Record<string, any>;




import { create } from "zustand";

interface ListStore {
  // pagination
  page: number;
  limit: number;
  total: number;

  // filters & search
  filters: Filters;
  search: string;
  sortBy?: string;
  sortOrder: SortOrder;

  // actions
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setTotal: (total: number) => void;

  setFilter: (key: string, value: Filters[string]) => void;
  removeFilter: (key: string) => void;
  clearFilters: () => void;

  setSearch: (value: string) => void;

  setSort: (field: string, order?: SortOrder) => void;

  reset: () => void;
}

const initialState = {
  page: 1,
  limit: 10,
  total: 0,
  filters: {},
  search: "",
  sortBy: undefined,
  sortOrder: "asc" as SortOrder,
};

export const useListStore = create<ListStore>((set) => ({
  ...initialState,

  setPage: (page) => set({ page }),
  setLimit: (limit) => set({ limit }),

  setTotal: (total) => set({ total }),

  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
      page: 1,
    })),

  removeFilter: (key) =>
    set((state) => {
      const { [key]: _, ...rest } = state.filters;
      return { filters: rest, page: 1 };
    }),

  clearFilters: () => set({ filters: {}, page: 1 }),

  setSearch: (search) => set({ search, page: 1 }),

  setSort: (field, order = "asc") =>
    set({ sortBy: field, sortOrder: order, page: 1 }),

  reset: () => set(initialState),
}));
