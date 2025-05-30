import {
    UserSaveRecords,
    UserLoadAllRecords,
    UserLoadById,
    UserLoadByEmail,
    UserUpdateRecords,
    UserDeleteRecords
} from "@/services/dbRequest/tables/User";
import {AuthLogin} from "@/services/dbRequest/tables/Auth";

export const ip = 'localhost';
export const port = '8080';

export default class DbRequests {
    static user = () => User;

    static auth = () => Auth;
}

class User {
    static saveRecords = () => new UserSaveRecords();
    static loadRecords = () => new UserLoadAllRecords();
    static loadById = () => new UserLoadById();
    static loadByEmail = () => new UserLoadByEmail();
    static updateRecords = () => new UserUpdateRecords();
    static deleteRecords = () => new UserDeleteRecords();
}

class Auth {
    static login = () => new AuthLogin();
}