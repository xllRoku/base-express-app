import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Container, interfaces } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';

//TODO: class to configure enviroments

enum MorganMode {
    DEV = 'dev',
    COMMON = 'common',
    TINY = 'tiny',
    SHORT = 'short',
    COMBINED = 'combined',
}

interface AppOptions {
    containerOpts: interfaces.ContainerOptions;
    morgan: {
        mode: MorganMode;
    };
}

abstract class Application {
    protected readonly container: Container;

    constructor(options: AppOptions) {
        this.container = new Container(options.containerOpts);

        this.configureServices(this.container);
        this.setup(options);
    }

    abstract configureServices(container: Container): void;
    abstract setup(options: AppOptions): Promise<void> | void;
}

class Booststrap extends Application {
    constructor() {
        super({
            containerOpts: {
                defaultScope: 'Singleton',
            },
            morgan: {
                mode: MorganMode.DEV,
            },
        });
    }

    configureServices(container: Container): void {}

    async setup(options: AppOptions) {
        const server = new InversifyExpressServer(this.container);

        server.setConfig((app) => {
            app.use(express.json());
            app.use(morgan(options.morgan.mode));
            app.use(express.urlencoded({ extended: true }));
            app.use(cors());
        });

        const app = server.build();

        app.listen(process.env.PORT, () => {
            console.log(
                `server is running on http://localhost:${process.env.PORT}/subscribers`
            );
        });
    }
}
