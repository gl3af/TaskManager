import React from 'react';
import Header from "./components/Header";
import {UserContext} from "./context/UserContext";
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
function App() {
  const {token, login, logout, username, type} = useAuth()
  const logged = !!token
  const routes = useRoutes(logged)

  return (
    <UserContext.Provider value={{ token, login, logout, username, type, logged }}>
      {logged && <Header/>}
      {routes}
    </UserContext.Provider>
  )
}

export default App;