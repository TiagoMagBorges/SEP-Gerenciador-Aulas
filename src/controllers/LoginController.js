export default class LoginController {

    static currentUserData = null;

    static async login(){
        // code to login
    }

    static logout = ()=> this.currentUserData = null;

}