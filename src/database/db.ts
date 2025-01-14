import Database from 'better-sqlite3';
import {filename, tables, checkData, exampleData} from './db-config';

const db = new Database(filename);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// Create tables
db.exec(tables);

// Check if tables are empty
const {authorCount, articleCount} = db.prepare(checkData).get() as {
  authorCount: number;
  articleCount: number;
};

if (authorCount === 0 && articleCount === 0) {
  db.exec(exampleData);
  console.log('Inserted example data.');
} else {
  console.log('Tables already populated.');
}

export default db;
