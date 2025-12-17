import { useState, useEffect } from "react";
import { Student } from "../../types/general";
import Modal from "../Modal";
import useFormStore from "../../store/form.store";
import { useAuthStore } from "../../store/auth.store";
import { CreateStudentSchema } from "../../errors/schemas/student.schema";

import { Plus } from "lucide-react";

/**cmponent */
const AddStudentModal = () => {
  const [showAddStudent, setShowAddStudent] = useState(false);

  const formStore = useFormStore();
  const authStore = useAuthStore();

  // siii un store para los formularios

  useEffect(() => {
    if (!authStore.user) return;
    formStore.loading = false;
    formStore.setValue("names", "");
    formStore.setValue("lastname", "");
    formStore.setValue("email", "");
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
            console.log(data,"asdasdasd")
      }
    );
  };

  return (
    <>
      <button
        onClick={() => setShowAddStudent(true)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        <Plus className="w-5 h-5" />
        Agregar Estudiante
      </button>

      <Modal open={showAddStudent} title={"Agregar Estudiante"}>
        <form onSubmit={handleAddStudent}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Nombres
              </label>
              <input
                type="text"
                value={formStore.inputs["names"]}
                onChange={(e) => formStore.setValue("names", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="ej. Juan Pérez"
                required
              />
               {formStore.errors["names"] && (
                <p className="text-red-600"> {formStore.errors["names"]}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Apellido
              </label>
              <input
                type="text"
                value={formStore.inputs["lastname"]}
                onChange={(e) => formStore.setValue("lastname", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="ej. Juan Pérez"
                required
              />
               {formStore.errors["lastname"] && (
                <p className="text-red-600"> {formStore.errors["lastname"]}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                value={formStore.inputs["email"]}
                onChange={(e) => formStore.setValue("email", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="juan@example.com"
              />
               {formStore.errors["email"] && (
                <p className="text-red-600"> {formStore.errors["email"]}</p>
              )}
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={() => setShowAddStudent(false)}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Agregar
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddStudentModal;
