import { container } from 'tsyringe';

import '@modules/User/providers';

import IUsersRepository from '@modules/User/repositories/IUsersRepository';
import UsersRepository from '@modules/User/infra/typeorm/repositories/UsersRepository';

import ICardRepository from '@modules/Card/repositories/ICardRepository';
import CardRepository from '@modules/Card/infra/typeorm/repositories/CardsRepository';

import IExpensesRepository from '@modules/Expense/repositories/IExpensesRepository';
import ExpensesRepository from '@modules/Expense/infra/typeorm/repositories/ExpensesRepository';

import IExpensesMonthRepository from '@modules/Expense/repositories/IExpensesInMonthRepository';
import ExpensesMonthRepository from '@modules/Expense/infra/typeorm/repositories/ExpensesMonthRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ICardRepository>('CardRepository', CardRepository);

container.registerSingleton<IExpensesRepository>(
  'ExpensesRepository',
  ExpensesRepository,
);

container.registerSingleton<IExpensesMonthRepository>(
  'ExpensesMonthRepository',
  ExpensesMonthRepository,
);
