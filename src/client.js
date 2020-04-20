import '../static/global.css';
import { start } from '@sapper/app';
import { googleAnalytics } from './google-analytics.js';
import "highlight.js/styles/github.css";


start({ target: sapper });

if (process.env.TRACKING_ID) googleAnalytics(process.env.TRACKING_ID);