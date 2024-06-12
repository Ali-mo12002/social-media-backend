const Thought = require('../models/Thought');
const User = require('../models/User');

const getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getSpecificThought = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createNewThought = async (req, res) => {
    try {
      const { thoughtText, username, userId } = req.body;
  
      if (!thoughtText || !username || !userId) {
        return res.status(400).json({ message: 'Thought text, username, and userId are required' });
      }
  
      const newThought = await Thought.create({ thoughtText, username });
  
      const user = await User.findByIdAndUpdate(
        userId,
        { $push: { thoughts: newThought._id } },
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(201).json(newThought);
    } catch (err) {
      res.status(500).json(err);
    }
  };

const updateThought = async (req, res) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
    if (!updatedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json(updatedThought);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteThought = async (req, res) => {
  try {
    const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!deletedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    await User.findByIdAndUpdate(deletedThought.userId, { $pull: { thoughts: req.params.thoughtId } });
    res.json({ message: 'Thought deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
};

const addNewReaction = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    thought.reactions.push(req.body);
    await thought.save();
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

const removeThoughtReaction = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    thought.reactions.pull(req.params.reactionId);
    await thought.save();
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { getAllThoughts, getSpecificThought, createNewThought, updateThought, deleteThought, addNewReaction, removeThoughtReaction };
