const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const combineElementsMiddleware = (req, res, next) => {
  if (req.method === 'GET' && req.url === '/combined') {
    const db = router.db.getState();

    setTimeout(() => res.jsonp(db), 3000);
  } else {
    next();
  }
};

server.use(middlewares);
server.use(combineElementsMiddleware);
server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running');
});