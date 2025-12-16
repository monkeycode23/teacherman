
import mongoose from "mongoose";

const ColaboratorSchema = new mongoose.Schema({
 
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
    role:{
        
    }

}, { timestamps: true });

export default mongoose.model("Collaborator", ColaboratorSchema);
