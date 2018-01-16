import React from 'react';

export default class IssueAdd extends React.Component{
  constructor(){
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e){
    e.preventDefault();
    const form = document.forms.issueAdd;
    this.props.createIssue(
      {
        owner : form.owner.value,
        title : form.title.value,
        status : 'New'
      }
    );
    form.owner.value="";
    form.title.value="";
  }
  render(){
    return (
      <form name="issueAdd" onSubmit={this.handleSubmit}>
        Owner:
        <input name="owner" placeholder ="owner"/>
        Title:
        <input name="title" placeholder ="title"/>
        <button type="submit">Add</button>
      </form>
    );
  }
}
