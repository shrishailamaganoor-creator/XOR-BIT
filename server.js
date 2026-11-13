const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = process.env.PORT || 3000;
const ROOT_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.css': 'text/css; charset=utf-8',
  '.ico': 'image/x-icon',
  '.wasm': 'application/wasm'
};

function getNetworkIp() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

const server = http.createServer((req, res) => {
  // Normalize URL path
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  let filePath = path.join(ROOT_DIR, reqPath);

  // If path doesn't exist directly, check XOR-BIT subfolder or fallback to index.html
  if (!fs.existsSync(filePath)) {
    const subPath = path.join(ROOT_DIR, 'XOR-BIT', reqPath);
    if (fs.existsSync(subPath)) {
      filePath = subPath;
    } else {
      filePath = path.join(ROOT_DIR, 'index.html');
    }
  }

  // If pointing to directory, serve index.html
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('File not found: ' + reqPath);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Allow CORS and caching for PWA
    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=86400'
    });
    res.end(data);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  const localIp = getNetworkIp();
  console.log('\n======================================================');
  console.log('⚡ XOR Bit — Personal Life & Engineering OS Server');
  console.log('======================================================\n');
  console.log(`💻 On your Laptop (Browser):`);
  console.log(`   👉 http://localhost:${PORT}\n`);
  console.log(`📱 On your Phone (Same Wi-Fi network):`);
  console.log(`   👉 http://${localIp}:${PORT}\n`);
  console.log(`💡 PWA Installation Tip:`);
  console.log(`   • Phone: Open link in Chrome/Safari -> tap "Install" or "Add to Home Screen"`);
  console.log(`   • Laptop: Open link in Chrome/Edge -> click the Install icon (💻) in address bar`);
  console.log('\n======================================================\n');
});
