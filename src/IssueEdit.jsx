import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {URLManager,DateManager} from './Utils.jsx';
import {NumInput} from './Inputs.jsx';

export default class IssueEdit extends React.Component{
  constructor(){
    super();
    this.state = {
      issue: {
        _id:'',
        title: '',
        status:'',
        owner:'',
        effort:'',
        completionDate: '',
        created: ''
      },
      invalidFields : {},
      showInvalidMsg : false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount(){
    this.loadIssueData();
  }
  componentDidUpdate(prevProps){
    if(prevProps.location != this.props.location){
      this.loadIssueData();
    }
  }
  onChange(e, convertedValue){
    const issue = Object.assign({},this.state.issue);
    issue[e.target.name] = (convertedValue!=undefined ? convertedValue : e.target.value);
    this.setState({issue : issue});
  }
  onSubmit(e){
    e.preventDefault();
    //let invalidFields = {...this.state.invalidFields};
    let invalidFields = Object.assign({},this.state.invalidFields);
    this.setState({showInvalidMsg : false});

    if(this.state.issue.title == '')
      invalidFields['title'] = true;
    else
      delete invalidFields['title'];

    if(this.state.issue.owner == '' )
      invalidFields['owner'] = true;
    else
      delete invalidFields['owner'];


    this.setState({invalidFields});
    if(Object.keys(invalidFields).length!=0){
      this.setState({showInvalidMsg : true});
      e.preventDefault();
      return;
    }
    let self = this;
    let updateIssue = new Promise((resolve, reject)=>{
        let xhr = new XMLHttpRequest();
        xhr.open('PUT', URLManager.URL_SERVER_PREFIX + self.props.location.pathname ,true);
        xhr.setRequestHeader("Content-Type","application/json");
        xhr.onload = () => {
            if (xhr.status == 200 || xhr.status == 304)
              resolve(JSON.parse(xhr.response));
            else
              reject(SON.parse(xhr.response));
        };
        xhr.onerror = function() {
            reject(Error("Network Error"));
        };
        let issueToUpdate = Object.assign({},self.state.issue);
        xhr.send(JSON.stringify(issueToUpdate));
    });
    updateIssue.then((response)=>{
      response.created = DateManager.formatDate(new Date(response.created));
      response.completionDate = DateManager.formatDate(new Date(response.completionDate));
      self.setState({issue : response});
      alert("Issue updated successfuly");
    }).catch((error)=>{
      console.log("Error in fetching data from server: ",error);
    });
  }
  loadIssueData(){
    let self = this;
    let getIssue = new Promise((resolve, reject)=>{
        let xhr = new XMLHttpRequest();
        xhr.open('GET', URLManager.URL_SERVER_PREFIX + self.props.location.pathname ,true);
        xhr.onload = () => {
            if (xhr.status == 200 || xhr.status == 304)
              resolve(JSON.parse(xhr.response));
            else
              reject(SON.parse(xhr.response));
        };
        xhr.onerror = function() {
            reject(Error("Network Error"));
        };
        xhr.send();
    });
    getIssue.then((response)=>{
      response.created = DateManager.formatDate(new Date(response.created));
      response.completionDate = DateManager.formatDate(new Date(response.completionDate));
      self.setState({issue : response});
    }).catch((error)=>{
      console.log("Error in fetching data from server: ",error);
    });
  }
  render(){
    const issue = this.state.issue;
    return (
      <div>
        <form>
          ID: {issue._id}
          <br/>
          Created: {issue.created}
          <br/>
          Status:
          <select name="status" value={issue.status} onChange={this.onChange}>
            <option value="New">New</option>
            <option value="Open">Open</option>
            <option value="Assigned">Assigned</option>
            <option value="Fixed">Fixed</option>
            <option value="Verified">Verified</option>
            <option value="Closed">Closed</option>
          </select>
          <br />
          Owner:
          <input name="owner" value={issue.owner} onChange={this.onChange}/>
          <br />
          Effort:
          <NumInput name="effort" value={issue.effort} onChange={this.onChange} />
          <br />
          Completion Date:
          <input type="date" name="completionDate" value={issue.completionDate} onChange={this.onChange} />
          <br/>
          Title:
          <input name="title" value={issue.title} onChange={this.onChange} />
          <br />
          <button name='submit' type="submit" onClick={this.onSubmit}>Submit</button>
          <Link to="/issues">Back to issues list</Link>
        </form>
        <div className={'error ' + (this.state.showInvalidMsg== true ? 'show' : 'hide')}> Please correct these fields: {Object.keys(this.state.invalidFields)}</div>
      </div>
    );
  }
}
