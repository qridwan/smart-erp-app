import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import { UserContext } from "./context/UserProvider";
import LinearProgress from "@material-ui/core/LinearProgress";

function App() {
  const user = useContext(UserContext);
  console.log("🚀 ~ App ~ { user, role }", { user });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      console.log("hello");
      clearInterval(timer);
      setIsLoaded(true);
    }, 2500);
  }, [user]);

  if (isLoaded) {
    return user.email ? <Dashboard /> : <Login />;
  } else {
    return <LinearProgress />;
  }
}

export default App;
