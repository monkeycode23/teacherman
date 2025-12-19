import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Plus,
  Check,
  X,
  GripVertical,
  BookOpen,
  PenTool,
  Mic,
  MoreHorizontal,
  Trash2,
 
} from 'lucide-react';


import { useQuery, useLazyQuery } from "@apollo/client/react";
import type { Session, Student, Activity } from '../../types/general';
import ActivityItem from '../activity/ActivityItem';

interface SessionFlowProps {
  session: Session;
  students: Student[];
  onUpdateSession: (session: Session) => void;
  onBack: () => void;
}

const activityIcons = {
  attendance: Check,
  reading: BookOpen,
  exercises: PenTool,
  oral_lesson: Mic,
  custom: MoreHorizontal,
};

const activityTypeLabels = {
  attendance: 'Asistencia',
  reading: 'Lectura del Libro',
  exercises: 'Resolver Ejercicios',
  oral_lesson: 'Lección Oral',
  custom: 'Actividad Personalizada',
};


import { GET_ACTIVITIES,GetActivitiesResponse,GetActivitiesVars } from '../../graphql/activities.queries';
import { useAuthStore } from '../../store/auth.store';
import { useSessionStore } from '../../store/session.store';
import { useActivityStore } from '../../store/activities.store';
import { assertDirective } from 'graphql';
import { request } from '../../services/api/request';
import { toast } from 'sonner';

import { GET_STUDENTS,GetStudentResponse,GetStudentVars } from '../../graphql/students.querties';


