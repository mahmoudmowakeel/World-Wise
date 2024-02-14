import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initiallValue = {
  user: null,
  authUser: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        authUser: true,
      };
    case "logout":
      return {
        ...state,
        user: null,
        authUser: false,
      };
    default:
      throw new Error("Unknwon Action");
  }
}

const FAKE_USER = {
  name: "Elwakeel",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }) {
  const [{ user, authUser }, dispatch] = useReducer(reducer, initiallValue);

  console.log(FAKE_USER.password);

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ user, authUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext Has Used Outside The Provider");
  return context;
}

export { AuthProvider, useAuth };
