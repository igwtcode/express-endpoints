/**
 * Type of the endpoint
 * @enum {string} `middleware` | `router`
 */
export type EndpointType = 'middleware' | 'router';

/**
 * Endpoint Interface
 * @example
 * ```js
 * {
 * type: 'middleware',
 * method: 'GET',
 * route: '/testMiddleware'
 * }
 *
 * {
 * type: 'router',
 * method: 'POST',
 * route: '/testRoute'
 * }
 * ```
 */
export interface Endpoint {
  /**
   * Type of the endpoint (`middleware` | `router`)
   * @type {EndpointType}
   */
  type: EndpointType;

  /**
   * HTTP method of the endpoint (can be `ALL` for all methods)
   * @type {string}
   * @example 'GET', 'POST', 'PUT', ..., 'ALL'
   */
  method: string;

  /**
   * Route path of the endpoint (can be a path with params)
   * @type {string}
   * @example '/test' , '/test/:id'
   */
  route: string;
}

/**
 * `ExpressEndpoints` `print` method options
 * @default
 * ```js
 * {
 * prefix: '[ENDPOINT]',
 * color: false,
 * short: false
 * }
 * ```
 * @example
 * ```js
 * {
 * prefix: 'My-Api',
 * color: true,
 * short: false
 * }
 * ```
 */
export interface PrintProps {
  /**
   * Prefix of the message to be printed in the console (only if `short` is false or not provided)
   * @type {string}
   * @default '[ENDPOINT]'
   * @example 'My-Api'
   */
  prefix?: string;

  /**
   * If true, the message will be printed in the console with colors
   * @type {boolean}
   * @default undefined (false)
   */
  color?: boolean;

  /**
   * If true, the message will be printed in the console without prefix and type
   * @type {boolean}
   * @default undefined (false)
   */
  short?: boolean;
}
