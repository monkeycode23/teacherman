import { useState } from "react";
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
} from "lucide-react";

import AddStudentModal from "./students/AddStudentModal";

interface StudentsTabProps {
  students: Student[];
  onUpdateStudents: (students: Student[]) => void;
}

export function StudentsTab({ students }: any) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const onUpdateStudents = (asd:any) => {};

  const handleDeleteStudent = (studentId: string) => {
    onUpdateStudents(students.filter((s:any) => s.id !== studentId));
    if (selectedStudent?.id === studentId) {
      setSelectedStudent(null);
    }
    setActiveMenu(null);
  };

  const filteredStudents = students.filter(
    (student:any) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-gray-900">Estudiantes</h2>
        <AddStudentModal></AddStudentModal>
      </div>

      {students.length === 0 ? (
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                {filteredStudents.map((student:any) => (
                  <div
                    key={student.id}
                    className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                      selectedStudent?.id === student.id ? "bg-blue-50" : ""
                    }`}
                    onClick={() => setSelectedStudent(student)}
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-900 truncate">{student.name}</p>
                        <p className="text-sm text-gray-600 truncate">
                          {student.email}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Promedio</p>
                          <p className="text-gray-900">
                            {student.averageGrade}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Asistencia</p>
                          <p className="text-gray-900">{student.attendance}%</p>
                        </div>
                        <div className="relative">
                          <button
                          title="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveMenu(
                                activeMenu === student.id ? null : student.id
                              );
                            }}
                            className="p-2 hover:bg-gray-100 rounded-lg"
                          >
                            <MoreVertical className="w-5 h-5 text-gray-600" />
                          </button>
                          {activeMenu === student.id && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteStudent(student.id);
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
                ))}
              </div>
            </div>
          </div>

          {/* Student Detail */}
          <div className="lg:col-span-1">
            {selectedStudent ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
                <div className="text-center mb-6">
                  <img
                    src={selectedStudent.avatar}
                    alt={selectedStudent.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                  />
                  <h3 className="text-gray-900 mb-1">{selectedStudent.name}</h3>
                  <p className="text-sm text-gray-600">
                    {selectedStudent.email}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">
                        Fecha de Inscripción
                      </p>
                      <p className="text-gray-900">
                        {new Date().toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">Promedio General</p>
                      <p className="text-gray-900">
                        {selectedStudent.averageGrade}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">Asistencia</p>
                      <p className="text-gray-900">
                        {selectedStudent.attendance}%
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">
                        Correo Electrónico
                      </p>
                      <p className="text-gray-900 text-sm truncate">
                        {selectedStudent.email}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="text-gray-900 mb-3">Actividad Reciente</h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-900">
                        Entregó tarea de Derivadas
                      </p>
                      <p className="text-xs text-blue-600 mt-1">Hace 2 días</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-900">
                        Comentó en Cálculo Diferencial
                      </p>
                      <p className="text-xs text-green-600 mt-1">Hace 5 días</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                <UserCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  Selecciona un estudiante para ver sus detalles
                </p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

