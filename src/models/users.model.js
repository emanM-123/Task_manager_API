// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'users';
  const mongooseClient = app.get('mongooseClient');
  const schema = new mongooseClient.Schema({
    firstName: {type: String},
    lastName: {type: String},
    username: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      sparse: true,
    },
    email: { type: String, unique: true, lowercase: true , require:true},
    password: { type: String },
    phone: { 
      type: String,
      trim: true,
      unique: true,
      sparse: true,
    }
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
};
