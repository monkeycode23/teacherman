
import ClassroomService from "../../api/services/classroom.service";
import classroomModel from "../../api/models/classroom.model";
import StudentService from "../../api/services/student.service";

export  const studentResolvers = {

      getClassroomStudents: async (_: any, args: any) => {
      try {
        const { classroomId } = args;
        
        const students = await StudentService.getClassroomStudents(args)

        console.log(students,"asdkasdjkasdakjsdhasd")

        if(!students) throw new Error("Classroom not found");

        
        //const students = await studentModel.find({classroom:classroomId})

        return students
      } catch (error: any) {
        return { error: error.message };
      }
    },
}