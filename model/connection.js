var mongoose = require('mongoose');

var mongoDB = 'mongodb://localhost:27017/Chinmay';
mongoose.connect(mongoDB, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    });

var connection = mongoose.connection;

module.exports= connection 