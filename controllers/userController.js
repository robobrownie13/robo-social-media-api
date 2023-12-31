const { User, Thought } = require("../models");

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // POST a new user:

  // // example data
  // {
  //   "username": "lernantino",
  //   "email": "lernantino@gmail.com"
  // }
  async createUser(req, res) {
    try {
      const userData = await User.create(req.body);
      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // PUT to update a user by its _id
  async updateUser(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        req.body,
        { new: true }
      );
      res.json(updatedUser);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // POST to add a new friend to a user's friend list
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: { _id: req.params.friendId } } }
      );
      console.log(user);
      res.json({ message: `${user.username} has made a new friend`, user });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // DELETE to remove a friend from a user's friend list

  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } }
      );
      res.json({
        message: `${user.username} removed a friend from friends list`,
        user,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Delete a user and associated apps
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });
      console.log(user);
      console.log(user.thoughts);
      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }
      console.log(user.thoughts);
      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      console.log(user.thoughts);
      res.json({
        message: `${user.username} and associated thoughts deleted!`,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
