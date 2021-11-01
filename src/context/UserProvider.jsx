import React, { Component, createContext } from "react";
import { auth } from "../firebase";

export const UserContext = createContext({ user: null });
class UserProvider extends Component {
  state = {
    user: null,
    role: null,
  };

  componentDidMount = () => {
    auth.onAuthStateChanged((userAuth) => {
      userAuth.getIdTokenResult().then((idTokenResult) => {
        let role;
        Boolean(idTokenResult.claims.role3)
          ? (role = "role-3")
          : Boolean(idTokenResult.claims.role2)
          ? (role = "role-2")
          : (role = "role-1");

        userAuth[`role`] = role;

        this.setState({ user: userAuth });
      });
    });
  };
  render() {
    return (
      <UserContext.Provider value={this.state.user}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
export default UserProvider;
