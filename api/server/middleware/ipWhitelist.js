const removePorts = require('~/server/utils/removePorts');

const LOCALHOST_IPS = ['127.0.0.1', '::1', '::ffff:127.0.0.1'];

/**
 * Middleware to check if the client IP is in the whitelist.
 * If IP_WHITELIST is empty or not set, all IPs are allowed.
 * Localhost IPs are always allowed regardless of whitelist.
 */
const ipWhitelist = (req, res, next) => {
  const whitelistStr = process.env.IP_WHITELIST;

  // If no whitelist configured, allow all (feature disabled)
  if (!whitelistStr || whitelistStr.trim() === '') {
    return next();
  }

  const clientIp = removePorts(req);

  // Always allow localhost for development
  if (LOCALHOST_IPS.includes(clientIp)) {
    return next();
  }

  const whitelist = whitelistStr.split(',').map((ip) => ip.trim());

  if (whitelist.includes(clientIp)) {
    return next();
  }

  return res.status(403).json({
    message: 'IP_NOT_ALLOWED',
    ip: clientIp,
  });
};

module.exports = ipWhitelist;
