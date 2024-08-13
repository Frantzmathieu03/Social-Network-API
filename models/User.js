 const {Schema, model}  = require("mongoose");

 const userSchema = new Schema({
    username: {
        type:String,
        required: true,
        unique: true,
        trim: true
    },

    email: {
        type:String,
        required: true,
        unique: true,
        email: {
            validator: function(v) {
              return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
          },
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  });
  
  // Virtual for friendCount
  userSchema.virtual('friendCount').get(function () {
    return this.friends.length;

  });

  const User = model('User', userSchema);


  module.exports = User