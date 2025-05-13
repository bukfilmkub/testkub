const mysql = require('./config/mysql');
const createApp = require('./config/express');

const port = 8000;

mysql.db((db) => {
    if (db.status) {
        const app = createApp();
        app.listen(port, () => {
            console.log('Kbank API running at port ' + port);
        });
        module.exports = app;
    } else {
        console.error('Kbank API failed to start: Database connection error.');
    }
});
