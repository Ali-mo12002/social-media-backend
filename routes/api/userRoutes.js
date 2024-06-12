
const express = require('express');
const {
 getAllUsers,
 getSpecificUser,
 createNewUser,
 updateUser,
 deleteUser,
 addNewFriend,
 removeFriend,
} = require('../../controllers/userController');


const router = express.Router();


router.route('/')
 .get(getAllUsers)
 .post(createNewUser);


router.route('/:userId')
 .get(getSpecificUser)
 .put(updateUser)
 .delete(deleteUser);


router.route('/:userId/friends/:friendId')
 .post(addNewFriend)
 .delete(removeFriend);


module.exports = router;
