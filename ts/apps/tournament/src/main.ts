/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { app } from './app';
import { initMongo } from './config/mongo';

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
initMongo();
server.on('error', console.error);
