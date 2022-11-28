import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import InputContainer from "./components/Comment/inputContainer";
import CommentsForm from "./components/Comment/commentsForm";
// import Posts from "./components/Post";
import { authenticate } from "./store/session";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/comments" exact={true}>
          <CommentsForm />
          <InputContainer />
        </Route>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
        <Route path="/" exact={true}>
          {/* <h1>My Home Page</h1> */}
        </Route>
        {/* <Route path="/posts">
          <h1>Post</h1>
          <Posts />
        </Route> */}
      </Switch>
    </BrowserRouter>
  );

  // return (
  //   <BrowserRouter>
  //     <NavBar />
  //     <Switch>
  //       <Route path="/login" exact={true}>
  //         <LoginForm />
  //       </Route>
  //       <Route path="/sign-up" exact={true}>
  //         <SignUpForm />
  //       </Route>
  //       <ProtectedRoute>
  //         <UsersList path="/users" exact={true} />
  //         <User path="/users/:userId" exact={true} />
  //       </ProtectedRoute>
  //       <Route path="/" exact={true}>
  //         {/* <h1>My Home Page</h1> */}
  //       </Route>
  //       {/* <Route path="/posts">
  //         <h1>Post</h1>
  //         <Posts />
  //       </Route> */}
  //     </Switch>
  //   </BrowserRouter>
  // );
}

export default App;
