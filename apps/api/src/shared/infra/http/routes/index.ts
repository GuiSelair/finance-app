import { Router } from 'express';

import usersRoutes from '@modules/User/infra/http/routes/users.routes';
import authRoutes from '@modules/Auth/infra/http/routes/auth.routes';
import cardsRoutes from '@modules/Card/infra/http/routes/cards.routes';
import expensesRoutes from '@modules/Expense/infra/http/routes/expenses.routes';
import settingsRoutes from '@modules/Settings/infra/http/routes';
import shareExpensePerson from '@modules/ShareExpensePerson/infra/http/routes/shareExpensePerson.routes'

const routes = Router();

routes.get('/', (_, res) => {
  return res.status(200).send('ok');
});
routes.use('/users', usersRoutes);
routes.use('/auth', authRoutes);
routes.use('/cards', cardsRoutes);
routes.use('/expenses', expensesRoutes);
routes.use('/settings/incomes', settingsRoutes.incomesRoutes);
routes.use('/share-people', shareExpensePerson);

export default routes;
