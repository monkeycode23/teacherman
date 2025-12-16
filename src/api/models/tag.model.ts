import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true,
    lowercase: true // para unificar "Urgente" y "urgente"
  },
  color: { 
    type: String, 
    default: "#666666", // gris por defecto
    //match: /^#([0-9A-F]{3}){1,2}$/i // opcional: valida que sea un color hex
  },
   text: { 
    type: String, 
    default: "#666666", // gris por defecto
    //match: /^#([0-9A-F]{3}){1,2}$/i // opcional: valida que sea un color hex
  },
  icon: { 
    type: String, 
    default: "🏷️" // puedes usar emojis o URLs de iconos
  },
}, { timestamps: true });

export default mongoose.model("Tag", tagSchema);
