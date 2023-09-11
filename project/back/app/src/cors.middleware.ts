import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Configurez les en-têtes CORS appropriés ici
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080'); // Remplacez par l'URL de votre front-end
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');

    // Passez à l'étape suivante du middleware
    next();
  }
}