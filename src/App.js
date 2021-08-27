import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import ScrollToTop from "./ScrollTop";
import { UserContext } from "./context/UserProvider";
import LinearProgress from '@material-ui/core/LinearProgress';

function App() {
  const user = useContext(UserContext); 
  const [isLoaded, setIsLoaded] = useState(false);
  // return (
  //   <div className="App">
  //     <Router>
  //       <ScrollToTop />
  //       <div>
  //         <Switch>
  //           <Route path="/dashboard">
  //             <Dashboard />
  //           </Route>
  //           <Route path="/">
  //             <Login />
  //           </Route>
  //         </Switch>
  //       </div>
  //     </Router>
  //   </div>
  // );

  useEffect(() => {
    const timer = setInterval(() => {
      console.log('hello');
      clearInterval(timer);
      setIsLoaded(true);
    }, 2500)
  }, [user]);

  if (isLoaded) {
    return (
      user ? <Dashboard /> : <Login />
    )
  } else {
    return (< LinearProgress />)
  }
  
}

export default App;
