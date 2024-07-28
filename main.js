document.getElementById('issueInputForm').addEventListener('submit', submitIssue);
function submitIssue(e) {  
  const openIssues = document.getElementById('openIssues');
  const totalIssues = document.getElementById('totalIssues');  
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = `<p><span class="label label-info">Open</span></p>`;
  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));
  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
}
const closeIssue = id => {  
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id == id);
  currentIssue.status = `<p><span class="label label-danger">Closed</span></p>`;
  localStorage.setItem('issues', JSON.stringify(issues));         
  fetchIssues();
}
const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter( issue => issue.id != id );  
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  fetchIssues();
}
const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  // console.log ('Total Issues', issues);
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';
  totalIssues.innerText = issues.length; 
  const closedIssues = issues.filter(issue => issue.status == '<p><span class="label label-danger">Closed</span></p>');
  console.log ('Closed', closedIssues);
  for (let i = 0; i < closedIssues.length; i++) {
    closedIssues[i].description = closedIssues[i].description.strike();    
  }  
  openIssues.innerText = issues.length - closedIssues.length;
  for (var i = 0; i < issues.length; i++) {
    const {id, description, severity, assignedTo, status} = issues[i];
    issuesList.innerHTML +=   `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              ${status}                              
                              <h3 id = "descriptionText"> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a onclick="closeIssue(${id})" class="btn btn-warning">Close</a>
                              <a onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
  }
}
