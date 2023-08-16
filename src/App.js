import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Post from './pages/Post/post';
import LerMais from './pages/LerMais/lermais';
import Edit from './pages/Edit/edit';
import Feed from './pages/Feed/feed';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Feed}/>
        <Route path="/post" component={Post}/> 
        <Route path="/lermais" component={LerMais}/>
        <Route path="/edit" component={Edit}/> 
      </Switch>
    </Router>
  );
}

export default App;
