var mongoose = require("mongoose");

// Get the Schema constructor
var Schema = mongoose.Schema;

// Using Schema constructor, create a ProductSchema
var UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  from: {
    type: String,
    required: true},

    to: {
        type: String,
        required: true},
    change:{
      type: String
    }
    
  },  {collection : 'data3'}
);

// Create model from the schema
var Data = mongoose.model("Data", UserSchema);

// Export model
module.exports = Data;