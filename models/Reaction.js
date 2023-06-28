// reactionId use Mongoose's ObjectId data type default value is set to a new ObjectId
// reactionBody string required 280 character maximumm
// username string required
// createdAt Date Set default value to the current timestamp Use a getter method to format the timestamp on query
// Schema Settings: This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.

const { Schema, Types } = require("mongoose");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: function (value) {
        return value.toDateString();
      },
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

module.exports = reactionSchema;
