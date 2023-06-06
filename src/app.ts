import express, {
    json,
    urlencoded,
    Response as ExResponse,
    Request as ExRequest,
} from 'express';
import { config as dotenvConfig } from 'dotenv';
import { RegisterRoutes } from '../build/routes';
import swaggerUi from 'swagger-ui-express';

dotenvConfig();

const startApp = () => {
    const app = express();

    app.use(
        '/docs',
        swaggerUi.serve,
        async (_req: ExRequest, res: ExResponse) => {
            return res.send(
                swaggerUi.generateHTML(await import('../build/swagger.json'))
            );
        }
    );

    app.use(
        urlencoded({
            extended: true,
        })
    );
    app.use(json());

    RegisterRoutes(app);

    return app;
};

export { startApp };
