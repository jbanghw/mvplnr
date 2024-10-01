import { createContext, Dispatch, SetStateAction } from "react";

const AuthContext = createContext<{loggedIn: string | null, setLoggedIn: Dispatch<SetStateAction<string | null>>}>({
  loggedIn: localStorage.getItem('access'),
  setLoggedIn: () => { },
})

export default AuthContext