import { useEffect, useState } from "react";
import { Student } from "../types/general";
import {
  Plus,
  Mail,
  Calendar,
  TrendingUp,
  CheckCircle,
  Search,
  MoreVertical,
  Trash2,
  UserCircle,
  User2,
} from "lucide-react";

import { request } from "../services/api/request";

import AddStudentModal from "./students/AddStudentModal";
import { useStudentsStore } from "../store/student.store";
import { gql } from "@apollo/client";
import { useQuery, useLazyQuery } from "@apollo/client/react";
import { useAuthStore } from "../store/auth.store";
import { useClassroomsStore } from "../store/classroom.store";
import { StudentSidePanel } from "./students/StudentSidePanel";
import ImportStudentsModal from "./students/ImportStudentsModal";

import { toast } from "sonner";

import { GET_STUDENTS,GetStudentResponse,GetStudentVars } from "../graphql/students.querties";
interface StudentsTabProps {
  students: Student[];
  onUpdateStudents: (students: Student[]) => void;
}



export function StudentsTab({ students }: any) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const [activeStudent, setActiveStudent] = useState<Student | null>(null);

  const studentSore = useStudentsStore();
  const authStore = useAuthStore();
  const classRoomStore = useClassroomsStore();

  const [_students, { data, loading, error }] = useLazyQuery<
    GetStudentResponse,
    GetStudentVars
  >(GET_STUDENTS, {
    fetchPolicy: "network-only", // 🔥
  });

  useEffect(() => {
    if (!authStore.user) return;

    const fetch = async () => {
      const response: any = await _students({
        variables: { classroomId: String(classRoomStore.classroom!._id) },
      });
      console.log(response, "students", data);

      if (data) {
        studentSore.setStudents(data.getClassroomStudents.data ?? []);
      }
    };

    fetch();

    return () => {};
  }, [data]);

  const onUpdateStudents = (asd: any) => {};

  const handleDeleteStudent = async (studentId: string) => {
    if (!classRoomStore.classroom) return;

    const classroomId = classRoomStore.classroom._id;

    try {
      const response = await request({
        url: `/students/${classroomId}/${studentId}`,
        method: "DELETE",
      });
      if (!response.success) throw new Error("error");

      studentSore.removeStudent(studentId);
      toast.success("Estudiante eliminado con exito");
    } catch (error) {
      toast.error("Ocurrio un error al intentar eliminar el estudiante");
      console.log(error);
    }
    /* onUpdateStudents(students.filter((s:any) => s.id !== studentId));
    if (selectedStudent?.id === studentId) {
      setSelectedStudent(null);
    }
    setActiveMenu(null); */
  };

  /*   const filteredStudents = students.filter(
    (student:any) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
 */

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-gray-900">Estudiantes</h2>

        <div className="flex gap-2">
          <ImportStudentsModal></ImportStudentsModal>
          <AddStudentModal></AddStudentModal>
        </div>
      </div>

      {studentSore.students.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <UserCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-gray-900 mb-2">No hay estudiantes inscritos</h3>
          <p className="text-gray-600 mb-4">
            Comienza agregando estudiantes a esta aula
          </p>
          {/*  <button
            onClick={() => setShowAddStudent(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Agregar Primer Estudiante
          </button> */}
        </div>
      ) : (
        <div className="">
          {/* Students List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar estudiante..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {studentSore.students.map((student: any) => (
                  <StudentListItem
                    key={student._id}
                    student={student}
                    activeMenu={activeMenu}
                    handleDeleteStudent={handleDeleteStudent}
                    setActiveMenu={setActiveMenu}
                    setActiveStudent={setActiveStudent}
                    selectedStudent={selectedStudent}
                  ></StudentListItem>
                ))}
              </div>
            </div>
          </div>
          {activeStudent && (
            <StudentSidePanel
              student={activeStudent}
              onClose={() => {
                setActiveStudent(null);
              }}
              onUpdate={(updates: any) => {
                console.log(updates);
                //updateTopic(activeTopic.id, updates)
              }}
            />
          )}
          {/* Student Detail */}
        </div>
      )}
    </div>
  );
}

const StudentListItem = ({
  student,
  activeMenu,
  handleDeleteStudent,
  setActiveMenu,
  setActiveStudent,
  setSelectedStudent,
  selectedStudent,
}: any) => {
  return (
    <div
      key={student._id}
      className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
        selectedStudent?.id === student._id ? "bg-blue-50" : ""
      }`}
      onClick={() => {
        setActiveStudent(student);
        setSelectedStudent(student);
      }}
    >
      <div className="flex items-center gap-4">
        <img
          src={
            "https://api.dicebear.com/7.x/initials/svg?seed=" +
            student.names +
            student.lastname
          }
          alt={student.names}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <p className="text-gray-900 truncate">
            {student.names} {student.lastname}
          </p>
          <p className="text-sm text-gray-600 truncate">{student.email}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-gray-600">Promedio</p>
            <p className="text-gray-900">{0}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Asistencia</p>
            <p className="text-gray-900">{0}%</p>
          </div>
          <div className="relative">
            <button
              title="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveMenu(activeMenu === student._id ? null : student._id);
              }}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>
            {activeMenu === student._id && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteStudent(student._id);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                  Eliminar Estudiante
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
