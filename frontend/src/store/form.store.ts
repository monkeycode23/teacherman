import { create } from "zustand";
import { request } from "../services/api/request";
import { ZodError } from "zod";
import { parseZodErrors } from "../errors/utils";
import { toast } from 'sonner';


interface FormState {
  inputs: Record<string, any | any[]>;
  errors: any;
  name: string;

  loading: boolean;
  /* setForm: (data:Partial<FormState>) => void; */
  setValue: (key: string, value: any) => void;
  setError: (key: string, value: string) => void;
  setLoading: (value: boolean) => void;
  resetForm: () => void;
  setErrors: (errors: any) => void;
  submitState: any;
  submit: (cb: any, schema?: any, onSubmit?: any) => Promise<void>;
  resetErrors: () => void;
}

const useFormStore = create<FormState>((set, get) => ({
  name: "default",
  inputs: {},
  errors: {},
  loading: false,
  submitState: {},
  submit: async ({ url, method }, schema, onSuccess) => {

    const state = get();
    set({ loading: true, errors: {} });

    try {
      /**client validations */
      if (schema) {
        const parsed = schema.safeParse(state.inputs);

        if (!parsed.success) {
          //console.log("Errores de proyecto:", parsed.error);
            const errs = parseZodErrors(parsed.error)
        
            

          set({ errors:errs  ,loading:false});
          return;
        }
      }
      /**
       * server request
       */

      const response = await request({
        url,
        method,
        data: state.inputs,
      });

      if (!response.success) {
        set({ loading: false, errors: response.errors });
        throw new Error("errors")
      }
      
      if (onSuccess) onSuccess(response);
    } catch (error) {
       
      console.log(error);
       toast.error('Algo salió mal');
      set({loading:false})
    }
  },

  /*  setForm: (data) => set((state)=>({
        ...state,
        ...data
    })), */
  resetForm: () =>
    set((state) => ({
      inputs: {},
      errors: {},
      name: "",
      loading: false,
    })),
  setErrors: (errors) =>
    set((state) => ({
      errors: { ...state.errors, ...errors },
    })),
  resetErrors: () =>
    set((state) => ({
      errors: {},
    })),
  setValue: (key, value) => {
    //console.log(`Setting form input ${key} to ${value}`);
    set((state) => ({
      inputs: { ...state.inputs, [key]: value },
    }));
  },
  setError: (key, value) =>
    set((state) => ({
      errors: { ...state.errors, [key]: value },
    })),
  setLoading: (value) =>
    set((state) => ({
      loading: value,
    })),
}));

export default useFormStore;
