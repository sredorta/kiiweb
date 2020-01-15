import 'zone.js/dist/zone-node';
import {enableProdMode} from '@angular/core';
// Express Engine
import {ngExpressEngine} from '@nguniversal/express-engine';
// Import module map for lazy loading
import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';

import * as express from 'express';
import {join} from 'path';
import { environment } from './src/environments/environment';
import {RESPONSE} from '@nguniversal/express-engine/tokens';

var minify = require('html-minifier-terser').minify;

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
export const app = express();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist/browser');

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('./dist/server/main');

//REQUIRED FOR HTTPS CALLS TO WORK ON SERVER SIDE
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';



// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

// Example Express Rest API endpoints
// app.get('/api/**', (req, res) => { });
// Serve static files from /browser
app.get('*.*', express.static(DIST_FOLDER, {
  maxAge: '1y'
}));

//Provide robots.txt, sidemap is provided by the server as is dynamic
app.route('/robots.txt')
  .get((req, res) => {
    res.sendFile(process.cwd() + '/robots.txt');
});



//For crawlers we patch the lang attribute of html depending on the route 
// If the route does not have language we use the header data
// All regular routes use the Universal engine
app.get('*', (req, res) => { 
  let lang = "";
  const url : string = <string>req.url;
  const found = url.match(/\/[a-z][a-z]\//g);
  if (found) {
    if (found[0])
      lang = found[0].replace(/\//gi, '');
      if (environment.languages.indexOf(lang)<0) {
        lang = environment.languages[0];
      }
  } else {
      lang = (req.acceptsLanguages(environment.languages) || environment.languages[0]) as string;
  }
  res.set('Content-Language', lang);
  //Patch lang before rendering the view
  res.render('index', {req, res, providers: [
    {
      provide: RESPONSE,
      useValue: res,
    },
  ]}, (error, html) => {
    html = html.replace(/< *html +lang="[a-z][a-z]" *>/, "<html lang=\"" + lang + "\">");
    //console.log("HTML =>>");
    //console.log(html.substr(0,200));
    //console.log("-----------METAS--------------------");
    //for (let line of html.split('\n')) {
    //  if (line.includes('meta ')) {
    //    for (let line2 of line.split('<meta')) {
    //      if (!line2.includes('*/'))
    //      console.log('<meta ' + line2);
    //    }
    //  }
    //}
    //console.log("-------------------------------");
    if (error) {
      res.statusCode = 404;
    }
    //Minify HTML output
    //res.send(html);
    res.send(minify(html, {
      removeAttributeQuotes: true,
      minifyCSS:true,
      minifyJS:true,
      removeComments:true,
      collapseWhitespace:true,
      conservativeCollapse:true,
      continueOnParseError:true
    }));
});
});


// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', { req });
});

