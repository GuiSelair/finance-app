import { DataSourceConfiguration } from './bootstrap';
import { DataSource } from 'typeorm';

export async function cleanupTestSchema(): Promise<void> {
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

    const schemaExists = await tempDataSource.query(`
      SELECT EXISTS(
        SELECT 1 FROM information_schema.schemata
        WHERE schema_name = 'test'
      );
    `);

    if (schemaExists[0]?.exists) {
      await tempDataSource.query(`
        DROP SCHEMA IF EXISTS test CASCADE;
      `);
    }
  } catch (error) {
    console.error('❌ Erro ao limpar o esquema de testes:', error);
    throw error;
  } finally {
    await tempDataSource.destroy();
  }
}

async function cleanupTestDatabase() {
  try {
    if (DataSourceConfiguration.isInitialized) {
      await DataSourceConfiguration.destroy();
    }

    await cleanupTestSchema();

    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao limpar o banco de dados para testes:', error);
    process.exit(1);
  }
}

cleanupTestDatabase();
