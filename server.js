const app = require("./src/app");
const { clearCheckOverload } = require("./src/helper/check.connect");
const { app: { port } } = require("./src/configs/config.mongodb");

const PORT = port || 3055;

const server = app.listen(PORT, () => {
  console.log(`SERVER eCommerce START WITH PORT ${PORT}`);
});

process.on("SIGINT", () => {
  server.close(() => console.log(`SERVER STOP WITH PORT ${PORT}`))
  clearCheckOverload();
})