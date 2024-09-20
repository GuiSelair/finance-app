import { Router } from 'express';

import usersRoutes from '@modules/User/infra/http/routes/users.routes';
import authRoutes from '@modules/Auth/infra/http/routes/auth.routes';
import cardsRoutes from '@modules/Card/infra/http/routes/cards.routes';
import expensesRoutes from '@modules/Expense/infra/http/routes/expenses.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/auth', authRoutes);
routes.use('/cards', cardsRoutes);
routes.use('/expenses', expensesRoutes);

export default routes;
