import { ip, port } from "../dbRequests";

/**
 * Class for saving (creating) user records.
 * Maps to POST /users
 */
export class UserSaveRecords {
    #props = {}

    /**
     * Sets the payload for creating a new user.
     * @param {object} payload
     * @param {string} payload.name - The user's name.
     * @param {string} payload.email - The user's email.
     * @param {string} payload.password - The user's password.
     */
    set = payload => {
        this.#props = payload;
        return this;
    }

    /**
     * Executes the API call to create a new user.
     * @returns {Promise<Response>} The fetch API response.
     */
    execute = async () => await fetch(`http://${ip}:${port}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.#props)
    });
}

/**
 * Class for loading all user records.
 * Maps to GET /users
 */
export class UserLoadAllRecords {
    /**
     * Executes the API call to get all users.
     * @returns {Promise<Array<object>>} A promise that resolves to an array of user objects.
     */
    execute = async () => await (await fetch(`http://${ip}:${port}/users`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })).json();
}

/**
 * Class for loading a user record by ID.
 * Maps to GET /users/{userId}
 */
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

    /**
     * Executes the API call to get a user by ID.
     * @returns {Promise<object>} A promise that resolves to the user object.
     */
    execute = async () => {
        if (!this.#userId)
            throw new Error("User ID must be set to load a user by ID.");

        return await (await fetch(`http://${ip}:${port}/users/${this.#userId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })).json();
    }
}

/**
 * Class for loading a user record by email.
 * Maps to GET /users/byEmail?email={email}
 */
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

    /**
     * Executes the API call to get a user by email.
     * @returns {Promise<object>} A promise that resolves to the user object.
     */
    execute = async () => {
        if (!this.#email)
            throw new Error("Email must be set to load a user by email.");

        return await (await fetch(`http://${ip}:${port}/users/byEmail?email=${this.#email}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })).json();
    }
}

/**
 * Class for updating user records.
 * Maps to PUT /users/{userId}
 */
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

    /**
     * Executes the API call to update a user.
     * @returns {Promise<Response>} The fetch API response.
     */
    execute = async () => {
        if (!this.#userId)
            throw new Error("User ID must be set to update a user.");

        return await fetch(`http://${ip}:${port}/users/${this.#userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.#props)
        });
    }
}

/**
 * Class for deleting user records.
 * Maps to DELETE /users/{userId}
 */
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

    /**
     * Executes the API call to delete a user.
     * @returns {Promise<Response>} The fetch API response.
     */
    execute = async () => {
        if (!this.#userId)
            throw new Error("User ID must be set to delete a user.");

        return await fetch(`http://${ip}:${port}/users/${this.#userId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
    }
}