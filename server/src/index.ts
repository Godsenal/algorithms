import Server from "./server";

const server = new Server();

server.start({ dbUrl: "mongodb://localhost/algorithms", port: 4000 });
