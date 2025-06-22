import DbRequests from "../services/dbRequest/dbRequests";
import LoginController from "@/controllers/LoginController";

class StudentController {

  static async getStudents() { // TODO: Improve this function, return only one thing
    const userId = LoginController.getCurrentUser()?.id;

    if (!userId) return {message: "User not logged in.", data: []};

    try{
      const res = await DbRequests
          .student()
          .loadAllRecords()
          .set({userId})
          .execute();

      if(Array.isArray(res) && res.length === 0) return {message: "Empty", data: []};
      return {message: "Ok", data: res};

    }catch (error) {
      return {message: error.message || error.toString(), data: []};
    }
  }

  static async createStudent(student) {

  }

  static async deleteStudent(studentId) {

  }

  static async updateStudent(studentId, student) {

  }
}

export default StudentController;