export function SessionFlow({ session,  onUpdateSession, onBack }: SessionFlowProps) {
  const [isAddActivityOpen, setIsAddActivityOpen] = useState(false);
  const [newActivityType, setNewActivityType] = useState<Activity['type']>('reading');
  const [newActivityTitle, setNewActivityTitle] = useState('');
  const [expandedActivity, setExpandedActivity] = useState<string>('1'); // Start with attendance expanded
   const [students, setStudents] = useState<Student[]>([]); 
  const authStore = useAuthStore()
    const sessionStore = useSessionStore()
    const activityStre = useActivityStore()


   const [_user, { data, loading, error }] = useLazyQuery<
      GetActivitiesResponse,
      GetActivitiesVars
    >(GET_ACTIVITIES, {
      fetchPolicy: "network-only", // 🔥
    });

      const [_students, ] = useLazyQuery<
      GetStudentResponse,
      GetStudentVars
    >(GET_STUDENTS, {
      fetchPolicy: "network-only", // 🔥
    });

   useEffect(() => {
    if (!authStore.user) return;

    const fetch = async () => {
      const response: any = await _user({
        variables: { sessionId: String(session._id) },
      });
      console.log(response, "activities", data);

      if (data) {

        const sessionData = data.getSessionActivities.data
        activityStre.setActivities(sessionData.activities)
         //sessionStore.setSessions(data.getClassroomSessions.data ?? []);
      }
    };

    const fetchStudents = async () => {
      const response = await _students({
        variables: { classroomId: String(session.classroom!._id) },
      });
      console.log(response, "students", data);

      if (response) {

       const sessionData = response.data?.getClassroomStudents.data
       setStudents(sessionData ?? []) 
         //sessionStore.setSessions(data.getClassroomSessions.data ?? []);
      }
    };


    fetchStudents()
    fetch();

    return () => {};
  }, [data]);
  

  const handleToggleAttendance = (studentId: string) => {
    
    activityStre.toggleStudentAttendance(studentId)
   
  };
 


  const updateActivityApi = async (activityId:string,data:any,onSuccess:any)=>{

    try {
        
        const response = await request({
            url:"/activities/"+activityId,
            method:"PUT",
            data:data
        })

        if(!response.success) throw new Error("Error al actualizar la actividad")

            if(onSuccess) onSuccess(response.data)

    } catch (error) {
        

        console.log(error)
        toast.error("ocurio un error en el servidor");
    }
  }

  const handleToggleActivityComplete =async (activityId: string) => {

///////////////lllamarrrrrr a  la apiiiiiiiiiiiiii

  const activity = activityStre.activities.find(activity =>
      activity._id === activityId 
    );

    if(!activity) return 

    await updateActivityApi(activityId,{
        completed:!activity?.completed
    },(data:any)=>{
 

    activityStre.updateActivity(activityId,{
        ...activity,
        completed:!activity.completed
    })
        
    })
   
  };

  const handleAddActivity = () => {
    if (newActivityType === 'custom' && !newActivityTitle.trim()) return;

    const title = newActivityType === 'custom' 
      ? newActivityTitle 
      : activityTypeLabels[newActivityType];

    const newActivity: Activity = {
      _id: Date.now().toString(),
      type: newActivityType,
      title,
      completed: false,
      progress:0,
      order: activityStre.activities.length,
    };


    ////////////llamaaaaarrrrrrrr apiiiiiiiiiiiiii


    activityStre.addActivity(newActivity)
   /*  onUpdateSession({
      ...session,
      activities: [...session.activities, newActivity],
    }); */

   /*  setIsAddActivityOpen(false);
    setNewActivityType('reading');
    setNewActivityTitle(''); */
  };

  const handleDeleteActivity = (activityId: string) => {
    // Cannot delete attendance activity
    if (activityId === '1') return;

   
    activityStre.deleteActivity(activityId)

  /*   onUpdateSession({
      ...session,
      activities: updatedActivities,
    }); */
  };

  const presentCount = Object.values([]).filter(Boolean).length;
  const totalStudents = students.length;
  const completedActivities = activityStre.activities.filter((a)=>{a.completed == true}).length
  
  /* session.activities.filter(a => a.completed).length */;
  const totalActivities = activityStre.activities.length;

  return (
    <div className="space-y-6">
      {/* Session Header */}
      <div>
        <div>
          <div className="flex items-center justify-between p-4 border border-gray-300 rounded-xl">
            <div>
              <h2>{session.classroom!.name}</h2>
              <p className="text-gray-600 mt-1">
                {"12/12/2025"}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Progreso</div>
              <div className="text-2xl">
                {completedActivities} / {totalActivities}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activities Flow */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl">Flujo de la Clase</h2>
          {/* <Dialog open={isAddActivityOpen} onOpenChange={setIsAddActivityOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Agregar Actividad
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Agregar Nueva Actividad</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <Label htmlFor="activity-type">Tipo de Actividad</Label>
                  <Select
                    value={newActivityType}
                    onValueChange={(value) => setNewActivityType(value as Activity['type'])}
                  >
                    <SelectTrigger id="activity-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="reading">Lectura del Libro</SelectItem>
                      <SelectItem value="exercises">Resolver Ejercicios</SelectItem>
                      <SelectItem value="oral_lesson">Lección Oral</SelectItem>
                      <SelectItem value="custom">Actividad Personalizada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {newActivityType === 'custom' && (
                  <div>
                    <Label htmlFor="activity-title">Título de la Actividad</Label>
                    <Input
                      id="activity-title"
                      placeholder="Ej: Trabajo en grupos"
                      value={newActivityTitle}
                      onChange={(e) => setNewActivityTitle(e.target.value)}
                    />
                  </div>
                )}

                <Button onClick={handleAddActivity} className="w-full">
                  Agregar Actividad
                </Button>
              </div>
            </DialogContent>
          </Dialog> */}

          <button onClick={handleAddActivity} className="bg-black text-white rounded-md px-2 py-1">
                  Agregar Actividad
                </button>
        </div>

        {activityStre.activities.map((activity, index) => {
            
            
            const Icon = activityIcons[activity.type];

          const isExpanded = expandedActivity === activity._id;
          const isAttendance = activity.type === 'attendance';

          return (
           <ActivityItem
            key={activity._id}
            activity = {activity}
            index={index}
            isAttendance={isAttendance}
            isExpanded={isExpanded}
            presentCount={presentCount}
            totalStudents={totalStudents}
            Icon={Icon}
            setExpandedActivity={setExpandedActivity}
            students={students}
            handleToggleActivityComplete={handleToggleActivityComplete}
            handleDeleteActivity={handleDeleteActivity}
            handleToggleAttendance={handleToggleAttendance}
           ></ActivityItem>
          );
        })}
      </div>
    </div>
  );
}





const AddActivityModal = ()=>{

}