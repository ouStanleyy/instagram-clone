import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SignUpForm from "./components/auth/SignUpForm";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import NavBar from "./components/NavBar/NavBar";
import { UsersList, User } from "./components/Users";
import { authenticate, getFollowing } from "./store/session";
import Splash from "./components/Splash/Splash";
import { PostDetailCard } from "./components/Posts";
import styles from "./App.module.css";
import { Setting } from "./components/Setting";
import { Feed } from "./components/Feed";
import { CreatePost } from "./components/Posts";
import { Explore } from "./components/Explore";

function App() {
  const user = useSelector((state) => state.session.user);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  useEffect(() => {
    if (user) (async () => await dispatch(getFollowing()))();
  }, [dispatch, user]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {user && <NavBar />}
      <Switch>
        <Route path="/" exact={true}>
          {user ? <Feed /> : <Splash />}
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <div className={styles.innerBody}>
          <ProtectedRoute path="/explore" exact={true}>
            <Explore />
          </ProtectedRoute>
          <ProtectedRoute path="/users/:userId" exact={true}>
            <User />
          </ProtectedRoute>
          <Route path="/create" exact={true}>
            <CreatePost />
          </Route>
          <Route path="/account">
            <Setting />
          </Route>
          <Route path="/posts" exact={true}>
            <h1>Post</h1>
          </Route>
          <Route path="/posts/:postId" exact={true}>
            <PostDetailCard />
          </Route>
        </div>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
