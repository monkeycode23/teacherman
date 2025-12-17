import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}


export interface  UserRequest extends Request{
    userId:string
}

