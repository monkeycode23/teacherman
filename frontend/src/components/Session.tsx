import { ArrowLeft, Plus, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import type { ClassSchedule, Session, Course, Event } from "../types/general";
import CreateEventModal from "./events/CreateEventModal";
import { useEventStore } from "../store/event.store";
import { useEffect } from "react";
import { gql } from "@apollo/client";
import { useQuery, useLazyQuery } from "@apollo/client/react";
import { Classroom } from "../types/general";
import EventsList from "./events/EventCard";

interface SessionListProps {
  date: Date;
  schedules: ClassSchedule[];
  sessions: Session[];
  courses: Course[];
  onCreateSession: (scheduleId: string, courseId: string, date: Date) => void;
  onSelectSession: (session: Session) => void;
  onBack: () => void;
}

const GET_EVENTS = gql`
  query getDayEvents($date: String!) {
    getDayEvents(date: $date) {
      _id
      title
      description
      type
      startDate
      endDate
      progress
      color
      classroom{
        _id
        name
        color
      }
    }
  }
`;

interface GetClassroomsResponse {
  getDayEvents: Event[];
}

interface GetClassroomsVars {
  date: string;
}

export function SessionList({
  date,
  schedules,
  sessions,
  courses,
  onCreateSession,
  onSelectSession,
  onBack,
}: SessionListProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const eventStore = useEventStore();

  const [_user, { data, loading, error }] = useLazyQuery<
    GetClassroomsResponse,
    GetClassroomsVars
  >(GET_EVENTS);

  useEffect(() => {
    const fetch = async () => {
      const response: any = await _user({
        variables: { date: new Date(date).toISOString() },
      });
      console.log(response, "asdassdasdasd", data);

      if (data) eventStore.setEvents(data.getDayEvents ?? []);
    };

    fetch();
    return () => {
      eventStore.setEvents([]);
    };
  }, [data]);

  const getSessionForSchedule = (scheduleId: string) => {
    return sessions.find((s) => s.scheduleId === scheduleId);
  };

  const calculateProgress = (session: Session) => {
    if (session.activities.length === 0) return 0;
    const completed = session.activities.filter((a) => a.completed).length;
    return Math.round((completed / session.activities.length) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button onClick={onBack} variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al Calendario
          </Button>
          <div>
            <h1 className="text-3xl capitalize">{formatDate(date)}</h1>
          </div>
        </div>

        <div>
          <CreateEventModal date={date}></CreateEventModal>
        </div>
      </div>

      {eventStore.events.length === 0 ? (
        <Card className="border-gray-300 shadow-sm">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-gray-500 mb-4">
              No hay clases programadas para este día
            </p>
            <Button onClick={onBack} variant="outline">
              Volver al Calendario
            </Button>
          </CardContent>
        </Card>
      ) : (
        <EventsList
          events={eventStore.events}
          getSessionForSchedule={getSessionForSchedule}
          calculateProgress={calculateProgress}
          onSelectSession={onSelectSession}
          onCreateSession={onCreateSession}
        />
      )}
    </div>
  );
}
