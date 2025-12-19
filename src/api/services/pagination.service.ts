import { User } from "../models/User.model";
import classSessionModel from "../models/class.session.model";
import classroomModel from "../models/classroom.model";
import mongoose from "mongoose";

class PaginationService {
  constructor() {}


  static getPagination(pagination:{page:number,total:number,limit:number}){

    const {limit,page,total} = pagination;
    
      const _limit  = limit ?? 10
    const skip = page ? (page-1)*_limit: 0

     return {
            page:page??1,
            totalPages:total>_limit ?  Math.ceil(_limit/total) : 0,
            limit:_limit,
            skip,
            total
        }
  }
 
}

export default PaginationService;
