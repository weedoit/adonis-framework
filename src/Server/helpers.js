'use strict'

/**
 * adonis-framework
 * Copyright(c) 2015-2016 Harminder Virk
 * MIT Licensed
*/

let helpers = exports = module.exports = {}

/**
 * returns an array of middleware concatenated with
 * the actual route handler.
 *
 * @param  {Object}         resolvedRoute
 * @param  {Object}         middleware
 * @param  {String}         appNamespace
 * @return {Array}
 *
 * @private
 */

helpers.makeMiddlewareChain = function (middleware, finalHandler, isGlobal, resolvedRoute) {
  if (isGlobal) {
    return middleware.resolve([], true).concat([{instance: null, method: finalHandler}])
  }
  const routeMiddleware = middleware.resolve(middleware.formatNamedMiddleware(resolvedRoute.middlewares), false)
  return routeMiddleware.concat([finalHandler])
}

/**
 * returns a string normalize with underscore
 *
 * @param  {String}         string
 * @return {String}
 *
 * @private
 */

helpers.slug = function (string) {
  return string.replace(/(.?)([A-Z])/gm, (m, a, b) => `${a}_${b}`)
    .replace(/^_/, "")
    .replace(/[^a-zA-Z0-9]/, '_')
    .toLowerCase();
};

helpers.parseControllerModule = function (handler) {
  let parts = handler.split('@');

  if (parts.length !== 2) {
    return handler;
  }

  parts[0] = `${this.slug(parts[0])}/Controllers`;
  return parts.join('/');
}