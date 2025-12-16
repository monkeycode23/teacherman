import mongoose from "mongoose";
import studentModel from "./student.model";
const classroomSchema = new mongoose.Schema({
	name: { type: String, required: true },
	 subject: { type: String, required: true },
	description: String,

	teacher: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	styles:{
		type:Object,
		default:{
			color:"#000000",
			backgroundColor:"#ffffff",  
		}
	},        

	color:{ 
		type:String,
        default:"#F3F4F6",
	},
	resources:[
		 {
			label: String,
		url: String,
	}
	],
	assignments: [
		{ type: mongoose.Schema.Types.ObjectId, ref: "TaskLists" }
	],
	 topics: [
		{ type: mongoose.Schema.Types.ObjectId, ref: "TaskLists" }
	],
	students: [
		{ type: mongoose.Schema.Types.ObjectId, ref: "User" }
	],

	events: [
		{ type: mongoose.Schema.Types.ObjectId, ref: "Area" }
	],

	tags:[
		{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }
	],

	progress: { type: Number, min: 0, max: 100, default: 0 },

}, { timestamps: true });



classroomSchema.post('deleteOne', { document: true, query: false }, function (doc) {
	console.log('Documento eliminado:', doc._id);

    //eliminar  topics 
   /*  if(doc.students.length){
        doc.students.forEach(async(id) => {
            await studentModel.deleteMany()
        });
    } */
    //eliminar students

    //eliminar assignments
	
});


export default mongoose.model("Classroom", classroomSchema);
