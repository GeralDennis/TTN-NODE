const MongoClient = require('mongodb').MongoClient;

let database = null;

async function attachDatabase() {
  const connection = await MongoClient.connect("18.216.251.166:27017");
  database = connection.db(mern);
}

async function getDatabase() {
  if (!database) await attachDatabase();
  console.log('db connected');
  return database;
}

async function insertDocument(data) {
  const database = await getDatabase();
  return await database.collection(members).insertOne(data), function (err, result) {
      if (err != null) {
          console.log("ERROR: " + err);
          throw err;
      }
      console.log(result);
  };
}

//return eventData array for most recent count of events, by device
async function getArray(device, count) {
  const database = await getDatabase();
  return await database.collection(members).find({
    device: device
  }).limit(parseInt(count)).sort({
    $natural: -1
  }).toArray();
}

module.exports = {
  insertDocument,
  getArray
};