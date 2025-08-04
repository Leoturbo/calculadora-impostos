const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logFile = path.join(logDir, `app-${new Date().toISOString().split('T')[0]}.log`);

function log(level, message, data = {}) {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    level,
    message,
    data
  };
  
  const logMessage = JSON.stringify(logEntry) + '\n';
  
  // Escrever no arquivo
  fs.appendFileSync(logFile, logMessage);
  
  // Escrever no console para desenvolvimento
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[${level.toUpperCase()}] ${timestamp}: ${message}`, data);
  }
}

function logRequest(req, res, next) {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    log('info', 'Request completed', {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
      userAgent: req.get('User-Agent')
    });
  });
  
  next();
}

function logError(err, req, res, next) {
  log('error', 'Error occurred', {
    error: err.message,
    stack: err.stack,
    method: req.method,
    url: req.url,
    ip: req.ip
  });
  
  next(err);
}

module.exports = {
  log,
  logRequest,
  logError
};