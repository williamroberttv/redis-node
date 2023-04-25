import express from "express";
import { AppDataSource } from "./database/data-source";
import { client } from "./database/redis/config";
import { usersRouter } from "./modules/V1/users/users.routes";
import { userMessageQueueConsume } from "./modules/V1/users/workers";

//Cluster mocks
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

//Redis connection
client.connect();

//Database connection
AppDataSource.initialize()
  .then(async () => {
    console.log("Database connection established");
  })
  .catch((error) => console.log(error));

// App configuration
export const app = express();

app.use(express.json());

//Routes
app.use(`/users`, usersRouter);

app.listen(process.env.API_PORT || 3000, () => {
  console.log(`Server running on port ${process.env.API_PORT || 3000}`);
});

//queues
userMessageQueueConsume();

// const apiV1Endpoint = "v1";
// const apiV2Endpoint = "v2";
// app.use(`${apiV1Endpoint}/users`, usersRouter);

// app.use(`${apiV2Endpoint}/users`, usersRouter);
// [GET] localhost:3000/api/v1/users
