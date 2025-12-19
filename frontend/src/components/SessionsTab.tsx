import { useEffect, useState } from "react";
import { Session, Student } from "../types/general";
import {
  Plus,
  Mail,
  Calendar,
  TrendingUp,
  CheckCircle,
  Search,
  Clock,
  MoreVertical,
  Trash2,
  UserCircle,
  User2,
  GraduationCap,
} from "lucide-react";

import { request } from "../services/api/request";

import AddStudentModal from "./students/AddStudentModal";
import { useStudentsStore } from "../store/student.store";
import { gql } from "@apollo/client";
import { useQuery, useLazyQuery } from "@apollo/client/react";
import { useAuthStore } from "../store/auth.store";
import { useClassroomsStore } from "../store/classroom.store";
import { StudentSidePanel } from "./students/StudentSidePanel";
import ImportStudentsModal from "./students/ImportStudentsModal";

import { toast } from "sonner";
import CreateSessionModal from "./session/CreateSessionModal";
import { useSessionStore } from "../store/session.store";
import { SessionSidePanel } from "./session/SessionSidePanel";
interface StudentsTabProps {
  students: Student[];
  onUpdateStudents: (students: Student[]) => void;
}

interface GetClassroomsResponse {
  getClassroomSessions: {
    pagination: any;
    data: Session[];
  };
}

interface GetClassroomsVars {
  classroomId: string;
}

const GET_SESSIONS = gql`
  query getClassroomSessions($classroomId: ID!) {
    getClassroomSessions(classroomId: $classroomId) {
        pagination{
            total
            page
            limit
            totalPages
        }
      data {
        _id
        title
        description
        sessionDate
        startTime
        endTime
        progress
        status
        classroom{
            _id
            name
            color
        }
      }
    }
  }
`;

export function SessionsTab({}: any) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const [activeSession, setActiveSession] = useState<Session | null>(null);

  const studentSore = useStudentsStore();
  const authStore = useAuthStore();
  const classRoomStore = useClassroomsStore();
  const sessionStore = useSessionStore();

  const [_user, { data, loading, error }] = useLazyQuery<
    GetClassroomsResponse,
    GetClassroomsVars
  >(GET_SESSIONS, {
    fetchPolicy: "network-only", // 🔥
  });

  useEffect(() => {
    if (!authStore.user) return;

    const fetch = async () => {
      const response: any = await _user({
        variables: { classroomId: String(classRoomStore.classroom!._id) },
      });
      console.log(response, "sessionessssssssssss", data);

      if (data) {
         sessionStore.setSessions(data.getClassroomSessions.data ?? []);
      }
    };

    fetch();

    return () => {};
  }, [data]);

  const onUpdateStudents = (asd: any) => {};

  const handleDeleteStudent = async (studentId: string) => {
    if (!classRoomStore.classroom) return;

    const classroomId = classRoomStore.classroom._id;

    try {
      const response = await request({
        url: `/students/${classroomId}/${studentId}`,
        method: "DELETE",
      });
      if (!response.success) throw new Error("error");

      studentSore.removeStudent(studentId);
      toast.success("Estudiante eliminado con exito");
    } catch (error) {
      toast.error("Ocurrio un error al intentar eliminar el estudiante");
      console.log(error);
    }
    /* onUpdateStudents(students.filter((s:any) => s.id !== studentId));
    if (selectedStudent?.id === studentId) {
      setSelectedStudent(null);
    }
    setActiveMenu(null); */
  };

  /*   const filteredStudents = students.filter(
    (student:any) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
 */

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-gray-900">Sessiones de Clases</h2>

        <div className="flex gap-2">
          <CreateSessionModal></CreateSessionModal>
        </div>
      </div>

      {sessionStore.sessions.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <GraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-gray-900 mb-2">No hay estudiantes inscritos</h3>
          <p className="text-gray-600 mb-4">
            Comienza agregando estudiantes a esta aula
          </p>
          {/*  <button
            onClick={() => setShowAddStudent(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Agregar Primer Estudiante
          </button> */}
        </div>
      ) : (
        <div className="">
          {/* Students List */}
          <div className="lg:col-span-2">
            <div className="p-4 border-b border-gray-200"></div>

            <div className="divide-y divide-gray-200">
              {sessionStore.sessions.map((session: any) => {
                /* 
                     const session = getSessionForSchedule(event.id);
        const progress = session ? calculateProgress(session) : 12;

        const dateStartTime =  Number(event.startDate)
        const dateEndTime =  Number(event.endDate)

        const start = new Date(
            Number.isNaN(dateStartTime) ? 
            event.startDate : dateStartTime
        );
            
        const end = new Date(
            Number.isNaN(dateEndTime) ? 
            event.endDate : dateEndTime
        );
 */

                return (
                  <ClassSession
                  
                  key={session._id}
                    session={session}
                    start={session.startTime}
                    end={session.endTime}
                    onSelectSession={(session:any)=>setActiveSession(session)}
                    /* key={event._id}
        event={event} 
            start={`${String(start.getHours()).padStart(2,"0")}:${String(start.getMinutes()).padStart(2,'0')}`}
            end={`${String(end.getHours()).padStart(2,"0")}:${String(end.getMinutes()).padStart(2,"0")}`}
            session={session}
            onSelectSession={onSelectSession}
            onCreateSession={onCreateSession} */
                  ></ClassSession>
                );
              })}
            </div>
          </div>
          {activeSession && (
                  <SessionSidePanel
                    session={activeSession}
                    onClose={() => {
                      setActiveSession(null);
                    }}
                    onUpdate={(updates: any) => {
                      console.log(updates);
                      //updateTopic(activeTopic.id, updates)
                    }}
                  />
                )}
          {/* Student Detail */}
        </div>
      )}

       
    </div>
  );
}

