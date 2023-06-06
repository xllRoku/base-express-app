import { startApp } from './app';
import connectDb from './connect-db';

const port = process.env.PORT || 3000;

const bootstrap = async () => {
    const app = startApp();

    try {
        await connectDb();

        console.log('Conexión con la BBDD realizada');
        app.listen(port, () =>
            console.log(`Listen to: http://localhost:${port}`)
        );
    } catch (err) {
        console.error(err);
    }
};

bootstrap();
