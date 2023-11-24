const mongoose = require('mongoose');
(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            autoIndex: false,
            serverSelectionTimeoutMS: 4000,
            socketTimeoutMS: 45000,
        });
        console.log('Connected MongoDB successfully!!');
    } catch (error) {
        console.log('Message error: ' + error.message);
        console.log('Connected MongoDB failed!!');
        process.exit(0);
    }
})();
process.on('SIGINT', async () => {
    console.log('You are performing a server shutdown!');
    await mongoose.connection.close();
    process.exit(0);
});
