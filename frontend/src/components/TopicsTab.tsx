import { useEffect, useState } from "react";
import { Topic, Material, Comment } from "../types/general";
import {
  Plus,
  FileText,
  Image,
  Video,
  Link as LinkIcon,
  Trash2,
  MessageCircle,
  Send,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Calendar,
} from "lucide-react";


import { TopicSidePanel } from "./topic/panel/TopicSidePanel";
import CreateTopicModal from "./topic/CreateTopicModal";


import { gql } from "@apollo/client";
import { useQuery, useLazyQuery } from "@apollo/client/react";
import { useClassroomsStore } from "../store/classroom.store";
import { useTopicsStore } from "../store/topics.store";
interface TopicsTabProps {
  topics: Topic[];
  onUpdateTopics: (topics: Topic[]) => void;
}



const GET_USER = gql`
  query getClassroomTopics($classroomId: ID!) {
    getClassroomTopics(classroomId: $classroomId) {
      _id
      title
      description
      
    }
  }
`;


interface GetClassroomsResponse {
  getClassroomTopics: Topic[];
}

interface GetClassroomsVars {
  classroomId: string;
}


export function TopicsTab({ topics, onUpdateTopics }: TopicsTabProps) {
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

  const [addingMaterialTo, setAddingMaterialTo] = useState<string | null>(null);
  const [newMaterial, setNewMaterial] = useState({
    type: "file" as Material["type"],
    title: "",
    url: "",
  });

  const [activeTopic, setActiveTopic] = useState<Topic | null>(null);

  const [commentText, setCommentText] = useState<{ [key: string]: string }>({});

  const classroomStore = useClassroomsStore()

  const topicStore = useTopicsStore()

  const [_user, { data, loading, error }] = useLazyQuery<
     GetClassroomsResponse,
     GetClassroomsVars
   >(GET_USER);
   useEffect(() => {
     
    if(!classroomStore.classroom) return 

     const fetchClassRoomData = async ()=>{
 
  
       const response: any = await _user({
         variables: { classroomId: String(classroomStore.classroom!._id) },
       });
       console.log(response, "asdassdasdasd", data);
 
       if(data){
        topicStore.setTopics(data.getClassroomTopics)
          // classroomStore.setClassroom(data.getClassroom ?? []);
       } 
     }
 
     fetchClassRoomData()
     return () => {
       
     }
   }, [data,classroomStore.classroom])
   
  

  const handleDeleteTopic = (topicId: string) => {
    onUpdateTopics(topics.filter((t) => t._id !== topicId));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-gray-900">Temario del Curso</h2>
        <CreateTopicModal></CreateTopicModal>
      </div>

      {topicStore.topics.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-gray-900 mb-2">No hay temas creados</h3>
          <p className="text-gray-600 mb-4">
            Comienza creando el primer tema del curso
          </p>
          <CreateTopicModal></CreateTopicModal>
        </div>
      ) : (
        <div className="space-y-4">
          {topicStore.topics.map((topic, index) => (
            <div
              key={topic._id}
              onClick={() => setActiveTopic(topic)}
              className="bg-white rounded-lg shadow-sm border border-gray-200"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-1">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                        {index + 1}
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 ">{topic.title}</h3>
                    </div>
                    <p className="text-gray-600">{topic.description}</p>

                    <div className="flex items-center gap-6 mt-6 text-gray-500">
                      {/* Recursos */}
                      <div className="flex items-center gap-1 text-sm">
                        <FileText className="w-4 h-4" />
                        <span>{topic.resources?.length ?? 0}</span>
                      </div>

                      {/* Comentarios */}
                      <div className="flex items-center gap-1 text-sm">
                        <MessageCircle className="w-4 h-4" />
                        <span>{topic.comments?.length ?? 0}</span>
                      </div>

                      {/* Quizzes */}
                      <div className="flex items-center gap-1 text-sm">
                        <BookOpen className="w-4 h-4" />
                        <span>{topic.quizzes?.length ?? 0}</span>
                      </div>

                      {/* Eventos */}
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>{topic.events?.length ?? 0}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        setExpandedTopic(
                          expandedTopic === topic.id ? null : topic.id
                        )
                      }
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      {expandedTopic === topic.id ? (
                        <ChevronUp className="w-5 h-5 text-gray-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-600" />
                      )}
                    </button>
                    <button
                      title="button"
                      onClick={() => handleDeleteTopic(topic.id)}
                      className="p-2 hover:bg-red-50 rounded-lg text-red-600"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Topic Modal */}

      {activeTopic && (
        <TopicSidePanel
          topic={activeTopic}
          onClose={() => setActiveTopic(null)}
          onUpdate={(updates: any) => {
            console.log(updates);
            //updateTopic(activeTopic.id, updates)
          }}
        />
      )}
    </div>
  );
}

/* 
const ExpandTopic = ()=>{

  return ( {expandedTopic === topic.id && (
                  <div className="space-y-6 mt-6 pt-6 border-t border-gray-200">
                    {/* Materials Section 
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-gray-900">Material de Estudio</h4>
                        <button
                          onClick={() => setAddingMaterialTo(topic.id)}
                          className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                        >
                          <Plus className="w-4 h-4" />
                          Agregar Material
                        </button>
                      </div>

                      {addingMaterialTo === topic.id && (
                        <form onSubmit={(e) => handleAddMaterial(topic.id, e)} className="mb-4 p-4 bg-gray-50 rounded-lg">
                          <div className="space-y-3">
                            <div>
                              <label className="block text-sm text-gray-700 mb-2">Tipo</label>
                              <select
                                value={newMaterial.type}
                                onChange={(e) => setNewMaterial({ ...newMaterial, type: e.target.value as Material['type'] })}
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
                                onChange={(e) => setNewMaterial({ ...newMaterial, title: e.target.value })}
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
                                onChange={(e) => setNewMaterial({ ...newMaterial, url: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                placeholder="URL del material"
                                required
                              />
                            </div>
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => setAddingMaterialTo(null)}
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
                      )}

                      {topic.materials.length === 0 ? (
                        <p className="text-gray-500 text-sm">No hay materiales agregados</p>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {topic.materials.map(material => (
                            <div key={material.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                                {getMaterialIcon(material.type)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-gray-900 truncate">{material.title}</p>
                                <p className="text-xs text-gray-500">{material.type}</p>
                              </div>
                              <button
                                onClick={() => handleDeleteMaterial(topic.id, material.id)}
                                className="p-1 hover:bg-red-50 rounded text-red-600"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Comments Section 
                    <div>
                      <h4 className="text-gray-900 mb-4 flex items-center gap-2">
                        <MessageCircle className="w-5 h-5" />
                        Comentarios y Preguntas
                      </h4>

                      <div className="space-y-4">
                        {topic.comments.map(comment => (
                          <div key={comment.id} className="flex gap-3 p-4 bg-gray-50 rounded-lg">
                            <img
                              src={comment.studentAvatar}
                              alt={comment.studentName}
                              className="w-10 h-10 rounded-full"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="text-gray-900">{comment.studentName}</p>
                                <p className="text-xs text-gray-500">
                                  {new Date(comment.timestamp).toLocaleDateString()}
                                </p>
                              </div>
                              <p className="text-gray-700">{comment.content}</p>
                            </div>
                          </div>
                        ))}

                        <div className="flex gap-3">
                          <input
                            type="text"
                            value={commentText[topic.id] || ''}
                            onChange={(e) => setCommentText({ ...commentText, [topic.id]: e.target.value })}
                            placeholder="Responder o agregar un comentario..."
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handleAddComment(topic.id);
                              }
                            }}
                          />
                          <button
                            onClick={() => handleAddComment(topic.id)}
                            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                          >
                            <Send className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )})
} */
