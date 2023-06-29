//username string unique require trimmed
//email string required unique must match a valid email address using mongoose's validation
//thoughts array of _id values referrencing the Thought model
//friends array of _id values referrencing the User model
//Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
const { Schema, model } = require("mongoose");
const thoughtSchema = require("./Thought");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trimmed: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[\w\.-]+@[a-zA-Z0-9\.-]+\.[a-zA-Z]{2,}$/,
        "Must input a valid email address",
      ],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("user", userSchema);

module.exports = User;
