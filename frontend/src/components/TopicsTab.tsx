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

import { request } from "../services/api/request";

import { toast } from "sonner";
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
   >(GET_USER,{
    fetchPolicy: "network-only", // 🔥
   });


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
   
  

  const handleDeleteTopic = async(topicId: string) => {
 
   if (!classroomStore.classroom) return;

    const classroomId = classroomStore.classroom._id;

    try {
      const response = await request({
        url: `/topics/${classroomId}/${topicId}`,
        method: "DELETE",
      });
      if (!response.success) throw new Error("error");

      topicStore.removeTopic(topicId)
      toast.success("Estudiante eliminado con exito");
    } catch (error) {
      toast.error("Ocurrio un error al intentar eliminar el estudiante");
      console.log(error);
    }
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
                          expandedTopic === topic._id ? null : topic._id
                        )
                      }
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      {expandedTopic === topic._id ? (
                        <ChevronUp className="w-5 h-5 text-gray-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-600" />
                      )}
                    </button>
                    <button
                      title="button"
                      onClick={(e) =>{
                        
                           e.stopPropagation();
                        handleDeleteTopic(topic._id)}}
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

