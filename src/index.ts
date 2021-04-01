import "reflect-metadata";
import dotenv from "dotenv";
import Express from "express";
import { createConnection, getConnectionOptions, ConnectionOptions } from "typeorm";
import cors from "cors";

// import routes
import defaultRoutes from "./routes/default";
import cloudRoutes from "./routes/cloud";

// initialize configuration
dotenv.config();

// port is now available to the Node.js runtime
// as if it were an environment variable
const port = process.env.PORT;

const getOptions = async () => {
    let connectionOptions: ConnectionOptions;
    connectionOptions = {
        type: 'postgres',
        synchronize: false,
        logging: false,
        extra: {
            ssl: true,
        },
        entities: ['dist/entity/*.*'],
        migrationsTableName: "UnravelMigrations",
        migrations: ["dist/migration/*.js"],
        subscribers: ["dist/subscribers/*.js"],
        cli: {
            entitiesDir: "src/entity",
            migrationsDir: "src/migration",
            subscribersDir: "src/subscriber"
        }
    };
    if (process.env.DATABASE_URL) {
        Object.assign(connectionOptions, { url: process.env.DATABASE_URL });
    } else {
        // gets your default configuration
        // you could get a specific config by name getConnectionOptions('production')
        // or getConnectionOptions(process.env.NODE_ENV)
        connectionOptions = await getConnectionOptions();
    }

    return connectionOptions;
};

const connect2Database = async (): Promise<void> => {
    const typeormconfig = await getOptions();
    const connection = await createConnection(typeormconfig);
    await connection.runMigrations();
};

connect2Database().then(async () => {
    console.log('Connected to database');
});

// create connection using default connection in ormconfig
// createConnection();

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
