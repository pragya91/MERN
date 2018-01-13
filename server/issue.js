'use strict';
const validIssueStatus = {
  New : true,
  Open : true,
  Assigned : true,
  Fixed : true,
  Verified : true,
  Closed : true
};

const issueFieldType = {
  status : 'required',
  owner : 'required',
  created : 'required',
  effort : 'optional',
  completionDate : 'optional',
  title : 'required'
};

function convertIssue(issue){
  if(issue.created)
    issue.created = new Date(issue.created);
  if(issue.completionDate)
    issue.completionDate = new Date(issue.completionDate);
  return issue;
}

function validateIssue(issue){
  
  for(const field in issueFieldType){
    const type = issueFieldType[field];
    if(!type){
      delete issue[field];
    }else if(issueFieldType[field] == 'required' && !issue[field]){
      return `${field} is required`;
    }
  }
  if(!validIssueStatus[issue.status]){
    return `${issue.status} is not a valid status.`
  }
  return null;
}

module.exports = {
  validateIssue: validateIssue,
  convertIssue : convertIssue
};
