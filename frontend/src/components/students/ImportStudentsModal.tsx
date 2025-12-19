import { useState, useEffect } from "react";
import { Student } from "../../types/general";
import Modal from "../Modal";
import useFormStore from "../../store/form.store";
import { useAuthStore } from "../../store/auth.store";
import { CreateStudentSchema } from "../../errors/schemas/student.schema";

import { Plus,Import } from "lucide-react";
import { useListStore } from "../../store/pagination.store";

/**cmponent */
const ImportStudentsModal = () => {
  const [showAddStudent, setShowAddStudent] = useState(false);

  const [students, setStudents] = useState<any[]>([]);
  const [selectedStudents, setSelectStudents] = useState<any[]>([]);

  const formStore = useFormStore();
  const authStore = useAuthStore();
  const listStore = useListStore();

  // siii un store para los formularios

  const setSelectedStudent = (value: string) => {
    setSelectStudents([...selectedStudents, value]);
  };

  const removeSelectedStudent = (value: string) => {
    setSelectStudents((prev) => {
      return prev.filter((val) => val != value);
    });
  };

  useEffect(() => {
    if (!authStore.user) return;
    /* formStore.loading = false;
    formStore.setValue("names", "");
    formStore.setValue("lastname", "");
    formStore.setValue("email", ""); */

    listStore.clearFilters();
  }, []);

  const handleAddStudent = async (e: React.FormEvent) => {
    /*  e.preventDefault();
    const student: Student = {
      id: Date.now().toString(),
      ...newStudent,
      avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000000000)}?w=100&h=100&fit=crop`,
      enrollmentDate: new Date().toISOString().split('T')[0],
      attendance: 100,
      averageGrade: 0,
    };
    onUpdateStudents([...students, student]);
    setNewStudent({ name: '', email: '' });
    setShowAddStudent(false); */

    e.preventDefault();

    await formStore.submit(
      {
        url: "/students",
        method: "POST",
      },
      CreateStudentSchema,
      (data: any) => {
        /*  console.log("class",data)
             classRoomStore.createClassroom({
              ...data.data,
            });                                 
            setShowAddModal(false); */
        console.log(data, "asdasdasd");
      }
    );
  };

  return (
    <>
      <button
        onClick={() => setShowAddStudent(true)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        <Import className="w-5 h-5" />
        Importar Estudiantes
      </button>

      <Modal open={showAddStudent} title={"Agregar Estudiante"}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Aula</label>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Nombre Apellido
            </label>
            <input
              type="text"
              value={listStore.filters["lastnames"] ?? ""}
              onChange={(e) => listStore.filters["lastnames"]}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="ej. Juan Pérez"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              value={listStore.filters["email"] ?? ""}
              onChange={(e) => listStore.filters["email"]}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="juan@example.com"
            />
          </div>
        </div>

        {/* students lists */}

        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">

            <div className="divide-y divide-gray-200">
              {students.map((student: any) => (
                <div
                  key={student._id}
                  className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                    // selectedStudent?.id === student.id ? "bg-blue-50" : ""
                    ""
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
                      <CheckButton
                        checked={selectedStudents.find(
                          (s) => s._id == student._id
                        )}
                        onChange={() => {}}
                      ></CheckButton>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

import { Check } from "lucide-react";

interface CheckButtonProps {
  checked: boolean;
  onChange: () => void;
}

export const CheckButton = ({ checked, onChange }: CheckButtonProps) => {
  return (
    <button
      onClick={onChange}
      className={`w-8 h-8 rounded-md border flex items-center justify-center transition
        ${
          checked
            ? "bg-blue-600 border-blue-600 text-white"
            : "bg-white border-gray-300 text-gray-400 hover:border-blue-400"
        }
      `}
    >
      {checked && <Check size={18} />}
    </button>
  );
};

import { X } from "lucide-react";

interface StudentChipProps {
  student: Student;
  onRemove: (id: string) => void;
}

export const StudentChip = ({ student, onRemove }: StudentChipProps) => {
  return (
    <div className="flex items-center gap-2 bg-gray-100 border border-gray-300 rounded-full px-3 py-1">
      {/* Avatar */}
      {student.avatar ? (
        <img
          src={student.avatar}
          alt={`${student.names} ${student.lastname}`}
          className="w-6 h-6 rounded-full object-cover"
        />
      ) : (
        <div className="w-6 h-6 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center">
          {student.names}
          {student.lastname}
        </div>
      )}

      {/* Name */}
      <span className="text-sm whitespace-nowrap">
        {student.names} {student.lastname}
      </span>

      {/* Remove */}
      <button
        title="button"
        onClick={() => onRemove(student.id)}
        className="hover:bg-gray-300 rounded-full p-1 transition"
      >
        <X size={14} />
      </button>
    </div>
  );
};

export default ImportStudentsModal;
