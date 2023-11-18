const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const rfs = require('rotating-file-stream');
const cors = require('cors');
const routes = require('./routes');
const {
    notFound,
    errorHandler,
} = require('./middlewares/handlerError.middleware');
const corsOptions = require('./middlewares/cors.middleware');
require('./configs/connectRedis');

const isProduction = process.env.NODE_ENV === 'production';
const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: path.join(__dirname, 'logs'),
});
const devLogStream = rfs.createStream('dev.log', {
    interval: '1d',
    path: path.join(__dirname, 'logs'),
});
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: false }));
app.use(helmet());
// app.use('/logs', express.static('./src/logs'));
app.use('/logs', express.static(__dirname + '/logs'));
app.use(
    isProduction
        ? morgan('combined', { stream: accessLogStream })
        : morgan('tiny', { stream: devLogStream }),
);
app.use(cors(corsOptions));
routes(app);
app.get('/', (req, res) => {
    return res.status(200).json({
        mesage: 'Welcome to the server',
    });
});
app.use(notFound);
app.use(errorHandler);
app.listen(port, () => {
    console.log(`Server listening http://localhost:${port}`);
});
