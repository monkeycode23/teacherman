import { z } from "zod";
import { COLORS } from "../../data/example";
// -------------------------
// LOGIN
// -------------------------
export const CreateClassRoomSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio")
  .min(3, { message: "El nombre debe tener al menos 3 caracteres." })
  .max(30, { message: "El nombre no debe tener mas de 30 caracteres." })
  .regex(/^[a-zA-Z0-9 ]+$/,"Solo caracters alhpanumericos y espacios")
  ,
  subject: z.string().min(1, "El nombre es obligatorio")
  .min(3, { message: "La contraseña debe tener al menos 3 caracteres." })
  .max(30, { message: "La contraseña debe tener al menos 30 caracteres." })
   .regex(/^[a-zA-Z0-9 ]+$/,"Solo caracters alhpanumericos y espacios")
  ,
  
  color: z.string().min(1, "El nombre es obligatorio")
  .refine((value) => COLORS.includes(value as any), {
      message: "Color inválido.",
    }),
  
});




  // 👇 Tipo de TypeScript inferido
/* export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>; */