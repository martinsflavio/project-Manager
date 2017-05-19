const db = require('../models');

addUsers();
addProjects();
addPropsoals();
addComments();






//////////////// functions ////////////////////
addUsers = () => {
  let users = [
    {
      name:'flavio',
      username: 'flavio',
      email:'flavio@gmail.com',
      password:'123'
    },{
      name:'teo',
      username: 'teo',
      email:'teo@gmail.com',
      password:'123'
    },{
      name:'steph',
      username: 'steph',
      email:'steph@gmail.com',
      password:'123'
    },{
      name:'cida',
      username: 'cida',
      email:'cida@gmail.com',
      password:'123'
    },{
      name:'iza',
      username: 'iza',
      email:'iza@gmail.com',
      password:'123'
    }
  ];

  users.forEach(user =>{
    db.Users.create(user).then(regUser => {
      console.log(`User Created: ${regUser.name}`);
    })
  });

};

addProjects = () => {
  let Projects = [
    {
      subject:'project 1',
      description:'user 2 Project',
      UserId: 2
    },{
      subject:'project 2',
      description:'user 2 Project',
      UserId: 2
    },{
      subject:'project 3',
      description:'user 2 Project',
      UserId: 2
    },{
      subject:'project 4',
      description:'user 1 Project',
      UserId: 1
    },{
      subject:'project 5',
      description:'user 1 Project',
      UserId: 2
    },{
      subject:'project 6',
      description:'user 1 Project',
      UserId: 1
    },{
      subject:'project 7',
      description:'user 3 Project',
      UserId: 3
    },{
      subject:'project 8',
      description:'user 3 Project',
      UserId: 3
    },{
      subject:'project 9',
      description:'user 2 Project',
      UserId: 2
    }
  ];

  Projects.forEach( project =>{
    db.Projects.create(project).then(regProject => {
      console.log(`Project Created: ${regProject.description}`);
    })
  });

};

addPropsoals = () => {
  let Proposals = [
    {
      subject: 'make change 1',
      body: 'How to make this change 1',
      ProjectId: 1,
      UserId: 1
    },
    {
      subject: 'make change 2',
      body: 'How to make this change 2',
      ProjectId: 1,
      UserId: 2
    },
    {
      subject: 'make change 3',
      body: 'How to make this change 3',
      ProjectId: 1,
      UserId: 3
    },
    {
      subject: 'make change 1',
      body: 'How to make this change 1',
      ProjectId: 2,
      UserId: 2
    },{
      subject: 'make change 3',
      body: 'How to make this change 3',
      ProjectId: 3,
      UserId: 3
    }

  ];

  Proposals.forEach( proposal =>{
    db.Projects.create(proposal).then(regProposal => {
      console.log(`Proposal Created: ${regProposal.description}`);
    })
  });
};

addComments = () => {
  let Comments = [
    {
      subject:'comment 1 ',
      body:'blabl abalal ablablalba bbalba lblablalbb alblalbal balbl ablabl albl abla lblablabl lablala vllalavlavllavlal l lval'
    },
    {},
    {},
    {},
    {}
  ];

  Comments.forEach( proposal =>{
    db.Projects.create(proposal).then(regProposal => {
      console.log(`Proposal Created: ${regProposal.description}`);
    })
  });
};



