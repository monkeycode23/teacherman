import { useEffect, useState } from "react";
import { Classroom } from "../types/general";
import {
  Plus,
  BookOpen,
  Users,
  MoreVertical,
  Trash2,
  ArrowRight,
} from "lucide-react";
import { ChevronRight } from "lucide-react";
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
  getClassrooms: {
    pagination:any
    data:Classroom[]
  };
}

interface GetClassroomsVars {
  teacherId: string;
}
const GET_USER = gql`
  query getClassrooms($teacherId: ID!) {
    getClassrooms(teacherId: $teacherId) {
        pagination{
            page
            limit
            totalPages
            total
            skip
        }
      data{
        _id
      name
      color
      subject
      stats {
        students
        topics
        assignments
      }
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
  >(GET_USER,{
    fetchPolicy: "network-only", // 🔥
  });

  const authStore = useAuthStore();

  useEffect(() => {
    
    if (!authStore.user) return;

    const fetch = async () => {
      const response: any = await _user({
        variables: { teacherId: String(authStore.user!._id) },
      });
      console.log(response, "asdassdasdasd", data);

      if (data) {
        classRoomStore.setClassrooms(data.getClassrooms.data ?? []);
      }
    };

    if (!classRoomStore.classrooms.length) fetch();

    return () => {

        console.log("asdasdas")
    };
  }, [authStore.user, data]);

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
          <ClassroomCard
            key={classroom._id}
            classroom={classroom}
            onDeleteClassroom={onDeleteClassroom}
            setActiveMenu={setActiveMenu}
          ></ClassroomCard>
        ))}
      </div>

      {/* Add Classroom Modal */}
    </div>
  );
}

const ClassroomCard = ({
  classroom,
  onDeleteClassroom,
  activeMenu,
  setActiveMenu,
}: any) => {
  function lightenHex(hex: string, percent: number) {
    const num = parseInt(hex.replace("#", ""), 16);

    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;

    const lighten = (c: number) =>
      Math.min(255, Math.floor(c + (255 - c) * (percent / 100)));

    const newR = lighten(r);
    const newG = lighten(g);
    const newB = lighten(b);

    return (
      "#" +
      ((1 << 24) + (newR << 16) + (newG << 8) + newB).toString(16).slice(1)
    );
  }

  return (
    <div
      className="bg-white rounded-3xl shadow-sm text-white border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
      style={{ backgroundColor: lightenHex(classroom.color, 10) }}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 ">
            <div className="flex items-center p-0 gap-5   ">
              <span
                className=" rounded-xl flex items-center justify-center w-12 p-3 h-12"
                style={{ backgroundColor: lightenHex(classroom.color, 30) }}
              >
                <BookOpen className="w-full h-full" />
              </span>
              <div>
                <h2 className="text-lg font-bold">{classroom.name}</h2>
                <p className="text-sm ">{classroom.subject}</p>
              </div>
            </div>
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
              <MoreVertical className="w-5 h-5 text-white" />
            </button>
            {activeMenu === classroom._id && (
              <div className="absolute right-0 mt-2 w-48 bg-black rounded-lg shadow-lg border border-gray-100 z-10">
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
          <div
            className="flex items-center gap-2 rounded-xl p-3 text-white"
            style={{ backgroundColor: lightenHex(classroom.color, 30) }}
          >
            <Users className="w-4 h-4" />
            <span className="">
              <span className="font-bold">{classroom.stats.students}</span> estudiantes
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div
            className="p-3  rounded-lg"
            style={{ backgroundColor: lightenHex(classroom.color, 30) }}
          >
            <p className="text-white text-2xl font-bold">
              {classroom.stats.topics }
            </p>
            <p className="text-xs text-white">Temas</p>
          </div>
          <div
            className="p-3  rounded-lg"
            style={{ backgroundColor: lightenHex(classroom.color, 30) }}
          >
            <p className="text-white text-2xl font-bold">
              { classroom.stats.assignments}
            </p>
            <p className="text-xs text-white">Tareas</p>
          </div>
        </div>

        <div className=" px-4 py-2 text-center bg-white text-black rounded-lg hover:bg-gray-100">
          <Link
            className="flex gap-2 justify-center"
            to={"/classrooms/" + classroom._id}
          >
            Ver Aula
            <ArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
};
