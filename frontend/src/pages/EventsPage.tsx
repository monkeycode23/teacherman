import { useState } from 'react';
import { mockEvents } from '../data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Calendar as CalendarIcon, Clock,Plus } from 'lucide-react';
import { Calendar } from "../components/ui/calendar"

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
      {/* Calendar */}
   {/*    <Card className="lg:col-span-1 border-border/50 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            Calendario
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border border-border/50"
            modifiers={{
              event: eventDates
            }}
            modifiersClassNames={{
              event: 'bg-primary/10 text-primary font-bold'
            }}
          />
        </CardContent>
      </Card>
 */}
      {/* Events List */}
     {/*  <Card className="lg:col-span-2 border-border/50 shadow-sm">
        <CardHeader>
          <CardTitle>
            {eventsForSelectedDate.length > 0
              ? `Eventos para ${formatDate(selectedDateStr!)}`
              : 'Todos los Eventos'}
          </CardTitle>
        </CardHeader>
        <CardContent> */}

         <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-gray-900 mb-2">Eventos</h1>
                  <p className="text-gray-600">No te pierdas las fechas importantes</p>
                </div>
               {/*  <button
                  
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus className="w-5 h-5" />
                  Nueva Aula
                </button> */}
              </div>
        
          <div className="space-y-4">
            {(eventsForSelectedDate.length > 0 ? eventsForSelectedDate : sortedEvents).map(event => {
              const typeInfo = getEventTypeInfo(event.type);
              
              return (
                <div
                  key={event.id}
                  className="p-4 border border-border rounded-lg hover:bg-grey-200 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <CalendarIcon className="w-5 h-5 text-primary" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="font-medium">{event.title}</h4>
                        <Badge variant="outline" className={typeInfo.color}>
                          {typeInfo.label}
                        </Badge>
                      </div>

                      <p className="text-sm text-muted-foreground mb-2">{event.description}</p>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <CalendarIcon className="w-4 h-4" />
                          {formatDate(event.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {event.time}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {eventsForSelectedDate.length === 0 && selectedDate && (
              <div className="py-8 text-center text-muted-foreground">
                No hay eventos para esta fecha
              </div>
            )}
          </div>
     {/*    </CardContent> */}
     {/*  </Card> */}
    </div>
  );
}