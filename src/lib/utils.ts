/**
 * Split a route path into an array of strings
 * @param thing - route path to split
 * @returns array of strings
 * @example
 * utils.split('/test/:id');
 */
const split = (thing: string | RegExp | any): string[] => {
  if (typeof thing === 'string') {
    return thing.split('/');
  } else if (thing.fast_slash) {
    return [''];
  } else if (thing instanceof RegExp) {
    const match = thing
      .toString()
      .replace('\\/?', '')
      .replace('(?=\\/|$)', '$')
      // eslint-disable-next-line no-useless-escape
      .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//);
    return match != null && match[1]
      ? match[1].replace(/\\(.)/g, '$1').split('/')
      : ['<complex:' + thing.toString() + '>'];
  } else {
    return [''];
  }
};

/**
 * Stringified object of all express api methods to be used for equality check if a route is an `all` middleware,
 * so it can be printed as one line with `ALL` as method instead of multiple lines including all individual methods
 */
const allMethods = JSON.stringify({
  acl: true,
  bind: true,
  checkout: true,
  connect: true,
  copy: true,
  delete: true,
  get: true,
  head: true,
  link: true,
  lock: true,
  'm-search': true,
  merge: true,
  mkactivity: true,
  mkcalendar: true,
  mkcol: true,
  move: true,
  notify: true,
  options: true,
  patch: true,
  post: true,
  propfind: true,
  proppatch: true,
  purge: true,
  put: true,
  rebind: true,
  report: true,
  search: true,
  source: true,
  subscribe: true,
  trace: true,
  unbind: true,
  unlink: true,
  unlock: true,
  unsubscribe: true,
});

export { allMethods, split };
