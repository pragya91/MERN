import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Redirect, Switch,Link,NavLink} from 'react-router-dom';
import './../less/main.less';
import logo from './../imgs/bug.png';

import IssueList from './IssueList.jsx';
import IssueEdit from './IssueEdit.jsx';
import Home from './Home.jsx';

const contentNode = document.getElementById("container");
const NoMatch = () => (<p>No match found</p>);

const App = () => (
  <BrowserRouter>
    <div className="app">
      <div className="header">
          <NavLink to={'/home'} className="home-link" >
            <img src={logo} alt="logo"/>Issue Tracker
          </NavLink>
          <nav>
            <ul>
              <li><NavLink to={'/issues'} activeClassName="selected-tab">All Issues</NavLink></li>
              <li><NavLink to={'/contributors'} activeClassName="selected-tab">Contributors</NavLink></li>
              <li><NavLink to={'/contact-us'} activeClassName="selected-tab">Contact Us</NavLink></li>
              <li><NavLink to={'/about'} activeClassName="selected-tab">About</NavLink></li>
            </ul>
          </nav>
      </div>

      <div className="content">
        <Switch>
          <Route exact path="/" render={()=><Redirect to="/home" />} />
          <Route path="/issues/:id" component={IssueEdit} />
          <Route path="/issues" component={IssueList} />
          <Route path="/home" component={Home} />
          <Route path="*" component={NoMatch} />
        </Switch>
      </div>

      <div className="footer">
        Footer goes here.
      </div>
    </div>
  </BrowserRouter>
);


ReactDOM.render(
    <App />,
    contentNode
);
