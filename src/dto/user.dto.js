export default class UserDTO {
    constructor(user){
        this._id=user._id;
        this.first_Name=`${user.first_Name}`;
        this.last_Name=`${user.last_Name}`;
        this.email= `${user.email}`;
        this.profile= user.profile? `http://localhost:8080/images/profiles/${user.profile}`:null;
        this.document=user.document? `http://localhost:8080/images/documents/${user.document}`:null;;
        this.role=user.role;

    }
}