import React, { useEffect, useState } from "react";
import {
  X,
  FileText,
  Image,
  Video,
  Link as LinkIcon,
  Trash2,
  MessageCircle,
  Send,
  Plus,
  Play,
  Calendar as CalendarIcon,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useTopicsStore } from "../../../../store/topics.store";
import { useResourcesStore } from "../../../../store/resource.store";
import { Material } from "../../../../types/general";

export default function Resources(/* {setAddingMaterial,setNewMaterial,addingMaterial,
    handleAddMaterial,newMaterial,getMaterialIcon,handleDeleteMaterial,topic }:any */) {
  const [addingMaterial, setAddingMaterial] = useState(false);

  const topicStore = useTopicsStore();
  const resourceStore = useResourcesStore();
  const [newMaterial, setNewMaterial] = useState({
    type: "file" as Material["type"],
    title: "",
    url: "",
  });

  useEffect(() => {
    resourceStore.setResources([
      {
        id: "m1",
        type: "file",
        title: "Guía de Derivadas.pdf",
        url: "#",
        uploadedAt: "2024-11-01",
      },
      {
        id: "m2",
        type: "video",
        title: "Clase 1: Límites",
        url: "#",
        thumbnail:
          "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=400&h=225&fit=crop",
        uploadedAt: "2024-11-02",
      },
    ]);

    return () => {};
  }, []);

  const topic = topicStore.topic;

  const getMaterialIcon = (type: Material["type"]) => {
    switch (type) {
      case "file":
        return <FileText className="w-5 h-5" />;
      case "image":
        return <Image className="w-5 h-5" />;
      case "video":
        return <Video className="w-5 h-5" />;
      case "link":
        return <LinkIcon className="w-5 h-5" />;
    }
  };
  const handleAddMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    /* const material: Material = {
            id: Date.now().toString(),
            ...newMaterial,
            uploadedAt: new Date().toISOString(),
          };
          onUpdate({ materials: [...topic.materials, material] });
          setNewMaterial({ type: 'file', title: '', url: '' });
          setAddingMaterial(false); */
  };

  const handleDeleteMaterial = (materialId: string) => {
    /* onUpdate({ materials: topic.materials.filter(m => m.id !== materialId) }); */
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-900">Material de Estudio</h3>
        <button
          onClick={() => setAddingMaterial(true)}
          className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Agregar Material
        </button>
      </div>

      {addingMaterial && (
        <AddResourceForm
          handleAddMaterial={handleAddMaterial}
          setNewMaterial={setNewMaterial}
          newMaterial={newMaterial}
          setAddingMaterial={setAddingMaterial}
        ></AddResourceForm>
      )}

      {resourceStore.resources.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No hay materiales agregados
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {topic?.resources.map((material) => (
            <div
              key={material.id}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                {getMaterialIcon(material.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-900 truncate">{material.title}</p>
                <p className="text-xs text-gray-500">{material.type}</p>
              </div>
              <button
                title="button"
                onClick={() => handleDeleteMaterial(material.id)}
                className="p-1 hover:bg-red-50 rounded text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const AddResourceForm = ({
  handleAddMaterial,
  setNewMaterial,
  newMaterial,
  setAddingMaterial,
}: any) => {
  return (
    <form
      onSubmit={handleAddMaterial}
      className="mb-4 p-4 bg-gray-50 rounded-lg"
    >
      <div className="space-y-3">
        <div>
          <label className="block text-sm text-gray-700 mb-2">Tipo</label>
          <select
            title="select"
            value={newMaterial.type}
            onChange={(e) =>
              setNewMaterial({
                ...newMaterial,
                type: e.target.value as Material["type"],
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="file">Archivo</option>
            <option value="image">Imagen</option>
            <option value="video">Video</option>
            <option value="link">Enlace</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-2">Título</label>
          <input
            type="text"
            value={newMaterial.title}
            onChange={(e) =>
              setNewMaterial({ ...newMaterial, title: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="ej. Guía de estudio"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-2">URL</label>
          <input
            type="text"
            value={newMaterial.url}
            onChange={(e) =>
              setNewMaterial({ ...newMaterial, url: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="URL del material"
            required
          />
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setAddingMaterial(false)}
            className="px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Agregar
          </button>
        </div>
      </div>
    </form>
  );
};
