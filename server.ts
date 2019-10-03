import 'zone.js/dist/zone-node';
import {enableProdMode} from '@angular/core';
// Express Engine
import {ngExpressEngine} from '@nguniversal/express-engine';
// Import module map for lazy loading
import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';

import * as express from 'express';
import {join} from 'path';
import { environment } from './src/environments/environment';

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

//For crawlers we patch the lang attribute of html depending on the route 
// If the route does not have language we use the header data
// All regular routes use the Universal engine
app.get('*', (req, res) => { 
  console.log("PARSING URL : " + req.url);
  let lang = "";
  const url : string = <string>req.url;
  const found = url.match(/\/[a-z][a-z]\//g);
  if (found) {
    if (found[0])
      console.log("FOUND LANGUAGE: " + found[0]);
      lang = found[0].replace(/\//gi, '');
      if (environment.languages.indexOf(lang)<0) {
        lang = environment.languages[0];
      }
  } else {
      lang = (req.acceptsLanguages(environment.languages) || environment.languages[0]) as string;
  }
  console.log("SENDING LANG : " + lang);
  //Patch lang before rendering the view
  res.render('index', { req }, function(err,html:string) {
    html = html.replace(/< *html +lang="[a-z][a-z]" *>/g, "<html lang=\"" + lang + "\">");
    //THIS CODE NEEDS TO BE ONLY HERE FOR DEBUG !!!!
    console.log("HTML =>>");
    console.log(html.substr(0,200));
    console.log("-----------METAS--------------------");
    for (let line of html.split('\n')) {
      if (line.includes('meta ')) {
        for (let line2 of line.split('<meta')) {
          if (!line2.includes('*/'))
          console.log('<meta ' + line2);
        }
      }

    }
    console.log("-------------------------------");
    res.send(html)
  });
//  res.render('index', { req });
});


// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', { req });
});

