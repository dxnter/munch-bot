import dotenv from 'dotenv';
dotenv.config();

import munchClient from './structures/Client';
import wretch from 'wretch';

wretch().polyfills({
  fetch: require('node-fetch'),
});

console.clear();

const client = new munchClient();

try {
  client.init();
} catch (e) {
  console.error(e);
}
