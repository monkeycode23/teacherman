import React, { useState, useEffect } from "react";
import Modal from "../Modal";
import { Topic } from "../../types/general";
import { Plus } from "lucide-react";
import { useAuthStore } from "../../store/auth.store";
import useFormStore from "../../store/form.store";
import { CreateTopicSchema } from "../../errors/schemas/topic.schema";
import { toast } from "sonner";
import { COLORS } from "../../data/example";
import { useTopicsStore } from "../../store/topics.store";
import { useClassroomsStore } from "../../store/classroom.store";

/**compoenteeee */
export default function CreateTopicModal({ first }: { first?: boolean }) {
  const [showAddTopic, setShowAddTopic] = useState(false);

  const [newTopic, setNewTopic] = useState({ title: "", description: "" });

  const authStore = useAuthStore();
  const formStore = useFormStore();
  const topicStore = useTopicsStore();
const classroomStore = useClassroomsStore();
  useEffect(() => {

    if(!classroomStore.classroom) return;
    if (!authStore.user) return;

    formStore.loading = false;
  
    formStore.setValue("title", "");
    formStore.setValue("description", "");
    formStore.setValue("classroom", classroomStore.classroom!._id);
  }, []);


  const handleAddTopic = (e: React.FormEvent) => {
    e.preventDefault();

    formStore.submit(
      {
        url: "/topics",
        method: "POST",
      },
      CreateTopicSchema,

      (data: any) => {
        topicStore.createTopic(data.data);
        setShowAddTopic(false);

         toast.success('topic createdo con exito!');
      }
    );
    
  };

  return (
    <>
      <button
        onClick={() => setShowAddTopic(true)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        <Plus className="w-5 h-5" />
        Nuevo Tema
      </button>
      <Modal open={showAddTopic}>
        <h2 className="text-gray-900 mb-4">Crear Nuevo Tema</h2>

        <form onSubmit={handleAddTopic}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Título del Tema
              </label>
              <input
                type="text"
                value={formStore.inputs["title"]}
                onChange={(e) =>
                   formStore.setValue("title", e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="ej. Cálculo Diferencial"
              />
              {formStore.errors["title"] && (
                <p className="text-red-600"> {formStore.errors["title"]}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                value={formStore.inputs["description"]}
                onChange={(e) =>
                   formStore.setValue("description", e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="Descripción del tema..."
              />
              {formStore.errors["description"] && (
                <p className="text-red-600">
                  {" "}
                  {formStore.errors["description"]}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={() => setShowAddTopic(false)}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Crear Tema
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
