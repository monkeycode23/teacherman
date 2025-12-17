import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useEventStore } from '../store/event.store';

import type { ClassSchedule, Course,Session,Student,Event } from '../types/general';

interface CalendarProps {
  schedules: ClassSchedule[];
  courses: Course[];
  onDateSelect: (date: Date) => void;
  onAddSchedule: (schedule: ClassSchedule) => void;
}

export function Calendar({schedules,courses,onDateSelect,onAddSchedule}:CalendarProps) {

    
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');

  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];


  const eventStore = useEventStore()

   const [students] = useState<Student[]>([
    /* { id: '1', name: 'Ana García', courseId: '1' },
    { id: '2', name: 'Carlos López', courseId: '1' },
    { id: '3', name: 'María Rodríguez', courseId: '1' },
    { id: '4', name: 'Juan Martínez', courseId: '2' },
    { id: '5', name: 'Laura Sánchez', courseId: '2' },
    { id: '6', name: 'Pedro Ramírez', courseId: '3' }, */
  ]);


    const [view, setView] = useState<'calendar' | 'sessions' | 'flow'>('calendar');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  // Mock data - en producción esto vendría de una base de datos

  const [sessions, setSessions] = useState<Session[]>([]);


  useEffect(() => {
    
  
    return () => {
      
    }
  }, [eventStore.events])
  

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setView('sessions');
  };

  const handleSessionSelect = (session: Session) => {
    setSelectedSession(session);
    setView('flow');
  };

  const handleCreateSession = (scheduleId: string, courseId: string, date: Date) => {
    const course = courses.find(c => c.id === courseId);
    const sessionStudents = students.filter(s => s.courseId === courseId);
    
    const newSession: Session = {
      id: Date.now().toString(),
      scheduleId,
      courseId,
      date,
      courseName: course?.name || '',
      activities: [
        {
          id: '1',
          type: 'attendance',
          title: 'Tomar Asistencia',
          completed: false,
          order: 0,
        },
      ],
      attendance: sessionStudents.reduce((acc, student) => {
        acc[student.id] = false;
        return acc;
      }, {} as { [key: string]: boolean }),
    };

    setSessions([...sessions, newSession]);
    setSelectedSession(newSession);
    setView('flow');
  };

  const handleUpdateSession = (updatedSession: Session) => {
    setSessions(sessions.map(s => s.id === updatedSession.id ? updatedSession : s));
    setSelectedSession(updatedSession);
  };

  const handleBackToSessions = () => {
    setView('sessions');
    setSelectedSession(null);
  };

  const handleBackToCalendar = () => {
    setView('calendar');
    setSelectedDate(new Date());
  };

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const getSchedulesForDate = (day: number) => {
    const date = new Date(year, month, day);
   // console.log(date,"asdasd",schedules)
    
    return eventStore.events.filter(s => {
        
        console.log(s,s.startDate, date)
        return true
    });
  };


  
          
  const handleAddSchedule = () => {
    if (!selectedCourse || !selectedDate || !startTime || !endTime) return;

    const newSchedule: ClassSchedule = {
      id: Date.now().toString(),
      courseId: selectedCourse,
      date: new Date(selectedDate),
      startTime,
      endTime,
    };

    onAddSchedule(newSchedule);
    setIsAddDialogOpen(false);
    setSelectedCourse('');
    setSelectedDate(new Date());
    setStartTime('');
    setEndTime('');
  };


  const days = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(<div key={`empty-${i}`} className="h-24 bg-gray-50" />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const daySchedules = getSchedulesForDate(day);
    
    const date = new Date(year, month, day);
    const isToday = date.toDateString() === new Date().toDateString();

    days.push(
      <div
        key={day}
        onClick={() =>{
            
             onDateSelect(date)
        }}
        className={`h-24 border border-gray-200 p-2 cursor-pointer hover:bg-blue-50 transition-colors ${
          isToday ? 'bg-blue-50 border-blue-300' : 'bg-white'
        }`}
      >
        <div className={`text-sm mb-1 ${isToday ? 'text-blue-600' : 'text-gray-700'}`}>
          {day}
        </div>
        <div className="space-y-1">
          {daySchedules.map(schedule => {
            const course = schedule.classroom.name 
            const color = schedule.classroom.color

            return (
              <div
                key={schedule._id}
                className="text-xs px-2 py-1 rounded truncate"
                style={{ backgroundColor: color, color: "white" }}
              >
                {course}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl">
            {monthNames[month]} {year}
          </h2>
          <div className="flex space-x-2">
            <button 
            title='button'
            onClick={previousMonth}>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
            title='button'
            onClick={nextMonth} >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

       
      </div>

      <div className="grid grid-cols-7 gap-0 border border-gray-200">
        {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
          <div key={day} className="bg-gray-100 p-2 text-center border-b border-gray-200">
            {day}
          </div>
        ))}
        {days}
      </div>
    </div>
  );
}


