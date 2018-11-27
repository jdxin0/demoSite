var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: '20181126'
});
pool.getConnection(function (err, connection) {
    if (err) throw err; // not connected!

    // Use the connection
    connection.query('select * from user_table', function (err, results) {
        if (err) {
            console.log(err);
        } else {
            console.log(JSON.parse(JSON.stringify(results)));
        }
        connection.release();
    });
});
