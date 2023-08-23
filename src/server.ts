import mongoose from 'mongoose';
import app from './app';
import config from './config';

async function main() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
    console.log(`database is connected successfully`);
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(`problem facing on connecting database, ${err}`);
  }
}

main();
