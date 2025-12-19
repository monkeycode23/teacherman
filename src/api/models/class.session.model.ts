import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  status: {
    type: String,
    enum: ["assisted", "absent"],
    default: "absent",
  },
});

/* const activitySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["attendance", "reading", "exercises", "oral_lesson", "custom"],
      default: "exercises",
    },
    description:String,
    title: String,
    completed: Boolean,
    order: Number,
  },
  {
    _id: false, // opcional (no crea _id por cada inscripción)
  }
); */

const classSessionSchema = new mongoose.Schema(
  {

    title:{
      type:String,
      default:"Class Session"  
    },
     description:{
      type:String,
      default:"Class Session"  
    },
    sessionDate: {
      type: Date,
      default: Date.now(),
    },

    startTime: {
      type: String,
      default: "00:00",
    },
    endTime: {
      type: String,
      default: "00:00",
    },
    classroom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Classroom",
      required: true,
    },
    activities: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "SessionActivity",
      required: true,
    }],

    progress:{
        type:Number,
        default:0
    },
    
    status:{
        type:String,
        enum:["pending","active","completed"],
        default:"pending"  
    },

    attendance: [attendanceSchema],
  },
  { timestamps: true }
);

export default mongoose.model("ClassSession", classSessionSchema);
