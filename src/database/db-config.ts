const filename = 'mydb.sqlite';

const tables = `
CREATE TABLE IF NOT EXISTS authors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  author_id INTEGER,
  FOREIGN KEY(author_id) REFERENCES authors(id) ON DELETE CASCADE
);
`;

const checkData = `
SELECT
  (SELECT COUNT(*) FROM authors) as authorCount,
  (SELECT COUNT(*) FROM articles) as articleCount
`;

const exampleData = `
INSERT INTO authors (name, email) VALUES ('Jane Doe', 'jane@example.com');
INSERT INTO authors (name, email) VALUES ('John Smith', 'john@example.com');

INSERT INTO articles (title, description, author_id) VALUES
('Article One', 'This is the first article', 1),
('Article Two', 'This is the second article', 1),
('Article Three', 'This is the third article', 2);
`;

export {filename, tables, checkData, exampleData};
