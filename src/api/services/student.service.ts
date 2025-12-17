import { User } from "../models/User.model";

class StudentService {
  constructor() {}

  static generateCode() {
    return Math.floor(1000 + Math.random() * 9000);
  }
}

export default StudentService;
