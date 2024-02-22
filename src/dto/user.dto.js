export default class UserDTO {
    constructor(user){
        this._id=user._id;
        this.first_Name=`${user.first_Name}`;
        this.last_Name=`${user.last_Name}`;
        this.email= `${user.email}`;

    }
}