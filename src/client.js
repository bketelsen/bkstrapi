import { start } from '@sapper/app';
import { googleAnalytics } from './google-analytics.js';


start({ target: sapper });

if (process.env.TRACKING_ID) googleAnalytics(process.env.TRACKING_ID);