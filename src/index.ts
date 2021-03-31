import "reflect-metadata";
import dotenv from "dotenv";
import Express from "express";
import { createConnection } from "typeorm";
import cors from "cors";

// import routes
import defaultRoutes from "./routes/default";
import cloudRoutes from "./routes/cloud";

// initialize configuration
dotenv.config();

// port is now available to the Node.js runtime
// as if it were an environment variable
const port = process.env.SERVER_PORT;

// create connection using default connection in ormconfig
createConnection();

const App = Express();
App.use(Express.json());
App.use(cors());

// route handler for the default home page
App.get("/", (req, res) => {
    res.send("Unravel Backend Server V1.0.0");
});

// use routes
App.use("/", defaultRoutes);
App.use("/", cloudRoutes);
// start the Express server
App.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});
