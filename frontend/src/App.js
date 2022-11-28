import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import NavBar from "./components/NavBar/NavBar";
import { UsersList, User } from "./components/Users";
import { authenticate } from "./store/session";
import Splash from "./components/Splash/Splash";
import { PostDetailCard } from "./components/Posts";

function App() {
  const user = useSelector((session) => session.user);
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

  // return (
  //   <BrowserRouter>
  //     <Switch>
  //       <Route path="/login" exact={true}>
  //         <NavBar />
  //         <LoginForm />
  //       </Route>
  //       <Route path="/sign-up" exact={true}>
  //         <SignUpForm />
  //       </Route>
  //       <ProtectedRoute path="/users" exact={true}>
  //         <UsersList />
  //       </ProtectedRoute>
  //       <ProtectedRoute path="/users/:userId" exact={true}>
  //         <User />
  //       </ProtectedRoute>
  //       <Route path="/splash" exact={true}>
  //         <Splash />
  //       </Route>
  //       {/* <Route path="/posts">
  //         <h1>Post</h1>
  //         <Posts />
  //       </Route> */}
  //     </Switch>
  //   </BrowserRouter>
  // );

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true}>
          {user ? <NavBar /> : <Splash />}
        </Route>
        <Route path="/login" exact={true}>
          <NavBar />
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
        <Route path="/splash" exact={true}>
          <Splash />
        </Route>
        <Route path="/posts" exact={true}>
          <h1>Post</h1>
        </Route>
        <Route path="/posts/:postId" exact={true}>
          <h1>Post Id</h1>
          <PostDetailCard />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