{
  /* <StudentListItem
                    student={student}
                    activeMenu={activeMenu}
                    handleDeleteStudent={handleDeleteStudent}
                    setActiveMenu={setActiveMenu}
                    setActiveStudent={setActiveStudent}
                    selectedStudent={selectedStudent}
                  ></StudentListItem>
 */
}

/* import {  Clock, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/button";

 const SessionList = ({
  sessions,
  getSessionForSchedule,
  calculateProgress,
  onSelectSession,
  onCreateSession,
}: any) => {
  return (
    <div className="grid gap-4">
     
      {sessions.map((event: any) => {
        /* const course = courses.find(c => c.id === schedule.courseId); 
       
      })}
    </div>
  );
};
 */

const ClassSession = ({
  start,
  end,
  session,
  onSelectSession,
  onCreateSession,
}: any) => {
  return (
    <div className="hover:shadow-md transition-shadow p-5 border  border-zinc-300   rounded-xl"
    onClick={()=>onSelectSession(session)}
    >
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-22 rounded" style={{ backgroundColor: session.classroom.color, }} />
            <div>
              <p className="mb-2 text-lg">{session.title}</p>
              <p className="mb-2">{session.description}</p>
              <div className="flex gap-2 items-center text-gray-600 mt-1">
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="text-sm">{`${start} : ${end}`}</span>
                </span>
                <div className="flex gap-2">
                    <span
                    className="text-white px-1 rounded-md"
                    style={{
                      backgroundColor: session.classroom.color,
                    }}
                  >
                    {session.classroom.name}
                  </span> 

                 
                </div>
              </div>
            </div>
          </div>
          {/* 
          {session && event.type == "class" ? (
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="flex items-center text-green-600 mb-1">
                  <CheckCircle2 className="w-4 h-4 mr-1" />
                  <span className="text-sm">Sesión Activa</span>
                </div>
                <div className="text-sm text-gray-600">
                  Progreso: {event.progress}%
                </div>
              </div>
              <button onClick={() => onSelectSession(session)}>
                Continuar Sesión
              </button>
            </div>
          ) : (
            <>
              {event.type == "class" && (
                <button
                  className="p-3 rounded-lg bg-black text-white"
                  onClick={() =>
                    onCreateSession(event._id, event.courseId, new Date())
                  }
                >
                  Crear Sesión
                </button>
              )}
            </>
          )} */}
        </div>
      </div>

      {session && (
        <div>
          <div className="bg-gray-100 rounded-lg h-2">
            <div
              className="bg-green-500 h-2 rounded-lg transition-all"
              style={{ width: `${session.progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
