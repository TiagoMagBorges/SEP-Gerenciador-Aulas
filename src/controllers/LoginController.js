import DbRequests from "../services/dbRequest/dbRequests";

class LoginController {

    static currentUserData = null;

    static LOCAL_STORAGE_KEY = 'currentUser_persistent';
    static SESSION_STORAGE_KEY = 'currentUser_session';

    static initialize() {
        if (typeof window !== 'undefined') {
            try {
                // Try to load from persistent storage first
                const storedUserPersistent = localStorage.getItem(LoginController.LOCAL_STORAGE_KEY);
                if (storedUserPersistent) {
                    LoginController.currentUserData = JSON.parse(storedUserPersistent);
                    return; // If found in local storage, we're good
                }

                // If not in persistent, try session storage
                const storedUserSession = sessionStorage.getItem(LoginController.SESSION_STORAGE_KEY);
                if (storedUserSession) {
                    LoginController.currentUserData = JSON.parse(storedUserSession);
                }
            } catch (error) {
                console.error("Failed to load user from storage:", error);
                // Clear both storages if there's an error
                localStorage.removeItem(LoginController.LOCAL_STORAGE_KEY);
                sessionStorage.removeItem(LoginController.SESSION_STORAGE_KEY);
                LoginController.currentUserData = null;
            }
        }
    }

    /**
     * Handles the user login process.
     * @param {string} email
     * @param {string} password
     * @param {boolean} rememberMe - Whether to store the session persistently.
     * @returns {Promise<object>} The user data on successful login.
     * @throws {Error} If login fails.
     */
    static async login(email, password, rememberMe = false) { // Add rememberMe with a default
        try {
            const loginPayload = { email, password };

            const responseData = await DbRequests
                .auth()
                .login()
                .set(loginPayload)
                .execute();

            LoginController.currentUserData = responseData;

            if (typeof window !== 'undefined') {
                if (rememberMe) {
                    localStorage.setItem(LoginController.LOCAL_STORAGE_KEY, JSON.stringify(responseData));
                    sessionStorage.removeItem(LoginController.SESSION_STORAGE_KEY); // Clear session if persistent
                } else {
                    sessionStorage.setItem(LoginController.SESSION_STORAGE_KEY, JSON.stringify(responseData));
                    localStorage.removeItem(LoginController.LOCAL_STORAGE_KEY); // Clear persistent if not rememberMe
                }
            }

            return responseData;
        } catch (error) {
            console.error("Login attempt failed:", error);

            LoginController.currentUserData = null;

            if (typeof window !== 'undefined') {
                localStorage.removeItem(LoginController.LOCAL_STORAGE_KEY);
                sessionStorage.removeItem(LoginController.SESSION_STORAGE_KEY);
            }

            throw error;
        }
    }

    /**
     * Handles the user registration process.
     * @param {object} userData - { name, email, password, phone }
     * @returns {Promise<void>} Resolves on successful registration.
     * @throws {Error} If registration fails.
     */
    static async register(userData) {
        try {
            const response = await DbRequests
                .user()
                .saveRecords()
                .set(userData)
                .execute();

            if (!response.ok) {
                const errorBody = await response.json().catch(() => ({message: 'Erro desconhecido' }));
                throw new Error(errorBody.message || 'Falha no cadastro. Tente novamente mais tarde.');
            }

            console.log("Registration successful!");
        } catch (error) {
            console.error("Registration error:", error);
            throw error;
        }
    }

    /**
     * Logs out the current user.
     */
    static logout() {
        LoginController.currentUserData = null;
        if (typeof window !== 'undefined') {
            localStorage.removeItem(LoginController.LOCAL_STORAGE_KEY);
            sessionStorage.removeItem(LoginController.SESSION_STORAGE_KEY);
        }
    }

    /**
     * Checks if a user is currently authenticated.
     * @returns {boolean} True if a user is authenticated, false otherwise.
     */
    static isAuthenticated() {
        return !!LoginController.currentUserData;
    }

    /**
     * Gets the data of the current authenticated user.
     * @returns {object | null} The user data or null if not authenticated.
     */
    static getCurrentUser() {
        return LoginController.currentUserData;
    }
}

if (typeof window !== 'undefined') {
    LoginController.initialize();
}

export default LoginController;