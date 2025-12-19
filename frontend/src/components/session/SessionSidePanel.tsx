import { useEffect, useState } from 'react';
import { Topic, Material, Comment, Quiz, QuizQuestion, TopicEvent } from "../../types/general"
import { X, FileText, Image, Video, Link as LinkIcon, 
     MessageCircle, Send, Play, 
    Calendar as CalendarIcon,  XCircle } from 'lucide-react';
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
  User2
} from "lucide-react";
import { SessionFlow } from './SessionFlow';


interface TopicModalProps {
  topic: Topic;
  onClose: () => void;
  onUpdate: (updates: Partial<Topic>) => void;
}

type TabType = 'session' | 'stats' |'activities' | 'exams' | 'configs';

export function SessionSidePanel({session,onClose}:any) {
  const [activeTab, setActiveTab] = useState<TabType>('session');
  
 
  const [commentText, setCommentText] = useState('');
  const [addingQuiz, setAddingQuiz] = useState(false);
  const [newQuiz, setNewQuiz] = useState({
    title: '',
    description: '',
    questions: [] as QuizQuestion[],
  });
  const [takingQuiz, setTakingQuiz] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: string]: number }>({});
  const [quizResults, setQuizResults] = useState<{ [key: string]: boolean } | null>(null);
  const [addingEvent, setAddingEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    type: 'other' as TopicEvent['type'],
  });


   const onUpdate =(a:any)=>{}


  return (
    <div className="fixed inset-0 z-50 flex">
  {/* Backdrop */}
  <div
    onClick={onClose}
    className="flex-1 bg-black/40"
  />

  {/* Panel */}
  <div className="w-[800px] sm:w-[480px] md:w-[600px] lg:w-[800px] bg-white h-full shadow-xl flex flex-col animate-slide-in">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-start justify-between">
          <div>
            <h2 className="text-gray-900 mb-1 font-bold text-lg">{session.title}</h2>
            <p className="text-gray-600">{session.description}</p>
          </div>
          <button
          title='button'
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
       {/*  <div className="border-b border-gray-200 px-6">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('session')}
              className={`px-4 py-3 border-b-2 transition-colors ${
                activeTab === 'session'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Sesion
            </button>
            <button
              onClick={() => setActiveTab('activities')}
              className={`px-4 py-3 border-b-2 transition-colors ${
                activeTab === 'activities'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Actividades
            </button>
            <button
              onClick={() => setActiveTab('exams')}
              className={`px-4 py-3 border-b-2 transition-colors ${
                activeTab === 'exams'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Examenes 
            </button>
            <button
              onClick={() => setActiveTab('configs')}
              className={`px-4 py-3 border-b-2 transition-colors ${
                activeTab === 'configs'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Configs 
            </button>
          </div>
        </div>
 */}
        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Resources Tab */}
          {activeTab === 'session' && (
             /*  <InformacionTab selectedStudent={session}></InformacionTab> */
            <SessionFlow session={session} students={[]} onUpdateSession={()=>alert()} onBack={()=>alert()} />
          )}

        {/* Questions Tab */}
          {activeTab === 'exams' && (
          <></>
          )}

        
        </div>
      </div>
    </div>
  );
}



const InformacionTab = ({selectedStudent,}:any)=>{

    return (
          <div className="lg:col-span-1">
            {selectedStudent ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
                <div className="text-center mb-6">
                  <img
                    src={"https://api.dicebear.com/7.x/initials/svg?seed="+selectedStudent.names+selectedStudent.lastname}
                    alt={selectedStudent.names}
                    className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                  />
                  <h3 className="text-gray-900 mb-1">{selectedStudent.names}</h3>
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
    )
}



const ActivityPanel = ()=>{


    return (
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
                </div>)
}