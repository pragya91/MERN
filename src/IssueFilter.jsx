import React from 'react';
import {Link,withRouter} from 'react-router-dom';
import {QueryUtil} from './Utils.jsx';

 class IssueFilter extends React.Component{
  constructor(props){
    super(props);
    let queryStr = props.location.search;
    this.state = {
      status : QueryUtil.getQueryValue(queryStr,'status') || '',
      effort_gte : QueryUtil.getQueryValue(queryStr,'effort_gte') || '',
      effort_lte : QueryUtil.getQueryValue(queryStr,'effort_lte') || '',
      changed : false
    };

    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeEffortGte = this.onChangeEffortGte.bind(this);
    this.onChangeEffortLte = this.onChangeEffortLte.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
    this.resetFilter = this.resetFilter.bind(this);
  }
  onChangeStatus(e){
    this.setState({status: e.target.value, changed:true});
  }
  onChangeEffortGte(e){
    const effort = e.target.value;
    if(effort.match(/^\d*$/))
      this.setState({effort_gte: effort, changed:true});
  }
  onChangeEffortLte(e){
    const effort = e.target.value;
    if(effort.match(/^\d*$/))
      this.setState({effort_lte: effort, changed:true});
  }
  applyFilter(){
    let queryStr = "";
    if(this.state.status)
      queryStr="?status="+this.state.status;
    if(this.state.effort_gte)
      queryStr = queryStr.length > 0 ?  queryStr+"&effort_gte="+this.state.effort_gte : "?effort_gte="+this.state.effort_gte;
    if(this.state.effort_lte)
      queryStr = queryStr.length > 0 ?  queryStr+"&effort_lte="+this.state.effort_lte : "?effort_lte="+this.state.effort_lte;

    this.props.setFilter(queryStr);
  }
  clearFilter(){
    this.props.setFilter("");
  }
  resetFilter(){
    let queryStr = this.props.location.search;
    this.setState({
      status : QueryUtil.getQueryValue(queryStr,'status') || '',
      effort_gte : QueryUtil.getQueryValue(queryStr,'effort_gte') || '',
      effort_lte : QueryUtil.getQueryValue(queryStr,'effort_lte') || '',
      changed : false
    });
  }
  render(){
    return (
      <div>
        Status:
        <select value={this.state.status} onChange={this.onChangeStatus}>
          <option value="">(Any)</option>
          <option value="New">New</option>
          <option value="Open">Open</option>
          <option value="Assigned">Assigned</option>
          <option value="Fixed">Fixed</option>
          <option value="Verified">Verified</option>
          <option value="Closed">Closed</option>
        </select>
        &nbsp;Effort between:
        <input size={5} value={this.state.effort_gte} onChange={this.onChangeEffortGte}/>
        &nbsp;-&nbsp;
        <input size={5} value={this.state.effort_lte} onChange={this.onChangeEffortLte}/>
        <button onClick={this.applyFilter}>Apply</button>
        <button onClick={this.resetFilter} disabled={!this.state.changed}>Reset</button>
        <button onClick={this.clearFilter}>Clear</button>
      </div>
    );
  }
}

export default withRouter(IssueFilter);

/*
render(){
  const Seperator = () => <span> | </span>;
  return (
    <div>
      <Link to="/issues" >All issues</Link>
      <Seperator />
      <Link to={{pathname:"/issues" , search:"?status=Open"}}>Open issues</Link>
      <Seperator />
      <Link to={{pathname:"/issues" , search:"?status=Assigned"}}>Assigned issues</Link>
    </div>
  );
}
*/
