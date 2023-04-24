import express from "express";
import { AppDataSource } from "./data-source";
import { usersRouter } from "./modules/users/users.routes";

// const cluster = require("cluster");
// const totalCPUs = require("os").cpus().length;

// if (cluster.isMaster) {
//   console.log(`Number of CPUs is ${totalCPUs}`);
//   console.log(`Master ${process.pid} is running`);

//   for (let i = 0; i < totalCPUs / 4; i++) {
//     cluster.fork();
//   }

//   cluster.on("exit", (worker, code, signal) => {
//     console.log(`worker ${worker.process.pid} died`);
//     console.log("Let's fork another worker!");
//     cluster.fork();
//   });
// } else {
//   console.log(`Worker ${process.pid} started`);

//   AppDataSource.initialize()
//     .then(async () => {
//       console.log("Database connection established");
//     })
//     .catch((error) => console.log(error));

//   const app = express();
//   app.use(express.json());

//   app.get("/", (_, res) => {
//     res.json({ message: "Hello World" });
//   });

//   app.use("/users", usersRouter);

//   app.listen(process.env.API_PORT || 3000, () => {
//     console.log("Server running on port 3000");
//   });
// }

AppDataSource.initialize()
  .then(async () => {
    console.log("Database connection established");
  })
  .catch((error) => console.log(error));

const app = express();
app.use(express.json());

app.get("/", (_, res) => {
  res.json({ message: "Hello World" });
});

app.use("/users", usersRouter);

app.listen(process.env.API_PORT || 3000, () => {
  console.log("Server running on port 3000");
});
