import { useState } from 'react';
import { Calendar } from '../components/Calendar';
import { SessionList } from '../components/Session';
import { SessionFlow } from '../components/Flow';
import { CalendarDays, ListChecks, BookOpen } from 'lucide-react';

import { Session,Course,Student,ClassSchedule, } from '../types/general';
export default function CalendarPage() {
  const [view, setView] = useState<'calendar' | 'sessions' | 'flow'>('calendar');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  // Mock data - en producción esto vendría de una base de datos
  const [courses] = useState<Course[]>([
    { id: '1', name: 'Matemáticas 5to', color: '#3b82f6' },
    { id: '2', name: 'Español 5to', color: '#10b981' },
    { id: '3', name: 'Ciencias 6to', color: '#f59e0b' },
  ]);

  const [students] = useState<Student[]>([
    { id: '1', name: 'Ana García', courseId: '1' },
    /* { id: '2', name: 'Carlos López', courseId: '1' },
    { id: '3', name: 'María Rodríguez', courseId: '1' },
    { id: '4', name: 'Juan Martínez', courseId: '2' },
    { id: '5', name: 'Laura Sánchez', courseId: '2' },
    { id: '6', name: 'Pedro Ramírez', courseId: '3' }, */
  ]);

  const [schedules, setSchedules] = useState<ClassSchedule[]>([
    {
      id: '1',
      courseId: '1',
      date: new Date(2024, 11, 16),
      startTime: '08:00',
      endTime: '09:30',
    },
    {
      id: '2',
      courseId: '2',
      date: new Date(2024, 11, 16),
      startTime: '10:00',
      endTime: '11:30',
    },
    {
      id: '3',
      courseId: '1',
      date: new Date(2024, 11, 17),
      startTime: '08:00',
      endTime: '09:30',
    },
  ]);

  const [sessions, setSessions] = useState<Session[]>([]);

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <span className="ml-2">Gestión de Clases</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setView('calendar')}
                className={`flex items-center px-3 py-2 rounded-md ${
                  view === 'calendar' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <CalendarDays className="w-4 h-4 mr-2" />
                Calendario
              </button>
              <button
                onClick={() => setView('sessions')}
                className={`flex items-center px-3 py-2 rounded-md ${
                  view === 'sessions' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
                disabled={view === 'calendar'}
              >
                <ListChecks className="w-4 h-4 mr-2" />
                Sesiones
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === 'calendar' && (
          <Calendar
            schedules={schedules}
            courses={courses}
            onDateSelect={handleDateSelect}
            onAddSchedule={(schedule) => setSchedules([...schedules, schedule])}
          />
        )}

        {view === 'sessions' && (
          <SessionList
            date={selectedDate}
            schedules={schedules.filter(s => 
              s.date.toDateString() === selectedDate.toDateString()
            )}
            sessions={sessions.filter(s => 
              s.date.toDateString() === selectedDate.toDateString()
            )}
            courses={courses}
            onCreateSession={handleCreateSession}
            onSelectSession={handleSessionSelect}
            onBack={handleBackToCalendar}
          />
        )}

        {view === 'flow' && selectedSession && (
          <SessionFlow
            session={selectedSession}
            students={students.filter(s => s.courseId === selectedSession.courseId)}
            onUpdateSession={handleUpdateSession}
            onBack={handleBackToSessions}
          />
        )}
      </main>
    </div>
  );
}
