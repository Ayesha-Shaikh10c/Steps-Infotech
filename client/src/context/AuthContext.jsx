import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const AuthContext = createContext(null);

// ==================================================
// STORAGE KEYS
// ==================================================

const TOKEN_KEY = "token";
const USER_KEY = "user";

// ==================================================
// GET STORED USER
// ==================================================

const getStoredUser = () => {
  try {
    const storedUser = localStorage.getItem(USER_KEY);

    if (!storedUser) {
      return null;
    }

    const parsedUser = JSON.parse(storedUser);

    if (!parsedUser || typeof parsedUser !== "object") {
      localStorage.removeItem(USER_KEY);
      return null;
    }

    return parsedUser;
  } catch (error) {
    console.error("Failed to read stored user:", error);

    try {
      localStorage.removeItem(USER_KEY);
    } catch (storageError) {
      console.error(
        "Failed to remove invalid stored user:",
        storageError
      );
    }

    return null;
  }
};

// ==================================================
// GET STORED TOKEN
// ==================================================

const getStoredToken = () => {
  try {
    const storedToken = localStorage.getItem(TOKEN_KEY);

    if (!storedToken || typeof storedToken !== "string") {
      return null;
    }

    return storedToken;
  } catch (error) {
    console.error("Failed to read stored token:", error);
    return null;
  }
};

// ==================================================
// AUTH PROVIDER
// ==================================================

