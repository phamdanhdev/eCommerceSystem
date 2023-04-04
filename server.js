const app = require("./src/app");

const PORT = 3055;

const server = app.listen(PORT, () => {
  console.log(`SERVER eCommerce START WITH PORT ${PORT}`);
});

process.on("SIGINT", () => {
    server.close(() => console.log(`SERVER STOP WITH PORT ${PORT}`))
})