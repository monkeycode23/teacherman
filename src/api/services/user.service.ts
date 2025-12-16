import { User } from "../models/User.model";

class UserService{


    constructor(){



    }



    get(filters:any){
            
            const {userId} = filters

            if(userId){

                const user = User.findById(userId)
                
                if(!user) throw new Error("no user found")

                return user

            
            }

            return {}
            
        
    }
}


export default UserService