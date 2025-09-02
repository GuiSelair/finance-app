import 'reflect-metadata';
import 'dotenv/config';
import '@shared/ioc';

import { httpServer } from '@infra/http';
import { schedulerJob } from '@infra/scheduler';
import { DataSourceConfiguration } from '@infra/typeorm/bootstrap';

const isTest = process.env.NODE_ENV === 'test';

DataSourceConfiguration.initialize()
  .then(() => {
    console.log('✅ Datasource: ON');
    httpServer.start();
    if (!isTest) {
      schedulerJob.start();
    }
  })
  .catch(error => {
    console.log('⛔ Datasource: DOWN');
    console.error(error);
  });
