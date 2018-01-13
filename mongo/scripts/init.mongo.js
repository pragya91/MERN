db = new Mongo().getDB('issuetracker');

db.issues.remove({});

db.issues.insert([
  {
    status : 'Open',
    owner : 'Edd',
    created : new Date('2016-8-05'),
    effort : 4,
    completionDate : undefined,
    title : 'Error in console when clicking Add'
  },
  {
    status : 'Assigned',
    owner : 'Jordan',
    created : new Date('2016-8-15'),
    effort : 14,
    completionDate : new Date('2016-8-29'),
    title : 'Missing border bottom panel'
  }
]);

db.issues.createIndex({status:1});
db.issues.createIndex({owner:1});
db.issues.createIndex({created:1});
