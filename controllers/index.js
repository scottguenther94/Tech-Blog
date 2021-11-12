// imports router from express
const router = require('express').Router();
// imports api routes from api folder
const apiRoutes = require('./api');
// imports home and dashboard routes
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');

// defines the paths that api, home, and dashboard routes use
router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);

// route to display 404 error if user attempts to navigate to a route that doesn't exist
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;