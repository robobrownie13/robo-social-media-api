// /api/thoughts
const { Thought, User } = require("../models");

// GET to get all thoughts
module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET to get a single thought by its _id
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findone({ _id: req.params.thoughtId });
      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought with this ID found" });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneandUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({
          message: "New thought created, but found no user with this ID",
        });
      }
      res.json("Created new thought");
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // // example data
  // {
  //   "thoughtText": "Here's a cool thought...",
  //   "username": "lernantino",
  //   "userId": "5edff358a0fcb779aa7b118b"
  // }
  // PUT to update a thought by its _id
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneandUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought with this ID exists" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // POST to create a reaction stored in a single thought's reactions array field
  async addReaction(req, res) {
    try {
      const thought = await Thought.findOneandUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought with this ID exists" });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // DELETE to pull and remove a reaction by the reaction's reactionId value
  async removeReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought with this ID exists" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // DELETE to remove a thought by its _id
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneandRemove({
        _id: req.params.thoughtId,
      });
      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought with this ID exists" });
      }
      res.json({ message: "Thought successfully deleted" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
