
import { UserName } from "./UserName";
import { UserAddress } from "./UserAddress";


export class User {

    constructor(
        public _id: string,
        public email: string,
        public name: UserName,
        public birthday: Date,
        public address: UserAddress[]
    ) {

    }


    public static fromJson(json: Object): User {
        return new User(
            json['_id'],
            json['email'],
            json['name'],
            json['birthday'],
            json['address']
        );
    }
 
}