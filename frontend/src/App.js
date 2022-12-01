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

function App() {
  const user = useSelector((state) => state.session.user);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      await dispatch(getFollowing());
      setLoaded(true);
    })();
  }, [dispatch]);

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
          <ProtectedRoute path="/users" exact={true}>
            <UsersList />
          </ProtectedRoute>
          <ProtectedRoute path="/users/:userId" exact={true}>
            <User />
          </ProtectedRoute>
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

  // return (
  //   <BrowserRouter>
  //     <div className={styles.pageLayout}>
  //       <div className={styles.nav}>
  //         <Route path="/">{user ? <NavBar /> : <Splash />}</Route>
  //       </div>
  //       <div className={styles.contentBody}>
  //         <Switch>
  //           <Route path="/" exact={true}>
  //             feed
  //           </Route>
  //           <ProtectedRoute path="/users" exact={true}>
  //             <UsersList />
  //           </ProtectedRoute>
  //           <ProtectedRoute path="/users/:userId" exact={true}>
  //             <User />
  //           </ProtectedRoute>
  //           <Route path="/account">
  //             <Setting />
  //           </Route>
  //           <Route path="/posts" exact={true}>
  //             <h1>Post</h1>
  //           </Route>
  //           <Route path="/posts/:postId" exact={true}>
  //             <PostDetailCard />
  //           </Route>
  //         </Switch>
  //       </div>
  //     </div>
  //   </BrowserRouter>
  // );
}

export default App;
