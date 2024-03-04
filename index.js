const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const PUBLIC_DIR = 'todo';

const server = http.createServer((req, res) => {
  // Obtener la ruta del archivo solicitado
  let filePath = path.join(__dirname, PUBLIC_DIR, req.url === '/' ? 'index.html' : req.url);
  
  // Verificar si el archivo solicitado existe
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // Si el archivo no existe, responder con un error 404
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('404 Not Found');
      return;
    }

    // Leer el contenido del archivo
    fs.readFile(filePath, (err, data) => {
      if (err) {
        // Si hay un error al leer el archivo, responder con un error 500
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('500 Internal Server Error');
        return;
      }

      // Responder con el contenido del archivo
      res.writeHead(200);
      res.end(data);
    });
  });
});

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}/`);
});
