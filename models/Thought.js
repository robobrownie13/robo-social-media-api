const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: function (value) {
        return value.toDateString();
      },
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

//Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema.virtual("reactionsCount").get(function () {
  return this.reactions.length;
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
