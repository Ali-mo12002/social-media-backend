
const express = require('express');
const {
 getAllThoughts,
 getSpecificThought,
 createNewThought,
 updateThought,
 deleteThought,
 addNewReaction,
 removeThoughtReaction,
} = require('../../controllers/thoughtController');


const router = express.Router();


router.route('/')
 .get(getAllThoughts)
 .post(createNewThought);


router.route('/:thoughtId')
 .get(getSpecificThought)
 .put(updateThought)
 .delete(deleteThought);


router.route('/:thoughtId/reactions')
 .post(addNewReaction);


router.route('/:thoughtId/reactions/:reactionId')
 .delete(removeThoughtReaction);


module.exports = router;



