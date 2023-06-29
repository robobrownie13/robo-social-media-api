// /api/thoughts
const { Thought, User } = require("../models");
// GET to get all thoughts
module.exports = {
  async getThoughts(req, res) {
    try {
    } catch (err) {}
  },

  // GET to get a single thought by its _id
  async getSingleThought(req, res) {
    try {
    } catch (err) {}
  },
  // POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
  async createThought(req, res) {
    try {
    } catch (err) {}
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
    } catch (err) {}
  },
  // DELETE to remove a thought by its _id
  async deleteThought(req, res) {
    try {
    } catch (err) {}
  },
  // /api/thoughts/:thoughtId/reactions

  // POST to create a reaction stored in a single thought's reactions array field
  async addReaction(req, res) {
    try {
    } catch (err) {}
  },
  // DELETE to pull and remove a reaction by the reaction's reactionId value
  async removeReaction(req, res) {
    try {
    } catch (err) {}
  },
};
