const auth = require('./auth.route');
const routes = (app) => {
    app.use('/auth', auth);
};

module.exports = routes;
