//FIXES FOR SERVICE WORKERS
const SITE_BASE_HREF = 'https://kubiiks.com';

/*
*
* Begin script
*
*/
if (false) {
const replace = require('replace-in-file');

const existingStateReplacements = {
    files: 'dist/browser/ngsw-worker.js',
    from: /this\.state = DriverReadyState\.EXISTING_CLIENTS_ONLY;/g,
    to: '/*this.state = DriverReadyState.EXISTING_CLIENTS_ONLY;*/ ' + 
        '// removing EXISTING_CLIENTS_ONLY state, as it behaves incorrectly in offline testing, both locally & on GitHub pages'
}

const baseHrefInstances = {
    files: 'dist/browser/ngsw.json',
    from: '"' + SITE_BASE_HREF + 'index.html",',
    to: '"' + SITE_BASE_HREF + 'index.html", ', // whitespace-only change indicates that the baseHref was found, so we should make the URL fix
};

const serviceWorkerURLFix = {
    files: 'dist/browser/ngsw-worker.js',
    from: /return parsed\.path;/g,
    to: '/*return parsed.path;*/ ' +
        'return url; ' +
        '// overriding default @angular/service-worker URL behavior, to handle routing bug angular/angular #21636'
}

try {
    const existingInstances = replace.sync(existingStateReplacements);
    console.log('Replacements of EXISTING_CLIENTS_ONLY states: ', existingInstances.join(', '));
}
catch(error) {
    console.error('Error occurred while replacing EXISTING_CLIENTS_ONLY states: ', error);    
}

try {
    const foundBaseHref = replace.sync(baseHrefInstances);
    if (foundBaseHref && foundBaseHref.length > 0) {
        try {
            const override = replace.sync(serviceWorkerURLFix);
            console.log('Changes made: ', override.join(', '))
        }
        catch (error) {
            console.error('Error occurred while overriding default service worker URL behavior: ', error)
        }
    }
    else {
        console.log('baseHref was not set; no URL matching changes needed', foundBaseHref);
    }
}
catch (error) {
    console.error('Error occurred while looking for baseHref: ', error);
}

}

//Prepares dist data for VPS transfer
// patches index.html with good address for favicon
// patches manifest for icons address
// copies local.js and package.json

const NAME = "kubiiks";
const SHORT_NAME = "kubiiks";
const DESCRIPTION = "Description de l'app";
const URL = "https://kubiiks.com";
const THEME_COLOR =  "#d4e157";
const BACKGROUND_COLOR = "#827717";

console.log("////////////////////////////////////////");
console.log("// GENERATING ./dist/vps_boundle")
console.log("// URL: " + URL);
console.log("////////////////////////////////////////");
console.log("Use FileZilla to upload this to /var/www/kiiweb on the VPS");
console.log('Settings:');

console.log('NAME             : ' + NAME);
console.log('SHORT_NAME       : ' + SHORT_NAME);
console.log('DESCRIPTION      : ' + DESCRIPTION);
console.log('URL              : ' + URL);
console.log('BACKGROUND COLOR : ' + BACKGROUND_COLOR);
console.log('FOREGROUND_COLOR : ' + THEME_COLOR);
console.log("////////////////////////////////////////");

const fs = require('fs-extra');


//Copy all the files
if (fs.existsSync('./dist/vps_boundle'))
    fs.removeSync('./dist/vps_boundle')
fs.mkdir('./dist/vps_boundle');
fs.mkdir('./dist/vps_boundle/dist');

fs.copySync('./dist/server', './dist/vps_boundle/dist/server');
fs.copySync('./dist/browser', './dist/vps_boundle/dist/browser');
fs.copyFileSync('./dist/prerender.js', './dist/vps_boundle/dist/prerender.js');
fs.copyFileSync('./dist/server.js', './dist/vps_boundle/dist/server.js');
fs.copyFileSync('./local.js','./dist/vps_boundle/local.js');
fs.copyFileSync('./package.json','./dist/vps_boundle/package.json');

//WARNING !!: index.html has a hash on the service worker so it cannot be modified !!!!
//Colors will need to be modified by hand if required at each project before running vps target !
//Find the name of the real server and replace on index.html and manifest
var index = fs.readFileSync('./dist/browser/index.html','utf8');
//index = index.replace(/https\:\/\/localhost\:4300/g, URL);
//index = index.replace(/<meta name="theme-color" content="#68cfd0"/,'<meta name="theme-color" content="'+ THEME_COLOR + '"');
//index = index.replace(/<meta name="msapplication-navbutton-color" content="#68cfd0"/, '<meta name="msapplication-navbutton-color" content="'+ THEME_COLOR + '"');
fs.removeSync('./dist/vps_boundle/dist/browser/index.html');
fs.writeFileSync('./dist/vps_boundle/dist/browser/index.html',index);



//Workout manifest
var manifest = fs.readFileSync('./dist/browser/manifest.webmanifest','utf8');
manifest = manifest.replace(/"name": "kiiweb"/, '"name": "'+NAME+'"');
manifest = manifest.replace(/"short_name": "kiiweb"/, '"short_name": "'+SHORT_NAME+'"');
manifest = manifest.replace(/"description": "kiiweb"/, '"description": "'+DESCRIPTION+'"');
manifest = manifest.replace(/"theme_color": "#1976d2"/,'"theme_color": "'+THEME_COLOR+'"');
manifest = manifest.replace(/"background_color": "#fafafa"/,'"background_color": "'+BACKGROUND_COLOR+'"');
manifest = manifest.replace(/https\:\/\/localhost\:4300/g, URL);

fs.removeSync('./dist/vps_boundle/dist/browser/manifest.webmanifest');
fs.writeFileSync('./dist/vps_boundle/dist/browser/manifest.webmanifest',manifest);

//fs.copyFileSync('local.js',)