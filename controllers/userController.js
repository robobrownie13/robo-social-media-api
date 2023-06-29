const { User, Thought } = require("../models/User");

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
      const user = await User.findOne({ _id: req.params.userId }).select(
        "-__v"
      );

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
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // PUT to update a user by its _id
  async updateUser(req, res) {
    try {
      const newUser = await Users.findOneAndUpdate(
        { _id: req.body.userId },
        req.body,
        { new: true }
      );
      res.json("You information was updated.");
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // POST to add a new friend to a user's friend list
  async addFriend(req, res) {
    try {
      const newFriend = await Users.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: { _id: req.params.friendId } } }
      );
      res.json("Congratulations! You made a new friend!");
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // DELETE to remove a friend from a user's friend list

  async removeFriend(req, res) {
    try {
      const deletedFriend = await Users.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } }
      );
      res.json("You have removed this person as a friend");
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Delete a user and associated apps
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: "User and associated thoughts deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
