import React, { useContext } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import ScrollToTop from "./ScrollTop";
import { UserContext } from "./context/UserProvider";

function App() {
  const user = useContext(UserContext); 
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

  return (
    user ? <Dashboard /> : <Login />
  )
}

export default App;
