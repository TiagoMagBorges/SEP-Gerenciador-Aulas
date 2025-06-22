import {
  UserSaveRecords,
  UserLoadAllRecords,
  UserLoadById,
  UserLoadByEmail,
  UserUpdateRecords,
  UserDeleteRecords
} from "@/services/dbRequest/tables/User";
import {AuthLogin} from "@/services/dbRequest/tables/Auth";
import {StudentLoadAllRecords} from "@/services/dbRequest/tables/Student";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default class DbRequests {
  static user = () => User;

  static auth = () => Auth;

  static student = () => Student;
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

class Student {
  static loadAllRecords = () => new StudentLoadAllRecords();
}