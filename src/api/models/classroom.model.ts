import mongoose from "mongoose";
import studentModel from "./student.model";




const inscriptionSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: false, // opcional (no crea _id por cada inscripción)
  }
);

const classroomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    subject: { type: String, required: true },
    description: String,
    url: String,
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    styles: {
      type: Object,
      default: {
        color: "#000000",
        backgroundColor: "#ffffff",
      },
    },

   inscriptions: {
    type: [inscriptionSchema],
    default: [],
  },

     averages: [
      {
        student: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student",
        },
        average: {
          type: Number,
          default: 0,
        },
      },
    ],
    color: {
      type: String,
      default: "#F3F4F6",
    },
    resources: [
      {
        label: String,
        url: String,
      },
    ],
    assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Assignment" }],
    topics: [{ type: mongoose.Schema.Types.ObjectId, ref: "Topic" }],
    
     sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: "ClassSession" }],
    
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],

    events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],

    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],

    assistances: [
      {
        student: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student",
        },
        average: {
          type: Number,
          default: 0,
        },
      },
    ],
    progress: { type: Number, min: 0, max: 100, default: 0 },
  },
  { timestamps: true }
);

classroomSchema.post(
  "deleteOne",
  { document: true, query: false },
  function (doc) {
    console.log("Documento eliminado:", doc._id);

    //eliminar  topics
    /*  if(doc.students.length){
        doc.students.forEach(async(id) => {
            await studentModel.deleteMany()
        });
    } */
    //eliminar students

    //eliminar assignments
  }
);

export default mongoose.model("Classroom", classroomSchema);
