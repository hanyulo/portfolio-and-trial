import ExpressServer from './src/express/index';

const server = new ExpressServer();
const thePort = process.env.PORT || 8080;
server.setup();
server.run(thePort);
