const path = require('path');
const cwd = process.cwd();

/**
 * Are we in development mode?
 */
function isDev () {
  return process.env.NODE_ENV === 'development';
}

/**
 * Create webpack aliases
 */
function createWebpackAliases (aliases) {
  const result = {};
  for (const name in aliases) {
    result[name] = path.join(cwd, aliases[name]).replaceAll(path.sep, '/');
  }
  return result;
}

// Export helpers
module.exports = {
  isDev,
  createWebpackAliases,
};
