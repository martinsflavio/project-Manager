const db = require('../models');


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

addProposals = () => {
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
    db.Proposals.create(proposal).then(regProposal => {
      console.log(`Proposal Created: ${regProposal.description}`);
    })
  });
};

addComments = () => {
  let Comments = [
    {
      body:'blabl abalal ablablalba bbalba lblablalbb alblalbal balbl ablabl albl abla lblablabl lablala vllalavlavllavlal l lval',
      ProjectId: 1,
      UserId: 1
    },
    {
      body:'blabl abalal ablablalba bbalba lblablalbb alblalbal balbl ablabl albl abla lblablabl lablala vllalavlavllavlal l lval',
      ProjectId: 1,
      UserId: 2
    },
    {
      body:'blabl abalal ablablalba bbalba lblablalbb alblalbal balbl ablabl albl abla lblablabl lablala vllalavlavllavlal l lval',
      ProjectId: 1,
      UserId: 3
    },
    {
      body:'blabl abalal ablablalba bbalba lblablalbb alblalbal balbl ablabl albl abla lblablabl lablala vllalavlavllavlal l lval',
      ProjectId: 1,
      UserId: 1
    },
    {
      body:'blabl abalal ablablalba bbalba lblablalbb alblalbal balbl ablabl albl abla lblablabl lablala vllalavlavllavlal l lval',
      ProjectId: 2,
      UserId: 1
    }
  ];

  Comments.forEach( comment =>{
    db.Comments.create(comment).then(regComment => {
      console.log(`Comment Created: ${regComment.description}`);
    })
  });
};

addAttachments = () => {
  let Attachments = [
    {
      description: 'file 1',
      url:'http://www.exemple.com',
      ProjectId: 1
    },{
      description: 'file 2',
      url:'http://www.exemple.com',
      ProjectId: 1
    },{
      description: 'file 3',
      url:'http://www.exemple.com',
      ProjectId: 1
    },{
      description: 'file 1',
      url:'http://www.exemple.com',
      ProjectId: 2
    },{
      description: 'file 2',
      url:'http://www.exemple.com',
      ProjectId: 2
    }
  ];

  Attachments.forEach( attachment =>{
    db.Attachments.create(attachment).then(regAttachment => {
      console.log(`Attachment Created: ${regAttachment.description}`);
    })
  });

};

//addUsers();
addProjects();
addProposals();
addComments();
addAttachments();