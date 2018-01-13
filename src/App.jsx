import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';

import IssueList from './IssueList.jsx';
import IssueEdit from './IssueEdit.jsx';

const contentNode = document.getElementById("content");

const NoMatch = () => (<p>No match found</p>);

const App = () => (
  <div>
    <div className="header">
      <h1>Issue Tracker</h1>
    </div>
    <div className="content">
      <RoutedApp />
    </div>
    <div className="footer">
      Footer goes here.
    </div>
  </div>
);

const RoutedApp = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact path="/" render={()=><Redirect to="/issues" />} />
        <Route path="/issues/:id" component={IssueEdit} />
        <Route path="/issues" component={IssueList} />
        <Route path="*" component={NoMatch} />
      </Switch>
    </div>
  </BrowserRouter>
);

ReactDOM.render(
    <App />,
    contentNode
);
