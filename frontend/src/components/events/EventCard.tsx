
import {  Clock, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/button";

 const EventsList = ({
  events,
  getSessionForSchedule,
  calculateProgress,
  onSelectSession,
  onCreateSession,
}: any) => {
  return (
    <div className="grid gap-4">
     
      {events.map((event: any) => {
        /* const course = courses.find(c => c.id === schedule.courseId); */
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

        

     
        return (
        <ClassEvent 
        key={event._id}
        event={event} 
            start={`${String(start.getHours()).padStart(2,"0")}:${String(start.getMinutes()).padStart(2,'0')}`}
            end={`${String(end.getHours()).padStart(2,"0")}:${String(end.getMinutes()).padStart(2,"0")}`}
            session={session}
            onSelectSession={onSelectSession}
            onCreateSession={onCreateSession}
        ></ClassEvent>)
      })}
    </div>
  );
};


const EventItem  =  ()=>{

}



const ClassEvent = ({event,start,end,session,onSelectSession,onCreateSession}:any)=>{

  
    
        return (
          <div
            key={event._id}
            className="hover:shadow-md transition-shadow p-5 border  border-zinc-300   rounded-xl"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-3 h-22 rounded"
                    style={{ backgroundColor: event?.color }}
                  />
                  <div>
                    <p className="mb-2 text-lg">{event.title}</p>
                    <p className="mb-2">{event.description}</p>
                    <div className="flex gap-2 items-center text-gray-600 mt-1">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                      <span className="text-sm">
                        {`${start} : ${end}`}
                      </span>
                      </span>
                      <div className="flex gap-2">
                        <span className="text-white px-1 rounded-md"
                        style={{
                            backgroundColor:event.classroom.color
                        }}
                        >{event.classroom.name}</span>
                        
                        <span className="bg-gray-400 text-white  px-1 rounded-md ">{event.type}</span>
                      </div> 
                    </div>
                  </div>
                </div>

                {session && event.type=="class" ? (
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
                    <Button onClick={() => onSelectSession(session)}>
                      Continuar Sesión
                    </Button>
                  </div>
                ) : (
                  <>
                  {event.type == "class" && (<button
                    className="p-3 rounded-lg bg-black text-white"
                    onClick={() =>
                      onCreateSession(
                        event._id,
                        event.courseId,
                        new Date()
                      )
                    }
                  >
                    Crear Sesión
                  </button>)}
                  </>
                )}
              </div>
            </div>

            {session && (
              <div>
                <div className="bg-gray-100 rounded-lg h-2">
                  <div
                    className="bg-green-500 h-2 rounded-lg transition-all"
                    style={{ width: `${event.progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        );
    
}

export default EventsList