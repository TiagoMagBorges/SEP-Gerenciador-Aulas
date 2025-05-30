import { ip, port } from "../dbRequests";

/**
 * Class for handling user login.
 * Maps to POST /login
 */
export class AuthLogin {
    #props = {}

    /**
     * Sets the payload for logging in a user.
     * @param {object} payload
     * @param {string} payload.email - The user's email.
     * @param {string} payload.password - The user's password.
     */
    set = payload => {
        this.#props = payload;
        return this;
    }

    /**
     * Executes the API call to log in a user.
     * @returns {Promise<Response>} The fetch API response.
     */
    execute = async () => {
        const response = await fetch(`http://${ip}:${port}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.#props)
        });

        if (response.status === 401)
            throw new Error('Credenciais inválidas.');

        if (!response.ok)
            throw new Error('Falha no login.');

        return response.json();
    }
}