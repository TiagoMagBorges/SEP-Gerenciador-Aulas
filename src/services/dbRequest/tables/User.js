import {API_URL} from "../dbRequests";

export class UserSaveRecords {
  #props = {}

  /**
   * Sets the payload for creating a new user.
   * @param {object} payload
   * @param {string} payload.name - The user's name.
   * @param {string} payload.email - The user's email.
   * @param {string} payload.password - The user's password.
   * @param {string} payload.phone - The user's phone number.
   */
  set = payload => {
    this.#props = payload;
    return this;
  }

  execute = async () => await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(this.#props)
  });
}

export class UserLoadAllRecords {
  execute = async () => await (await fetch(`${API_URL}/users`, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  })).json();
}

export class UserLoadById {
  #userId = null

  /**
   * Sets the user ID for loading a specific user.
   * @param {object} payload
   * @param {number} payload.userId - The ID of the user to load.
   */
  set = payload => {
    this.#userId = payload.userId;
    return this;
  }

  execute = async () => {
    if (!this.#userId)
      throw new Error("User ID must be set to load a user by ID.");

    return await (await fetch(`${API_URL}/users/${this.#userId}`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })).json();
  }
}

export class UserLoadByEmail {
  #email = null

  /**
   * Sets the email for loading a specific user.
   * @param {object} payload
   * @param {string} payload.email - The email of the user to load.
   */
  set = payload => {
    this.#email = payload.email;
    return this;
  }

  execute = async () => {
    if (!this.#email)
      throw new Error("Email must be set to load a user by email.");

    return await (await fetch(`${API_URL}/users/users/byEmail?email=${this.#email}`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })).json();
  }
}

export class UserUpdateRecords {
  #props = {}
  #userId = null

  /**
   * Sets the payload for updating an existing user.
   * @param {object} payload
   * @param {number} payload.id - The ID of the user to update (must match path variable).
   * @param {string} payload.name - The updated user's name.
   * @param {string} payload.email - The updated user's email.
   * @param {string} payload.password - The updated user's password.
   */
  set = payload => {
    this.#userId = payload.id;
    this.#props = payload;
    return this;
  }

  execute = async () => {
    if (!this.#userId)
      throw new Error("User ID must be set to update a user.");

    return await fetch(`${API_URL}/users/${this.#userId}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(this.#props)
    });
  }
}

export class UserDeleteRecords {
  #userId = null

  /**
   * Sets the user ID for deleting a specific user.
   * @param {object} payload
   * @param {number} payload.userId - The ID of the user to delete.
   */
  set = payload => {
    this.#userId = payload.userId;
    return this;
  }

  execute = async () => {
    if (!this.#userId)
      throw new Error("User ID must be set to delete a user.");

    return await fetch(`${API_URL}/users/${this.#userId}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    });
  }
}