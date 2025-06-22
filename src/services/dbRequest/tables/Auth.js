import {API_URL} from "../dbRequests";

export class AuthLogin {
  #props = {};

  /**
   * Defines the user login payload.
   * @param {object} payload
   * @param {string} payload.email
   * @param {string} payload.password
   */
  set = (payload) => {
    this.#props = payload;
    return this;
  };

  /**
   * @returns {Promise<{data: any|null, error: any|null, response: Response}>}
   */
  execute = async () => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(this.#props),
      });

      if (response.ok) {
        const data = await response.json();
        return {data, error: null, response};
      }

      const error = await response.json().catch(() => null);

      return {data: null, error, response};

    } catch (networkError) {
      console.error("Network request failed:", networkError);
      throw new Error("API communication failure.");
    }
  };
}