import React from 'react';
import {Link, withRouter} from 'react-router-dom';

import IssueAdd from './IssueAdd.jsx';
import IssueFilter from './IssueFilter.jsx';
import {URLManager} from './Utils.jsx';

//since IssuwRow had only a render funciton and no logic, we moved it to be only a function.
const IssueRow = (props)=> {
  function onDelete(){
    props.deleteIssue(props.issue._id);
  }

  return (
      <tr>
        <td><Link to={`/issues/${props.issue._id}`}>{props.issue._id.substr(-4)}</Link></td>
        <td>{props.issue.status}</td>
        <td>{props.issue.owner}</td>
        <td>{new Date(props.issue.created).toDateString()}</td>
        <td>{props.issue.effort}</td>
        <td>{props.issue.completionDate ? props.issue.completionDate.toDateString() : ''}</td>
        <td>{props.issue.title}</td>
        <td><button onClick={onDelete} >Delete</button></td>
      </tr>
  );
};

//since issue table only had a render function and no other logic, we made it a function instead of a class.
function IssueTable(props){
    const borderStyle = {
      color: 'gray'
    };
    const issueRows = props.issues.map(issue => <IssueRow key={issue._id} issue={issue} deleteIssue={props.deleteIssue} />);
    return (
      <table className="bordered-table" style={borderStyle}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Status</th>
            <th>Owner</th>
            <th>Created</th>
            <th>Effort</th>
            <th>Completion Date</th>
            <th>Title</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {issueRows}
        </tbody>
      </table>
    );

}

class IssueList extends React.Component{
  constructor(){
    super();
    this.state = {issues : []};
    this.createIssue = this.createIssue.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.deleteIssue = this.deleteIssue.bind(this);
  }
  componentDidMount(){
    this.loadData();
  }
  componentDidUpdate(prevProps){
    var prevQuery = prevProps.location.search;
    var newQuery = this.props.location.search;

    if(prevQuery == newQuery){
      return;
    }
    this.loadData();
  }
  setFilter(filter){
    this.props.history.push(this.props.location.pathname + filter);
  }
  loadData(){
    console.log("aaaaa");
    let self = this;
    let getIssues = new Promise(function(resolve, reject){
        let xhr = new XMLHttpRequest();
        xhr.open('GET', URLManager.URL_ISSUES+self.props.location.search ,true);
        xhr.onload = function() {
            if (xhr.status == 200 || xhr.status == 304) {
              resolve(JSON.parse(xhr.response));
            }
            else {
              reject(Error(xhr.statusText));
            }
        };
        xhr.onerror = function() {
            reject(Error("Network Error"));
        };
        xhr.send();
    });
    getIssues.then(function(response){
      response.records.forEach(issue => {
        issue.created = new Date(issue.created);
        if(issue.completionDate)
          issue.completionDate = new Date(issue.completionDate);
      });
      self.setState({issues : response.records});
    }).catch(function(error){
      console.log("Error in fetching data from server: ",error);
    });
  }
  createIssue(newIssue){
    let self = this;
    let createNewIssue = new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();
      xhr.open('POST',URLManager.URL_ISSUES,true);
      xhr.setRequestHeader("Content-Type","application/json");
      xhr.onload = function(){
        if(xhr.status ==200){
          resolve(JSON.parse(xhr.response));
        }else{
          reject(JSON.parse(xhr.response));
        }
      };
      xhr.onerror = function() {
          reject(Error("Network Error"));
      };
      console.log(newIssue);
      xhr.send(JSON.stringify(newIssue));
    });
    createNewIssue.then(function(response){
        let allIssues = self.state.issues.concat(response);
        self.setState({issues : allIssues});
    },function(error){
        alert(error.message)
    });
  }

  deleteIssue(id){
    let deleteThisIssue = new Promise((resolve, reject)=>{
      let xhr = new XMLHttpRequest();
      xhr.open('DELETE',URLManager.URL_ISSUES + "/"+id,true);
      xhr.onload = ()=>{
        if(xhr.status ==200){
          resolve();
        }else{
          reject(JSON.parse(xhr.response));
        }
      };
      xhr.onerror = ()=>{
          reject(Error("Network Error"));
      };
      xhr.send();
    });
    deleteThisIssue.then(()=>{
        this.loadData();
    },function(error){
        alert("Failed to delete issue:"+error.message)
    });
  }

  render(){
    return (
      <div>
        <IssueFilter setFilter={this.setFilter}/>
        <hr />
        <IssueTable issues={this.state.issues} deleteIssue={this.deleteIssue} />
        <hr />
        <IssueAdd createIssue = {this.createIssue}/>
      </div>
  );
  }
}
export default withRouter(IssueList);
