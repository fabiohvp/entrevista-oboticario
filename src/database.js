const mongodb = require( "mongodb");
let connection = undefined;
let db = undefined;

async function connect(configuration) {
    let connectionString = "mongodb://";

    if (configuration.username) {
        connectionString += `${configuration.username}:${configuration.password}@`;
    }

    connectionString += `${configuration.host}:${configuration.port}`;

    connection = await mongodb.MongoClient.connect(connectionString, { useUnifiedTopology: true });
    db = await connection.db(configuration.collection);
    console.log("database connected");
}

module.exports = {
    connect,
    getConnection: () => connection,
    getDb: () => db
}
