import db from '../../database/db';
import {Author} from '../../types/LocalTypes';

const getAllAuthors = (): Author[] => {
  return db.prepare('SELECT * FROM authors').all() as Author[];
};

const getAuthor = (id: number): Author => {
  const result = db
    .prepare('SELECT * FROM authors WHERE id = ?')
    .get(id) as Author;
  if (!result) {
    throw new Error('Author not found');
  }
  return result;
};

const createAuthor = (author: Omit<Author, 'id'>): Author => {
  try {
    const stmt = db
      .prepare('INSERT INTO authors (name, email) VALUES (?, ?)')
      .run(author.name, author.email);
    return getAuthor(Number(stmt.lastInsertRowid));
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(
      `Failed to create author - email might be duplicate: ${message}`,
    );
  }
};

const updateAuthor = (id: number, name: string, email: string): Author => {
  const stmt = db
    .prepare('UPDATE authors SET name = ?, email = ? WHERE id = ?')
    .run(name, email, id);
  if (stmt.changes === 0) {
    throw new Error('Author not found or no changes made');
  }
  return getAuthor(id);
};

const deleteAuthor = (id: number): void => {
  try {
    const stmt = db.prepare('DELETE FROM authors WHERE id = ?').run(id);
    if (stmt.changes === 0) {
      throw new Error('Author not found');
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Cannot delete author with existing articles: ${message}`);
  }
};

export {getAllAuthors, getAuthor, createAuthor, updateAuthor, deleteAuthor};
