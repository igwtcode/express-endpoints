import { ExpressEndpoints } from '@lib/express-endpoint.js';
import { Endpoint } from '@lib/interface.js';
import express, { Router } from 'express';

describe('given app has no routes', () => {
  const app = express();
  const endpoints = new ExpressEndpoints(app);

  it('endpoints should be defined and have correct type', () => {
    expect(endpoints).not.toBeUndefined();
    expect(endpoints).not.toBeNull();
    expect(endpoints).toBeInstanceOf(ExpressEndpoints);
    expect(endpoints).toEqual(expect.any(ExpressEndpoints));
  });

  it('items array should exist and have correct type', () => {
    expect(endpoints).toHaveProperty('items');
    expect(endpoints.items).not.toBeUndefined();
    expect(endpoints.items).not.toBeNull();
    expect(Array.isArray(endpoints.items)).toBeTruthy();
  });

  it('print function should exist, have correct type', () => {
    expect(endpoints).toHaveProperty('print');
    expect(endpoints.print).not.toBeUndefined();
    expect(endpoints.print).not.toBeNull();
    expect(endpoints.print).toEqual(expect.any(Function));
  });

  it('endpoint items should return empty list', () => {
    expect(endpoints.items).toHaveLength(0);
  });
});

describe('given app has 1 middleware route', () => {
  const expectedEndpoint0: Endpoint = {
    method: 'GET',
    type: 'middleware',
    route: '/testMiddlewareRoute',
  };
  const app = express();
  const mockRouteFn = jest.fn();
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const logSpy = jest.spyOn(global.console, 'log').mockImplementation(() => {});

  app.get(expectedEndpoint0.route, mockRouteFn);
  const endpoints = new ExpressEndpoints(app);
  const endpoint0 = endpoints.items.at(0);

  it('print function should output correctly', () => {
    const prefix = 'app';
    const msg0 =
      prefix +
      ' '.repeat(3) +
      expectedEndpoint0.type.padEnd(15) +
      expectedEndpoint0.method.padEnd(12) +
      expectedEndpoint0.route;
    const msg1 = expectedEndpoint0.method.padEnd(12) + expectedEndpoint0.route;

    endpoints.print({ prefix });
    endpoints.print({ color: true });
    endpoints.print({ color: false, prefix, short: true });

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledTimes(3);
    expect(logSpy).toHaveBeenCalledWith(msg0);
    expect(logSpy).toHaveBeenCalledWith(msg1);

    logSpy.mockRestore();
    logSpy.mockClear();
  });

  it('items should return list with 1 item(endpoint)', () => {
    expect(endpoints.items).toHaveLength(1);
    expect(endpoint0).not.toBeUndefined();
    expect(endpoint0).not.toBeNull();
    expect(endpoint0).toMatchObject<Endpoint>(expectedEndpoint0);
    expect(endpoint0).toHaveProperty('method', expectedEndpoint0.method);
    expect(endpoint0).toHaveProperty('type', expectedEndpoint0.type);
    expect(endpoint0).toHaveProperty('route', expectedEndpoint0.route);
  });
});

describe('given app has multiple middleware routes and multiple router routes', () => {
  const baseRoute = '/test';
  const routerRoute = '/routerRoute';
  const expectedEndpoints: Endpoint[] = [
    {
      method: 'POST',
      type: 'middleware',
      route: '/^test*$',
    },
    {
      method: 'DELETE',
      type: 'router',
      route: `${baseRoute}${routerRoute}`,
    },
    {
      method: 'GET',
      type: 'router',
      route: `${baseRoute}/:id`,
    },
    {
      method: 'GET',
      type: 'middleware',
      route: `/`,
    },
    {
      method: 'PUT',
      type: 'middleware',
      route: `/:id`,
    },
    {
      method: 'ALL',
      type: 'middleware',
      route: `/*`,
    },
  ];
  const app = express();
  const router = Router();
  const mockRouteFn = jest.fn();
  const endpoint0 = expectedEndpoints[0];
  app.post(endpoint0.route, mockRouteFn);
  router.delete(routerRoute, mockRouteFn);
  router.get(':id', mockRouteFn);
  app.use(baseRoute, router);
  app.get('', mockRouteFn);
  app.put('/:id', mockRouteFn);
  app.all('*', mockRouteFn);
  const endpoints = new ExpressEndpoints(app);

  it('items should return list with 3 items(endpoints)', () => {
    expect(endpoints.items).toHaveLength(expectedEndpoints.length);
    endpoints.items.forEach((endpoint) => {
      expect(endpoint).not.toBeNull();
      expect(endpoint).not.toBeUndefined();
    });
  });

  it('items should have correct endpoint info', () => {
    for (let i = 0; i < endpoints.items.length; i++) {
      const endpoint = expectedEndpoints[i];
      expect(endpoints.items[i]).toMatchObject<Endpoint>(endpoint);
      expect(endpoints.items[i]).toHaveProperty('method', endpoint.method);
      expect(endpoints.items[i]).toHaveProperty('type', endpoint.type);
      expect(endpoints.items[i]).toHaveProperty('route', endpoint.route);
    }
  });
});
