import cors from "cors";
import jsonServer from "json-server";

const server = jsonServer.create();
const router = jsonServer.router("src/data/db.json"); // Path to your JSON file
const middlewares = jsonServer.defaults();

// Enable CORS with allow-all origins
server.use(
  cors({
    origin: "*", // Allow all origins
  })
);

server.use(middlewares);
server.use(router);

const PORT = 8001;
const HOST = "0.0.0.0";

server.listen(PORT, HOST, () => {
  console.log(`JSON Server is running at http://${HOST}:${PORT}`);
});
