const User = require('../models/User');
const Thought = require('../models/Thought');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('thoughts').populate('friends');
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getSpecificUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('thoughts').populate('friends');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createNewUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await Thought.deleteMany({ _id: { $in: user.thoughts } });
    await user.remove();
    res.json({ message: 'User and associated thoughts deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
};

const addNewFriend = async (req, res) => {
    try {
      const userId = req.params.userId;
      const friendId = req.params.friendId;
      const user = await User.findOne({_id: userId});
      const friend = await User.findOne({_id: friendId})
      if(!user || !friend ){
        res.status(404).json("user or friend not found")
      }
     await User.findByIdAndUpdate(userId, {$push: {friends: friendId}});
     await User.findByIdAndUpdate(friendId, {$push: {friends: userId}});
     res.status(200).json("friend created")
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  };

const removeFriend = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.friends.pull(req.params.friendId);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { getAllUsers, getSpecificUser, createNewUser, updateUser, deleteUser, addNewFriend, removeFriend };