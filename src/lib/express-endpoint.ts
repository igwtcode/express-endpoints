import type { Endpoint, EndpointType, PrintProps } from '@lib/interface.js';
import { allMethods, split } from '@lib/utils.js';
import chalk from 'chalk';
import type { Application, Express } from 'express';

export class ExpressEndpoints {
  /**
   * List of all endpoints
   * @example
   * const endpoints = new ExpressEndpoints(app);
   * console.log(endpoints.items);
   */
  public items: Endpoint[] = [];

  /**
   * ExpressEndpoints class constructor to extract all endpoints from an express app
   *
   * **NOTE:** create express app and add all routes before creating an instance of ExpressEndpoints
   *
   * @param app - express or Application instance
   * @see {@link https://github.com/igwtcode/express-endpoints#readme more examples and usage guide}
   * @example
   * ```ts
   * import express, { Router } from 'express';
   * // or const express = require('express');
   * import { ExpressEndpoints } from '@igwtcode/express-endpoints';
   * // or const { ExpressEndpoints } = require('@igwtcode/express-endpoints');
   *
   * const app = express();
   * const router = Router();
   * // or const router = express.Router();
   *
   * router.get('/single', (req, res) => res.send(`${req.method} ${req.path}`));
   * router.post('', (req, res) => res.send(`${req.method} ${req.path}`));
   * router.put('/:id', (req, res) => res.send(`${req.method} ${req.path} ${req.params.id}`));
   * router.delete('/:id', (req, res) => res.send(`${req.method} ${req.path} ${req.params.id}`));
   *
   * app.use('/tags', router);
   *
   * app.get('/testGet', (req, res) => res.send(`${req.method} ${req.path}`));
   * app.post('/testPost', (req, res) => res.send(`${req.method} ${req.path}`));
   *
   * app.use((err, req, res, next) => res.status(500).send('error'));
   *
   * app.all('*', (req, res, next) => res.sendStatus(404));
   *
   * const endpoints = new ExpressEndpoints(app); // app is an instance of express or Application
   *
   * console.log('*** with default options');
   * endpoints.print();
   *
   * console.log('\n*** with color and custom prefix');
   * endpoints.print({ color: true, prefix: 'My-Api' });
   *
   * console.log('\n*** colorized and short');
   * endpoints.print({ color: true, short: true });
   *
   * console.log('\n*** items list', endpoints.items);
   *
   * app.listen(3000, () => console.log('listening on port 3000'));
   * ```
   */
  constructor(app: Application | Express) {
    this.init(app);
  }

  /**
   * Initialize the ExpressEndpoints class by extracting all endpoints from the express app and adding them to the items array
   * @param app - express or Application instance
   * @returns void
   */
  private init = (app: Application | Express): void => {
    if (!(app._router && app._router.stack && Array.isArray(app._router.stack))) return;

    for (const layer of app._router.stack) {
      try {
        if (layer.name === 'router' && layer.handle && layer.handle.stack && Array.isArray(layer.handle.stack)) {
          for (const stack of layer.handle.stack) {
            if (!(stack && stack.route && stack.route.methods && typeof stack.route.methods === 'object')) continue;
            Object.keys(stack.route.methods).forEach((method) => {
              this.addItem('router', method, split(layer.regexp), stack.route.path);
            });
          }
        } else if (layer.route && layer.route.methods && typeof layer.route.methods === 'object') {
          if (JSON.stringify(layer.route.methods) === allMethods) {
            this.addItem('middleware', 'all', [], layer.route.path);
          } else {
            Object.keys(layer.route.methods).forEach((method) => {
              this.addItem('middleware', method, [], layer.route.path);
            });
          }
        }
      } catch (err) {
        console.error(chalk.red('Error while getting endpoints from express app'), err);
      }
    }
  };

  /**
   * Add an endpoint to the list of endpoints (`items`)
   * @param type - (`middleware` or `router`)
   * @param method - HTTP method (GET, POST, ..., ALL)
   * @param basePath - Base path of the endpoint (e.g. `/tags`)
   * @param route - Route of the endpoint (e.g. `/single`)
   * @returns {void}
   */
  private addItem = (type: EndpointType, method: string, basePath: string | string[], route: string): void => {
    const bp = Array.isArray(basePath) ? basePath : [basePath];
    this.items.push({
      type,
      method: method.toUpperCase(),
      route: bp.join('/') + (route.startsWith('/') ? route : route.length ? `/${route}` : '') || '/',
    });
  };

  /**
   * Get message to print in the console
   * @param endpoint - Endpoint object to print
   * @param props - options (prefix, short, color) to customize the message
   * @returns {string} - message to print in the console
   */
  private getMessage = (endpoint: Endpoint, props?: PrintProps): string => {
    const p1 = !props?.short ? (props?.prefix || '[ENDPOINT]') + ' '.repeat(3) : '';
    const p2 = !props?.short ? endpoint.type.padEnd(15) : '';
    const p3 = endpoint.method.padEnd(12);
    const p4 = endpoint.route;
    return props?.color ? chalk.green(p1) + chalk.cyan(p2) + chalk.blue(p3) + chalk.blueBright(p4) : p1 + p2 + p3 + p4;
  };

  /**
   * Print all endpoints in the console with the specified properties
   * or the default values if no properties are specified
   * @param props - options (prefix, short, color) to customize the message
   * @returns {void}
   * @example
   * const endpoints = new ExpressEndpoints(app);
   * endpoints.print(); // using default values `{ prefix: '[ENDPOINT]', color: false, short: false }`
   * endpoints.print({ color: true });
   * endpoints.print({ color: true, short: true });
   * endpoints.print({ prefix: '[MyApp]' });
   * endpoints.print({ prefix: 'My Api', color: true });
   */
  print = (props?: PrintProps): void => {
    if (this.items.length === 0) return;
    this.items.forEach((endpoint: Endpoint) => {
      console.log(this.getMessage(endpoint, props));
    });
  };
}
