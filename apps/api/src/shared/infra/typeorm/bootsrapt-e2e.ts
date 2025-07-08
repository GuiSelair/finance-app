import { DataSourceConfiguration } from './bootstrap';
import { DataSource } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export async function initializeTestSchema(): Promise<void> {
  const isTest = process.env.NODE_ENV === 'test';

  if (!isTest) return;

  const tempDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST ?? 'localhost',
    port: +(process.env.DB_PORT ?? 5432),
    username: process.env.DB_USER ?? 'root',
    password: process.env.DB_PASSWORD ?? 'root',
    database: process.env.DB_DATABASE ?? 'finance-app',
    schema: 'public',
  });

  try {
    await tempDataSource.initialize();
    await tempDataSource.query(`
      CREATE SCHEMA IF NOT EXISTS test;
    `);
  } catch (error) {
    throw error;
  } finally {
    await tempDataSource.destroy();
  }
}

async function initTestDatabase() {
  try {
    await initializeTestSchema();
    await DataSourceConfiguration.initialize();
    await DataSourceConfiguration.runMigrations();
    await DataSourceConfiguration.query(`
      INSERT INTO test.users (id, name, email, password)
      VALUES ('${uuidv4()}', 'John Doe', 'test-e2e@mail.com', '$2a$08$OjEEEi3dQ.oDAS6DK0xzxu70sbgNVLIu9CWxv49GX5u0ZjyOQRR9y')
      ON CONFLICT (email) DO NOTHING;
    `);

    console.log('✅ Test database initialized successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error initializing test database:', error);
    process.exit(1);
  }
}

initTestDatabase();
