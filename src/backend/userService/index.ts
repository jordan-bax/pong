import server from "./server.js";

const app = new server;

app.init();
app.start(3001, '0.0.0.0');