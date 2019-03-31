import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home, PostEdit, PostView } from "./pages";
const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/post/:postId" component={PostView} />
        <Route exact path="/editor" component={PostEdit} />
      </Switch>
    </Router>
  );
};

export default App;
