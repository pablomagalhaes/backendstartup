import { Router } from 'express';
import { celebrate, Joi } from 'celebrate'
import multer from 'multer';
import multerConfig from './config/multer';

import UsersController from './controllers/UsersController';
import SessionController from './controllers/SessionController';
import DashboardController from './controllers/DashboardController';
import PointsController from './controllers/PointsController';

import ItemsController from './controllers/ItemsController';

const routes = Router();
const dashboardController = new DashboardController;
const usersController = new UsersController;
const sessionController = new SessionController;
const pointsController = new PointsController;
const itemsController = new ItemsController;
const upload = multer(multerConfig);

routes.get('/', (req, res) => {
    return res.send('Olá Thiago!');
});

routes.get('/dashboard', dashboardController.index);

routes.get('/points', pointsController.index);
routes.post(
    '/points', 
    upload.single('image'),
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.number().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            uf: Joi.string().required().max(2),
            city: Joi.string().required(),
            items: Joi.string().required(),            
        })
    }, {
        abortEarly: false
    }),
    pointsController.create
);
routes.get('/points/:id', pointsController.show);

routes.get('/items', itemsController.index);


routes.post('/register', usersController.create);
routes.get('/users', usersController.index);
routes.post('/session', sessionController.loginUser);

// routes.post('/register', (req, res) => {
//     return res.send('Olá Thiago!');
// });

export default routes;