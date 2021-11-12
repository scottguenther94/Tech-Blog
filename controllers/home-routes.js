// imports router from express
const router = require('express').Router();
// imports user, post, and comment models from models folder
const { Post, User, Comment } = require('../models');

// route to render homepage
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            attributes: [
                'id',
                'post_text',
                'title',
                'created_at',
            ],
            order: [['created_at', 'DESC']],
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        });

        const posts = postData.map(post => post.get({ plain: true }));

        res.render('homepage', {
            logged_in: req.session.logged_in,
            posts
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

// route to render login view
router.get('/login', (req, res) => {
    // If the user is already logged in, redirects the request to homepage
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

// route to render signup view
router.get('/signup', (req, res) => {
    // If the user is already logged in, redirects the request to homepage
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('signup');
});

// route to render post view of a specified post
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ],
        });

        const post = postData.get({ plain: true });

        res.render('post', {
            ...post,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;