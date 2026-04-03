import express from 'express';

const route = express.Router();

import { getSetting } from '../controllers/setting-controller.js';

route.get('/get-setting', getSetting);

export default route;