export function AuthProvider({ children }) {
  // ==================================================
  // AUTH STATE
  // ==================================================

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  // ==================================================
  // LOADING STATE
  // ==================================================

  const [loading, setLoading] = useState(true);

  // ==================================================
  // INITIAL AUTH CHECK
  // ==================================================

  useEffect(() => {
    let mounted = true;

    const initializeAuth = () => {
      try {
        const storedToken = getStoredToken();
        const storedUser = getStoredUser();

        // ----------------------------------------------
        // BOTH REQUIRED
        // ----------------------------------------------

        if (storedToken && storedUser) {
          if (mounted) {
            setToken(storedToken);
            setUser(storedUser);
          }
        } else {
          // --------------------------------------------
          // CLEAR INCOMPLETE AUTH DATA
          // --------------------------------------------

          try {
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(USER_KEY);
          } catch (storageError) {
            console.error(
              "Failed to clear incomplete auth data:",
              storageError
            );
          }

          if (mounted) {
            setToken(null);
            setUser(null);
          }
        }
      } catch (error) {
        console.error(
          "Failed to initialize authentication:",
          error
        );

        if (mounted) {
          setToken(null);
          setUser(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    return () => {
      mounted = false;
    };
  }, []);

  // ==================================================
  // AUTHENTICATION STATUS
  // ==================================================

  const isAuthenticated = Boolean(token && user);

  // ==================================================
  // LOGIN
  // ==================================================

  const login = (
    loginResponse,
    optionalUser = null
  ) => {
    try {
      // ----------------------------------------------
      // VALIDATE RESPONSE
      // ----------------------------------------------

      if (!loginResponse) {
        throw new Error("Invalid login response.");
      }

      // ----------------------------------------------
      // GET TOKEN
      // ----------------------------------------------

      let receivedToken = null;

      if (typeof loginResponse === "object") {
        receivedToken =
          loginResponse.token ||
          loginResponse.accessToken ||
          loginResponse.data?.token ||
          loginResponse.data?.accessToken;
      }

      // Support login(token, user)
      if (
        !receivedToken &&
        typeof loginResponse === "string"
      ) {
        receivedToken = loginResponse;
      }

      // ----------------------------------------------
      // GET USER
      // ----------------------------------------------

      let receivedUser = optionalUser;

      if (
        !receivedUser &&
        typeof loginResponse === "object"
      ) {
        receivedUser =
          loginResponse.user ||
          loginResponse.data?.user ||
          loginResponse.data?.data?.user;
      }

      // ----------------------------------------------
      // VALIDATE TOKEN
      // ----------------------------------------------

      if (
        !receivedToken ||
        typeof receivedToken !== "string"
      ) {
        throw new Error(
          "Authentication token was not received from server."
        );
      }

      // ----------------------------------------------
      // VALIDATE USER
      // ----------------------------------------------

      if (
        !receivedUser ||
        typeof receivedUser !== "object"
      ) {
        throw new Error(
          "User information was not received from server."
        );
      }

      // ----------------------------------------------
      // SAVE TOKEN
      // ----------------------------------------------

      localStorage.setItem(
        TOKEN_KEY,
        receivedToken
      );

      // ----------------------------------------------
      // SAVE USER
      // ----------------------------------------------

      localStorage.setItem(
        USER_KEY,
        JSON.stringify(receivedUser)
      );

      // ----------------------------------------------
      // UPDATE STATE
      // ----------------------------------------------

      setToken(receivedToken);
      setUser(receivedUser);
      setLoading(false);

      // ----------------------------------------------
      // SUCCESS
      // ----------------------------------------------

      return {
        success: true,
        token: receivedToken,
        user: receivedUser,
      };
    } catch (error) {
      console.error(
        "Authentication data could not be saved:",
        error
      );

      // ----------------------------------------------
      // CLEAR INVALID AUTH DATA
      // ----------------------------------------------

      try {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      } catch (storageError) {
        console.error(
          "Failed to clear auth storage:",
          storageError
        );
      }

      setToken(null);
      setUser(null);
      setLoading(false);

      return {
        success: false,
        message:
          error?.message ||
          "Authentication failed.",
      };
    }
  };

  // ==================================================
  // LOGOUT
  // ==================================================

  const logout = () => {
    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);

      // Remove old/legacy auth keys if they exist
      localStorage.removeItem("userName");
      localStorage.removeItem("fullName");
    } catch (error) {
      console.error(
        "Failed to clear authentication data:",
        error
      );
    }

    setToken(null);
    setUser(null);
    setLoading(false);
  };

  // ==================================================
  // UPDATE USER
  // ==================================================

  const updateUser = (updatedUser) => {
    try {
      if (
        !updatedUser ||
        typeof updatedUser !== "object"
      ) {
        return false;
      }

      localStorage.setItem(
        USER_KEY,
        JSON.stringify(updatedUser)
      );

      setUser(updatedUser);

      return true;
    } catch (error) {
      console.error(
        "Failed to update user:",
        error
      );

      return false;
    }
  };

  // ==================================================
  // UPDATE TOKEN
  // ==================================================

  const updateToken = (newToken) => {
    try {
      if (
        !newToken ||
        typeof newToken !== "string"
      ) {
        return false;
      }

      localStorage.setItem(
        TOKEN_KEY,
        newToken
      );

      setToken(newToken);

      return true;
    } catch (error) {
      console.error(
        "Failed to update token:",
        error
      );

      return false;
    }
  };

  // ==================================================
  // SYNC AUTH DATA WITH LOCAL STORAGE
  // ==================================================

  useEffect(() => {
    // Don't run storage synchronization while
    // initial authentication state is being restored.
    if (loading) {
      return;
    }

    try {
      // ----------------------------------------------
      // TOKEN
      // ----------------------------------------------

      if (token) {
        localStorage.setItem(
          TOKEN_KEY,
          token
        );
      } else {
        localStorage.removeItem(TOKEN_KEY);
      }

      // ----------------------------------------------
      // USER
      // ----------------------------------------------

      if (user) {
        localStorage.setItem(
          USER_KEY,
          JSON.stringify(user)
        );
      } else {
        localStorage.removeItem(USER_KEY);
      }
    } catch (error) {
      console.error(
        "Failed to synchronize authentication data:",
        error
      );
    }
  }, [token, user, loading]);

  // ==================================================
  // CONTEXT VALUE
  // ==================================================

  const value = useMemo(
    () => ({
      token,
      user,

      setToken,
      setUser,

      loading,
      isAuthenticated,

      login,
      logout,

      updateUser,
      updateToken,
    }),
    [
      token,
      user,
      loading,
      isAuthenticated,
    ]
  );

  // ==================================================
  // PROVIDER
  // ==================================================

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// ==================================================
// USE AUTH
// ==================================================

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};

// ==================================================
// NAMED EXPORT
// ==================================================

export { AuthContext };

// ==================================================
// DEFAULT EXPORT
// ==================================================

export default AuthContext;