import { Response, Request, ErrorRequestHandler, NextFunction } from 'express';

export const errorMiddleware: ErrorRequestHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log(err);
    return res.status(500).send({ errorMessage: err.message });
    next();
};
