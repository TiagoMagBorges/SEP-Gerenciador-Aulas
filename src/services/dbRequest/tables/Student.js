import {API_URL} from "@/services/dbRequest/dbRequests";

export class StudentLoadAllRecords {
  #userId = null;

  set = payload => {
    this.#userId = payload.userId;
    return this;
  }

  execute = async () => {
    console.log(this.#userId)
    if (!this.#userId)
      throw new Error("User ID must be set to load students by user id.");

    return await (await fetch(`${API_URL}/students/${this.#userId}`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })).json();
  }
}