import { useEffect, useState } from "react";
import { Classroom } from "../types/general";
import { Plus, BookOpen, Users, MoreVertical, Trash2 } from "lucide-react";
import { Link } from "react-router";
import CreateClassRoomModal from "../components/classroom/CreateClassRoomModal";
import { useClassroomsStore } from "../store/classroom.store";
import { COLORS } from "../data/example";
import { gql } from "@apollo/client";
import { useQuery, useLazyQuery } from "@apollo/client/react";
import { useAuthStore } from "../store/auth.store";

/* interface ClassroomListProps {
  classrooms: Classroom[];
  onSelectClassroom: (classroomId: string) => void;
  onAddClassroom: (classroom: Omit<Classroom, 'id'>) => void;
  onDeleteClassroom: (classroomId: string) => void;
}
 */

interface GetClassroomsResponse {
  getClassrooms: Classroom[];
}

interface GetClassroomsVars {
  teacherId: string;
}
const GET_USER = gql`
  query getClassrooms($teacherId: ID!) {
    getClassrooms(teacherId: $teacherId) {
      _id
      name
      color
      subject
      stats{
        students
        topics
        assignments
      }
    }
  }
`;

/**compoent */
export function ClassroomList() {
  const classRoomStore = useClassroomsStore();

  const classrooms = classRoomStore.classrooms;

  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const [_user, { data, loading, error }] = useLazyQuery<
    GetClassroomsResponse,
    GetClassroomsVars
  >(GET_USER);

  const authStore = useAuthStore();

  useEffect(() => {
    if (!authStore.user) return;

    const fetch = async () => {
      const response: any = await _user({
        variables: { teacherId: String(authStore.user!._id) },
      });
      console.log(response, "asdassdasdasd", data);

      if(data){

          classRoomStore.setClassrooms(data.getClassrooms ?? []);
      }
    };

    if(!classRoomStore.classrooms.length) fetch();

    return () => {};
  }, [authStore.user,data]);

  const onSelectClassroom = () => {};

  const onAddClassroom = (arg: any) => {};
  const onDeleteClassroom = (a: any) => {};

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-gray-900 mb-2">Mis Aulas</h1>
          <p className="text-gray-600">Gestiona todas tus aulas y cursos</p>
        </div>

        <CreateClassRoomModal></CreateClassRoomModal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classRoomStore.classrooms.map((classroom) => (
          <div
            key={classroom._id}
            className="bg-white rounded-xl shadow-sm text-white border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            /* style={{ backgroundColor: classroom.color }} */
          >
            {/*  <div
              className="h-32 p-6 flex items-center justify-center"
              style={{ backgroundColor: classroom.color }}
            >
              <BookOpen className="w-16 h-16 text-white opacity-80" />
            </div>
             */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-gray-900 flex gap-2 text-lg  mb-1 truncate">
                    <BookOpen className="  opacity-80" />
                    {classroom.name}
                  </h3>
                  <p className="text-sm text-gray-600">{classroom.subject}</p>
                </div>
                <div className="relative">
                  <button
                    title="button"
                    onClick={() =>
                      setActiveMenu(
                        activeMenu === classroom._id ? null : classroom._id
                      )
                    }
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <MoreVertical className="w-5 h-5 text-gray-600" />
                  </button>
                  {activeMenu === classroom._id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                      <button
                        onClick={() => {
                          onDeleteClassroom(classroom._id);
                          setActiveMenu(null);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                        Eliminar Aula
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{classroom.students ? classroom.students.length: 0 } estudiantes</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-900">{classroom.students ? classroom.topics!.length :0}</p>
                  <p className="text-xs text-gray-600">Temas</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-900">
                    {classroom.students ? classroom.assignments!.length:0}
                  </p>
                  <p className="text-xs text-gray-600">Tareas</p>
                </div>
              </div>

              <Link
                to={"/classrooms/" + classroom._id}
                className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
              >
                Ver Aula
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Add Classroom Modal */}
    </div>
  );
}
