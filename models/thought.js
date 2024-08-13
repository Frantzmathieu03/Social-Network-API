const { Schema, model } = require('mongoose');
const ReactionSchema = require('./reaction'); 

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAt) => new Date(createdAt).toLocaleDateString(),
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [ReactionSchema],
});


thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});


const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
