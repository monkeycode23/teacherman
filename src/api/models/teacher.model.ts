
import mongoose from "mongoose";

const TeacherSchema = new mongoose.Schema({
 
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    classrooms: { type: mongoose.Schema.Types.ObjectId, ref: "Classroom", required: true },
    /* role:{
        
    } */

}, { timestamps: true });

export default mongoose.model("Collaborator", TeacherSchema);
