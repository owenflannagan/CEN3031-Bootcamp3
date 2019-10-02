//This file holds any configuration variables we may need 
//'config.js' is ignored by git to protect sensitive information, such as your database's username and password
//copy this file's contents to another file 'config.js' and store your MongoLab uri there

module.exports = {
  db: {
    uri: 'mongodb+srv://user:test_pass@bootcamp2cluster-o4jkx.mongodb.net/test?retryWrites=true&w=majority'
  }, 
  openCage: {
    key: 'f4d0937a3a7f4989a410400d23330d93' //place your openCage public key here - Sign-up for a free key https://opencagedata.com/
  },
  port: 8080
};
