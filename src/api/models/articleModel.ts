import db from '../../database/db';
import {Article} from '../../types/LocalTypes';

interface ArticleRow {
  id: number;
  title: string;
  description: string;
  author_id: number;
  author_name?: string;
  author_email?: string;
}

const getArticle = (id: number): Article => {
  const row = db
    .prepare(
      `
      SELECT articles.*, authors.name AS author_name, authors.email AS author_email
      FROM articles
      LEFT JOIN authors ON articles.author_id = authors.id
      WHERE articles.id = ?
    `,
    )
    .get(id) as ArticleRow | undefined;

  if (!row) {
    throw new Error('Article not found');
  }

  const {
    author_name: _unusedName,
    author_email: _unusedEmail,
    ...article
  } = row;
  return article as Article;
};

const getAllArticles = (): Article[] => {
  const rows = db
    .prepare(
      `
      SELECT articles.*, authors.name AS author_name, authors.email AS author_email
      FROM articles
      LEFT JOIN authors ON articles.author_id = authors.id
    `,
    )
    .all() as ArticleRow[];

  return rows.map((row) => {
    const {author_name: _n, author_email: _e, ...rest} = row;
    return rest as Article;
  });
};

const createArticle = (article: Omit<Article, 'id'>): Article => {
  try {
    const authorExists = db
      .prepare('SELECT id FROM authors WHERE id = ?')
      .get(article.author_id);
    if (!authorExists) {
      throw new Error('Author not found');
    }

    const stmt = db
      .prepare(
        'INSERT INTO articles (title, description, author_id) VALUES (?, ?, ?)',
      )
      .run(article.title, article.description, article.author_id);

    return getArticle(Number(stmt.lastInsertRowid));
  } catch (error) {
    throw new Error(
      `Failed to create article: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`,
    );
  }
};

const updateArticle = (
  id: number,
  title: string,
  description: string,
  author_id: number,
): Article => {
  const stmt = db
    .prepare(
      'UPDATE articles SET title = ?, description = ? WHERE id = ? AND author_id = ?',
    )
    .run(title, description, id, author_id);

  if (stmt.changes === 0) {
    throw new Error('Article not found');
  }
  return getArticle(id);
};

const deleteArticle = (id: number, author_id: number): void => {
  const stmt = db
    .prepare('DELETE FROM articles WHERE id = ? AND author_id = ?')
    .run(id, author_id);

  if (stmt.changes === 0) {
    throw new Error('Article not found or no permission');
  }
};

export {
  getAllArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
};
