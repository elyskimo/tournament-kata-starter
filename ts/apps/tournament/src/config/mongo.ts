const mongoose = require('mongoose');
const DB_URL = process.env.MONGO_URI;

export const initMongo = async () => {
  const connect = async () => {
    mongoose.Promise = global.Promise;

    await mongoose.connect(
      DB_URL,
      {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err) => {
        let dbStatus = '';
        if (err) {
          dbStatus = `*    Error connecting to DB: ${err}`;
        }
        dbStatus = `*    DB Connection: OK`;
        if (process.env.NODE_ENV !== 'test') {
          console.log(dbStatus);
        }
      }
    );
    //mongoose.set('useCreateIndex', true);
    //mongoose.set('useFindAndModify', false);
  };
  await connect();

  mongoose.connection.on('error', console.log);
  mongoose.connection.on('disconnected', connect);

  require('../app/models/tournament');
  require('../app/models/participant');
};
