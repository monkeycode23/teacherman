import { User } from "../models/User.model";
import { ValidationError } from "../errors/error.handler";

class EventService {
  constructor() {}

  static checkEventDates(date: Date, start: string, end: string) {
    const startDate = new Date(date);

    const [hour,min] = start.split(":");

    startDate.setHours(Number(hour))
    startDate.setMinutes(Number(min))

    const endDate = new Date(date);
     const [_hour,_min] = end.split(":");
    
     endDate.setHours(Number(_hour))
    endDate.setMinutes(Number(_min))

    if (new Date(start) > new Date(end))
      throw new ValidationError("error", {
        timeEnd: "fecha inicio mayor a la fecha de finalizar ",
      });

    return {
      startDate,
      endDate,
    };
  }
}

export default EventService;
