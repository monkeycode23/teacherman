import { create } from "zustand";
import { request } from "../services/api/request";
import { ZodError } from "zod";
import { parseZodErrors } from "../errors/utils";
import { toast } from 'sonner';


interface FormState {
 
    selectedDate:Date
}

const useCalendarStore = create<FormState>((set, get) => ({

    selectedDate:new Date()
 
}));

export default useCalendarStore;
