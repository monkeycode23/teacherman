import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import { Plus } from "lucide-react";
import { useClassroomsStore } from "../../store/classroom.store";
import useFormStore from "../../store/form.store";
import { CreateClassRoomSchema } from "../../errors/schemas/classroom.schema";
import { COLORS } from "../../data/example";
import ButtonSpinner from "../Spinner";
import { useAuthStore } from "../../store/auth.store";


/**component */

export default function CreateClassRoomModal() {
  const [showAddModal, setShowAddModal] = useState(false);
  const classRoomStore = useClassroomsStore();
  const formStore = useFormStore();
  const authStore = useAuthStore();

  
  useEffect(()=>{

    if(!authStore.user) return 

    formStore.loading=false
    formStore.setValue("color", COLORS[0])
    formStore.setValue("name", "")
    formStore.setValue("subject", "")
    formStore.setValue("teacher", authStore.user._id)
  },[])
  //create aula
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await formStore.submit(
      {
        url: "/classrooms",
        method: "POST",
      },
      CreateClassRoomSchema,
      (data: any) => {
        console.log("class",data)
         classRoomStore.createClassroom({
          ...data.data,
        });                                 
        setShowAddModal(false);
      }
    );
  };

  return (
    <>
      <button
        onClick={() => setShowAddModal(true)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        <Plus className="w-5 h-5" />
        Nueva Aula
      </button>

      <Modal open={showAddModal}>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Nombre del Aula
              </label>
              <input
                type="text"
                value={formStore.inputs["name"] || ""}
                onChange={(e) => formStore.setValue("name", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="ej. Matemáticas Avanzadas"
                
              />
               {formStore.errors["name"] && (
                <p className="text-red-600"> {formStore.errors["name"]}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Materia
              </label>
              <input
                type="text"
                value={formStore.inputs["subject"] || ""}
                onChange={(e) =>
                  formStore.setValue("subject", e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="ej. Matemáticas"
                
              />
              {formStore.errors["subject"] && (
                <p className="text-red-600"> {formStore.errors["subject"]}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Color</label>
              <div className="flex gap-2">
                {COLORS.map((color) => (
                  <button
                    title="button"
                    key={color}
                    type="button"
                    onClick={() => formStore.setValue("color", color)}
                    className={`w-10 h-10 rounded-lg ${
                      formStore.inputs["color"] === color
                        ? "ring-2 ring-offset-2 ring-gray-900"
                        : ""
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {
                formStore.loading ? (<ButtonSpinner></ButtonSpinner>): "crear aula"
              }
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
