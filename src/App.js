import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Components/NavbarComponent/Navbar";
import CreatePost from "./Components/PostComponent/CreatePost";
import Home from "./Pages/Home";
import PageNotFound from "./Pages/PageNotFound";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PostDetail from "./Components/PostComponent/PostDetail";
import EditPost from "./Components/PostComponent/EditPost";
import DeletePost from "./Components/PostComponent/DeletePost";
const App = () => {
  return (
    <Fragment>
      <Router>
        <header>
          <Navbar />
        </header>
        <ToastContainer />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/create-post" exact>
            <CreatePost />
          </Route>
          <Route path="/post-detail/:id" exact>
            <PostDetail />
          </Route>
          <Route path="/edit-post/:id" exact>
            <EditPost />
          </Route>
          <Route path="/delete-post/:id" exact>
            <DeletePost />
          </Route>

          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </Router>
    </Fragment>
  );
};

export default App;
