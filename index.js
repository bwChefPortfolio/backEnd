require("dotenv").config();

const server = require('./api/server.js');

const port = process.env.PORT || 5004;
const environment = process.env.DB_CONNECT || "development";

server.listen(port, () => console.log(` Server running on port ${port} in ${environment}`));
