const mongoose = require('mongoose');
const db = 'mongodb+srv://Hanin:Ha23453456@cluster1-xpgru.mongodb.net/MovieDB?retryWrites=true&w=majorit';


mongoose.connect(db, //process.env.MONGODB_URI ||
  { useNewUrlParser: true }
  ) 
    .then(() => {
      console.log('DATABASE CONNECTED');
  })
  
  .catch(error => {
    console.log('MONGOOSE ERROR: ', error);
  });

  //Schema
  const movSchema = new mongoose.Schema({
  
    title: {type: String},
    lang: {type: String},
    rated: {type: String},
    time: {type: String},
    genre: {type: String},
    act: {type: String},
    plot: {type: String},
    post: {type: String},
    
    }
  ); 

  const Muvi = mongoose.model('MovieDB', movSchema, 'Datas');
  module.exports = Muvi;
