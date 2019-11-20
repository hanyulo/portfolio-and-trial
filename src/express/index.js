import express from 'express';
import path from 'path';
import serverRenderer from './middlewares/serverRenderer';

class ExpressServer {
  constructor() {
    this.app = express();
  }

  _setStatic() {
    this.app.use(express.static(path.resolve(__dirname)));
  }

  _applyServerRenderer() {
    this.app.use(serverRenderer);
  }

  setup() {
    this._setStatic();
    this._applyServerRenderer();
  }

  run(port) {
    this.app.listen(port, () => {
      console.log(`the sever is running on port: ${port}`);
    });
  }
}

export default ExpressServer;

/*
server-side rendering
https://alligator.io/react/react-router-ssr/
https://reacttraining.com/react-router/web/guides/server-rendering
https://reactjs.org/docs/react-dom-server.html
https://reactjs.org/docs/react-dom.html#hydrate
https://github.com/twreporter/twreporter-react/blob/master/src/express/server.js
https://github.com/manuelbieh/react-ssr-setup/blob/master/src/server/middleware/serverRenderer.tsx
https://medium.com/@binyamin/creating-a-node-express-webpack-app-with-dev-and-prod-builds-a4962ce51334
*/
