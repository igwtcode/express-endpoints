# express-endpoints

easy way to extract and print list of express app rest api endpoints

## Installation

```bash
npm install @igwtcode/express-endpoints
```

> install express (if it's not already installed)
>
> ```bash
> npm install express
> npm install -D @types/express # for typescript
> ```

## Usage

### javascript

#### import

##### module

<details>
<summary><code>package.json</code></summary>

```json
{
  "type": "module",
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}
```

</details>

```javascript
import express, { Router } from 'express';
import { ExpressEndpoints } from '@igwtcode/express-endpoints';

const app = express();
const router = Router();
```

##### commonjs

<details>
<summary><code>package.json</code></summary>

```json
{
  "type": "commonjs",
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}
```

</details>

```javascript
const express = require('express');
const { ExpressEndpoints } = require('@igwtcode/express-endpoints');

const app = express();
const router = express.Router();
```

#### example

```javascript
router.get('/single', (req, res) => res.send(`${req.method} ${req.path}`));
router.post('', (req, res) => res.send(`${req.method} ${req.path}`));
router.put('/:id', (req, res) => res.send(`${req.method} ${req.path} ${req.params.id}`));
router.delete('/:id', (req, res) => res.send(`${req.method} ${req.path} ${req.params.id}`));

app.use('/tags', router);

app.get('/testGet', (req, res) => res.send(`${req.method} ${req.path}`));
app.post('/testPost', (req, res) => res.send(`${req.method} ${req.path}`));

app.use((err, req, res, next) => res.status(500).send('error'));

app.all('*', (req, res, next) => res.sendStatus(404));

const endpoints = new ExpressEndpoints(app); // app is an instance of express or Application

console.log('*** with default options');
endpoints.print();

console.log('\n*** with color and custom prefix');
endpoints.print({ color: true, prefix: 'My-Api' });

console.log('\n*** colorized and short');
endpoints.print({ color: true, short: true });

console.log('\n*** items list', endpoints.items);

app.listen(3000, () => console.log('\nlistening on port 3000'));
```

### typescript

#### import

##### module

<details>
<summary><code>package.json</code></summary>

```json
{
  "type": "module",
  "scripts": {
    "start": "ts-node-esm app.ts"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "@types/express": "^4.17.16",
    "@types/node": "^18.11.18",
    "ts-node": "^10.9.1",
    "typescript": "^4.9.5"
  }
}
```

</details>

<details>
<summary><code>tsconfig.json</code></summary>

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "Node16",
    "moduleResolution": "node16",
    "esModuleInterop": true
  }
}
```

</details>

##### commonjs

<details>
<summary><code>package.json</code></summary>

```json
{
  "type": "commonjs",
  "scripts": {
    "start": "ts-node app.ts"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "@types/express": "^4.17.16",
    "@types/node": "^18.11.18",
    "ts-node": "^10.9.1",
    "typescript": "^4.9.5"
  }
}
```

</details>

<details>
<summary><code>tsconfig.json</code></summary>

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "CommonJS",
    "moduleResolution": "node",
    "esModuleInterop": true
  }
}
```

</details>

```typescript
import express, { Request, Response, Router, NextFunction } from 'express';
import { ExpressEndpoints } from '@igwtcode/express-endpoints';

const app = express();
const router = Router();
```

#### example

```typescript
router.get('/single', (req: Request, res: Response) => res.send(`${req.method} ${req.path}`));
router.post('', (req: Request, res: Response) => res.send(`${req.method} ${req.path}`));
router.put('/:id', (req: Request, res: Response) => res.send(`${req.method} ${req.path} ${req.params.id}`));
router.delete('/:id', (req: Request, res: Response) => res.send(`${req.method} ${req.path} ${req.params.id}`));

app.use('/tags', router);

app.get('/testGet', (req: Request, res: Response) => res.send(`${req.method} ${req.path}`));
app.post('/testPost', (req: Request, res: Response) => res.send(`${req.method} ${req.path}`));

app.use((err: any, req: Request, res: Response, next: NextFunction) => res.status(500).send('error'));

app.all('*', (req: Request, res: Response, next: NextFunction) => res.sendStatus(404));
const endpoints = new ExpressEndpoints(app); // app is an instance of express or Application

console.log('*** with default options');
endpoints.print();

console.log('\n*** with color and custom prefix');
endpoints.print({ color: true, prefix: 'My-Api' });

console.log('\n*** colorized and short');
endpoints.print({ color: true, short: true });

console.log('\n*** items list', endpoints.items);

app.listen(3000, () => console.log('\nlistening on port 3000'));
```

## Sample Output

![output-snapshot-01](https://github.com/igwtcode/express-endpoints/blob/main/docs/output-snapshot-01.png)

## Keywords

node, nodejs, node.js, express, expressjs, express.js, rest api, list, endpoint, ExpressEndpoints, express-endpoints,
router, middleware, typescript, javascript, github, npm, package

## License

MIT License ([see license](https://github.com/igwtcode/express-endpoints/blob/main/LICENSE))
