import DbRequests from "../services/dbRequest/dbRequests";

class LoginController {

    static currentUserData = null;

    static STORAGE_KEY = 'currentUser';

    static initialize() {
        if (typeof window !== 'undefined') {
            try {
                const storedUser = localStorage.getItem(LoginController.STORAGE_KEY);
                if (storedUser)
                    LoginController.currentUserData = JSON.parse(storedUser);
            } catch (error) {
                console.error("Failed to load user from localStorage:", error);
                localStorage.removeItem(LoginController.STORAGE_KEY);
                LoginController.currentUserData = null;
            }
        }
    }

    /**
     * Handles the user login process.
     * @param {string} email
     * @param {string} password
     * @returns {Promise<object>} The user data on successful login.
     * @throws {Error} If login fails.
     */
    static async login(email, password) {
        try {
            const loginPayload = { email, password };

            const responseData = await DbRequests
                .auth()
                .login()
                .set(loginPayload)
                .execute();

            LoginController.currentUserData = responseData;

            if (typeof window !== 'undefined')
                localStorage.setItem(LoginController.STORAGE_KEY, JSON.stringify(responseData));

            return responseData;
        } catch (error) {
            console.error("Login attempt failed:", error);

            LoginController.currentUserData = null;

            if (typeof window !== 'undefined')
                localStorage.removeItem(LoginController.STORAGE_KEY);

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
        if (typeof window !== 'undefined')
            localStorage.removeItem(LoginController.STORAGE_KEY);
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