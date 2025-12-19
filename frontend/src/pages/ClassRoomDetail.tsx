import { useEffect, useState } from 'react';
import { Classroom } from '../types/general';
import { ArrowLeft, Users, BookOpen, ClipboardList, BarChart3, GraduationCap, PenTool, Cog, } from 'lucide-react';
import { TopicsTab } from '../components/TopicsTab';
import { StudentsTab} from '../components/StudentsTab';
import { AssignmentsTab } from '../components/AssignmentsTab';
import { AnalyticsTab } from '../components/AnalyticsTab';
import { useParams } from 'react-router';
import { useClassroomsStore } from '../store/classroom.store';
import { classrooms } from '../data/example';
import { gql } from "@apollo/client";
import { useQuery, useLazyQuery } from "@apollo/client/react";
import { SessionsTab } from '../components/SessionsTab';
interface ClassroomDetailProps {
  classroom: Classroom;
  onBack: () => void;
  onUpdate: (updates: Partial<Classroom>) => void;
}


type Tab = 'topics' | 'students' | 'assignments' | 'sessions' | 'analytics' | 'config';


const GET_USER = gql`
  query getClassroom($classroomId: ID!) {
    getClassroom(classroomId: $classroomId) {
      _id
      name
      color
      subject
      students
        topics
        assignments
      stats{
        students
        topics
        assignments
      }
    }
  }
`;


interface GetClassroomsResponse {
  getClassroom: Classroom;
}

interface GetClassroomsVars {
  classroomId: string;
}

export function ClassroomDetail() {
  const [activeTab, setActiveTab] = useState<Tab>('topics');

  const {id} = useParams()
  
  const classroomStore = useClassroomsStore()

  const [_user, { data, loading, error }] = useLazyQuery<
    GetClassroomsResponse,
    GetClassroomsVars
  >(GET_USER);
  useEffect(() => {
    
    const fetchClassRoomData = async ()=>{


      const response: any = await _user({
        variables: { classroomId: String(id) },
      });
      console.log(response, "asdassdasdasd", data);

      if(data){

          classroomStore.setClassroom(data.getClassroom ?? []);
      }
    }

    fetchClassRoomData()
    return () => {
      
    }
  }, [data])
  

  const onBack=()=>{}  
  
  const onUpdate=(a:any)=>{}
  
  const classroom = classroomStore.classroom
  
  if(!classroom) return null
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div
        className="p-8 text-white"
        style={{ backgroundColor: classroom.color }}
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white hover:text-gray-100 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver a Mis Aulas
        </button>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-white text-xl font-bold mb-2">{classroom.name}</h1>
            <p className="text-white opacity-90">{classroom.subject}</p>
          </div>
          <div className="flex gap-4 text-white">
            <div className="text-right">
              <p className="opacity-90">Estudiantes</p>
              <p>{classroom.students ? classroom.students!.length : 0} </p>
            </div>
            <div className="text-right">
              <p className="opacity-90">Temas</p>
              <p>{classroom.students ? classroom.topics!.length : 0}</p>
            </div>
            <div className="text-right">
              <p className="opacity-90">Tareas</p>
              <p>{classroom.students ? classroom.assignments!.length : 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 bg-white">
        <div className="px-8 flex gap-6">
          <button
            onClick={() => setActiveTab('topics')}
            className={`flex items-center gap-2 px-4 py-4 border-b-2 transition-colors ${
              activeTab === 'topics'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            Temario
          </button>

          <button
            onClick={() => setActiveTab('students')}
            className={`flex items-center gap-2 px-4 py-4 border-b-2 transition-colors ${
              activeTab === 'students'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Users className="w-5 h-5" />
            Estudiantes
          </button>

          <button
            onClick={() => setActiveTab('assignments')}
            className={`flex items-center gap-2 px-4 py-4 border-b-2 transition-colors ${
              activeTab === 'assignments'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <ClipboardList className="w-5 h-5" />
            Tareas
          </button>

           <button
            onClick={() => setActiveTab('sessions')}
            className={`flex items-center gap-2 px-4 py-4 border-b-2 transition-colors ${
              activeTab === 'sessions'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <GraduationCap className="w-5 h-5" />
            Sesiones
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 px-4 py-4 border-b-2 transition-colors ${
              activeTab === 'analytics'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            Estadísticas
          </button>

           <button
            onClick={() => setActiveTab('config')}
            className={`flex items-center gap-2 px-4 py-4 border-b-2 transition-colors ${
              activeTab === 'config'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Cog className="w-5 h-5" />
            Config
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-8">
        {activeTab === 'topics' && (
          <TopicsTab
            topics={classroom.topics ?? []}
            onUpdateTopics={(topics) => onUpdate({ topics })}
          />
        )}
        
        {activeTab === 'students' && (
          <StudentsTab
            students={classroom.students}
            onUpdateStudents={(student:any) => onUpdate({ student })}
          />
        )}

         {activeTab === 'sessions' && (
          <SessionsTab
            students={classroom.students}
            onUpdateStudents={(student:any) => onUpdate({ student })}
          />
        )}
        
        {activeTab === 'assignments' && (
          <AssignmentsTab
            assignments={classroom.assignments ?? []}
            students={classroom.students ?? []}
            onUpdateAssignments={(assignments) => onUpdate({ assignments })}
          />
        )}
        
        {activeTab === 'analytics' && (
          <AnalyticsTab classroom={classroom} />
        )}
      </div>
    </div>
  );
}
