import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import { Plus, X } from "lucide-react";
import { useClassroomsStore } from "../../store/classroom.store";
import useFormStore from "../../store/form.store";
import { CreateClassRoomSchema } from "../../errors/schemas/classroom.schema";
import { COLORS } from "../../data/example";
import ButtonSpinner from "../Spinner";
import { useAuthStore } from "../../store/auth.store";
import { CreateEventSchema } from "../../errors/schemas/event.schema";
import { useEventStore } from "../../store/event.store";
const colorOptions = [
  { value: "bg-blue-500", label: "Azul" },
  { value: "bg-purple-500", label: "Púrpura" },
  { value: "bg-pink-500", label: "Rosa" },
  { value: "bg-green-500", label: "Verde" },
  { value: "bg-orange-500", label: "Naranja" },
  { value: "bg-red-500", label: "Rojo" },
];

/**component */

export default function CreateEventModal({date}:any) {
  const [showAddModal, setShowAddModal] = useState(false);
  const classRoomStore = useClassroomsStore();
  const formStore = useFormStore();
  const authStore = useAuthStore();

  const eventStore = useEventStore()
  /* const [formData, setFormData] = useState({
    title: "",
    timeStart: "",
    timeEnd: "",
    description: "",
    color: "bg-blue-500",
    classroom: "",
    type: "",
  }); */
  useEffect(() => {
    if (!authStore.user) return;
    formStore.resetForm()
    formStore.loading = false;
    formStore.setValue("color", COLORS[0]);
    formStore.setValue("date",date);
    formStore.setValue("description", "");
    formStore.setValue("title", "");
    formStore.setValue("classroom", "");
    formStore.setValue("timeStart", "");
    formStore.setValue("timeEnd", "");
    formStore.setValue("type", "");
  }, []);
  //create aula
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(formStore.inputs)

     await formStore.submit(
      {
        url: "/events",
        method: "POST",
      },
      CreateEventSchema,
      (data: any) => {
        console.log("evnet", data);
        /* event.createClassroom({
          ...data.data,
        }); */

        eventStore.addEvent(data.data)
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
        crear evento
      </button>

      <Modal open={showAddModal}>
        <form onSubmit={handleSubmit} className="  rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900">{"Nuevo Evento"}</h3>
            <button
            title="buton"
              type="button"
              /* nClick={handleCancel} */
              className="p-1 hover:bg-indigo-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="space-y-3">
            <input
              type="text"
              placeholder="Título del evento"
              value={formStore.inputs["title"]}
              onChange={(e) =>
                formStore.setValue("title",e.target.value)
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            
            />

             {formStore.errors["title"] && (
                <p className="text-red-600"> {formStore.errors["title"]}</p>
              )}

            <div>
              <SelectEventType></SelectEventType>
               {formStore.errors["type"] && (
                <p className="text-red-600"> {formStore.errors["type"]}</p>
              )}
            </div>

            <div className="">
              <SelectClassrooms ></SelectClassrooms>
               {formStore.errors["classroom"] && (
                <p className="text-red-600"> {formStore.errors["classroom"]}</p>
              )}
            </div>

            <div className="flex gap-2">
                <div>

                    <input
                    title="input"
                      type="time"
                       value={formStore.inputs["timeStart"]}
                      onChange={(e) =>
                       formStore.setValue("timeStart",e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                   
                    />

                     {formStore.errors["timeStart"] && (
                <p className="text-red-600"> {formStore.errors["timeStart"]}</p>
              )}
                </div>
              <div>

              <input
              title="input"
                type="time"
                value={formStore.inputs["timeEnd"]}
                onChange={(e) =>formStore.setValue("timeEnd",e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              
              />
               {formStore.errors["timeEnd"] && (
                <p className="text-red-600"> {formStore.errors["timeEnd"]}</p>
              )}
              </div>

            </div>
            <textarea
              placeholder="Descripción (opcional)"
              value={formStore.inputs["description"]}
              onChange={(e) =>
                formStore.setValue("description",e.target.value)
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              rows={3}
            />

             {formStore.errors["description"] && (
                <p className="text-red-600"> {formStore.errors["description"]}</p>
              )}

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
                 {formStore.errors["color"] && (
                <p className="text-red-600"> {formStore.errors["color"]}</p>
              )}
              </div>
            </div>
            {/*   <div>
                      <label className="block text-gray-700 mb-2">Color</label>
                      <div className="flex gap-2">
                        {colorOptions.map((color) => (
                          <button
                            key={color.value}
                            type="button"
                            onClick={() => setFormData({ ...formData, color: color.value })}
                            className={`w-8 h-8 rounded-full ${color.value} ${
                              formData.color === color.value ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                            }`}
                            title={color.label}
                          />
                        ))}
                      </div>
                    </div> */}

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
                {formStore.loading ? <ButtonSpinner></ButtonSpinner> : "crear "}
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}

const SelectClassrooms = ({ }: any) => {
  const classRoomStore = useClassroomsStore();
  const formStore = useFormStore();
  return (
    <>
      <select
        title="select"
        onChange={(e) => formStore.setValue("classroom",e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      >
        <option>aula</option>
        {classRoomStore.classrooms.map((e) => (
          <option value={e._id}>
            {e.name} {e.subject}
          </option>
        ))}
      </select>
    </>
  );
};

const SelectEventType = ({   }: any) => {
  const types = [
    {
      value: "class",
      label: "session clase",
    },
    {
      value: "exam",
      label: "examen",
    },
    {
      value: "oral-lesson",
      label: "lecion oral",
    },

    {
      value: "grupal-project",
      label: "proyecto grupal",
    },
  ];

   const formStore = useFormStore();

  return (
    <>
      <select
        title="select"
        onChange={(e) => formStore.setValue("type",e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      >
        <option>evento</option>
        {types.map((e) => (
          <option value={e.value}>{e.label} </option>
        ))}
      </select>
    </>
  );
};
