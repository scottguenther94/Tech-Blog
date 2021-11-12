// imports router from express
const router = require('express').Router();

// imports user, post, and comment routes
const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');

// defines the paths that api routes use
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

// exports the router
module.exports = router;