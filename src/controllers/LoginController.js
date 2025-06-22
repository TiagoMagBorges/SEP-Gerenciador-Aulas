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

  static async login(email, password, rememberMe = false) { // TODO: Improve this function, maybe its better to throw an error
    try {
      const loginPayload = {email, password};

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

  static async register(userData) {
    try {
      const response = await DbRequests
          .user()
          .saveRecords()
          .set(userData)
          .execute();

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        let errorMessage = "";

        switch (response.status) {
          case 400: // Bad Request - Erro de validação
            errorMessage = errorBody?.message || "Dados inválidos. Por favor, verifique os campos e tente novamente.";
            break;
          case 409: // Conflict
            errorMessage = "Este e-mail já está cadastrado.";
            break;
          case 500: // Internal Server Error
            errorMessage = "Ocorreu um erro no servidor. Por favor, tente novamente mais tarde.";
            break;
          default:
            errorMessage = "Ocorreu um erro desconhecido.";
        }
        return {success: false, message: errorMessage};
      }

      await LoginController.login(userData.email, userData.password, true);

      return {success: true, message: "Usuário cadastrado e logado com sucesso!"};

    } catch (error) {
      console.error("Falha de conexão durante o registro:", error);
      return {
        success: false,
        message: "Não foi possível conectar ao servidor. Verifique sua conexão com a internet."
      };
    }
  }

  static logout() {
    LoginController.currentUserData = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem(LoginController.LOCAL_STORAGE_KEY);
      sessionStorage.removeItem(LoginController.SESSION_STORAGE_KEY);
    }
  }

  static isAuthenticated() {
    return !!LoginController.currentUserData;
  }

  static getCurrentUser() {
    return LoginController.currentUserData;
  }
}

if (typeof window !== 'undefined') {
  LoginController.initialize();
}

export default LoginController;