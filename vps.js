//Prepares dist data for VPS transfer
// patches index.html with good address for favicon
// patches manifest for icons address
// copies local.js and package.json

const URL = "https://kubiiks.com";

console.log("////////////////////////////////////////");
console.log("// GENERATING ./dist/vps_boundle")
console.log("// URL: " + URL);
console.log("////////////////////////////////////////");
console.log("Use FileZilla to upload this to /var/www/kiiweb on the VPS");

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

//Find the name of the real server and replace on index.html and manifest
var index = fs.readFileSync('./dist/browser/index.html','utf8');
index = index.replace(/https\:\/\/localhost\:4300/g, URL);
fs.removeSync('./dist/vps_boundle/dist/browser/index.html');
fs.writeFileSync('./dist/vps_boundle/dist/browser/index.html',index);


var manifest = fs.readFileSync('./dist/browser/manifest.webmanifest','utf8');
manifest = manifest.replace(/https\:\/\/localhost\:4300/g, URL);
fs.removeSync('./dist/vps_boundle/dist/browser/manifest.webmanifest');
fs.writeFileSync('./dist/vps_boundle/dist/browser/manifest.webmanifest',manifest);

//fs.copyFileSync('local.js',)