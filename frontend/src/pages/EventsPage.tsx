import { useState } from 'react';
import { mockEvents } from '../data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Calendar as CalendarIcon, Clock,Plus } from 'lucide-react';
import { Calendar } from "../components/ui/calendar"
import { SessionList } from '../components/Session';
export function EventsPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const getEventTypeInfo = (type: string) => {
    switch (type) {
      case 'exam':
        return { label: 'Examen', color: 'bg-[#A65959]/10 text-[#A65959]' };
      case 'oral-test':
        return { label: 'Lección Oral', color: 'bg-[#9B8E7E]/10 text-[#9B8E7E]' };
      case 'task':
        return { label: 'Tarea', color: 'bg-[#6B8E9E]/10 text-[#6B8E9E]' };
      case 'class':
        return { label: 'Clase', color: 'bg-[#7B9E89]/10 text-[#7B9E89]' };
      default:
        return { label: 'Otro', color: 'bg-muted text-muted-foreground' };
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Get events for selected date
  const selectedDateStr = selectedDate?.toISOString().split('T')[0];
  const eventsForSelectedDate = mockEvents.filter(
    event => event.date === selectedDateStr
  );

  // Get all event dates for highlighting
  const eventDates = mockEvents.map(event => new Date(event.date));

  const isEventDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return mockEvents.some(event => event.date === dateStr);
  };

  // Sort events by date
  const sortedEvents = [...mockEvents].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="p-8">
         {/*   <SessionList
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
                  /> */}
    </div>
  );
}