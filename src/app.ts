import "express-async-errors";
import cors from "cors";
import express, { Request, Response, NextFunction } from 'express';
import 'reflect-metadata';
require('dotenv/config');
import './injecaoDependencia';
import { router } from './routes';

import swaggerUi from 'swagger-ui-express';

import documentacao from './swagger.json';
import { Errors } from './errors/Errors';

const app = express();

app.use(express.json());

app.use('/documentacao', swaggerUi.serve, swaggerUi.setup(documentacao));

app.use(cors());
app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Errors) {
        return response.status(err.statusCode).json({
            message: err.message
        });
    }
    return response.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`
    });
});

export { app };