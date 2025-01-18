import {
  getAllArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
} from '../src/api/models/articleModel';

import {
  getAllAuthors,
  getAuthor,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from '../src/api/models/authorModel';

import {Article, Author} from '../src/types/LocalTypes';

const testArticle: Article = {
  id: 0, // This will be updated after creation
  title: 'Test Article',
  description: 'This is the content of article 1',
  author_id: 1, // some random author id
};

describe('Article functions', () => {
  it('createArticle should return the new article', () => {
    try {
      const newArticle = createArticle(testArticle);
      expect(newArticle).toBeDefined();
      expect(newArticle.title).toBe(testArticle.title);
      expect(newArticle.description).toBe(testArticle.description);
      testArticle.id = newArticle.id;
    } catch (error) {
      throw new Error(
        `Failed to create article: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
      );
    }
  });

  it('getArticle should return the article', () => {
    try {
      const foundArticle = getArticle(testArticle.id);
      expect(foundArticle).toBeDefined();
      expect(foundArticle).toEqual(testArticle);
    } catch (error) {
      throw new Error(
        `Failed to get article: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
      );
    }
  });

  it('getAllArticles should return an array of articles', () => {
    try {
      const articles = getAllArticles();
      expect(Array.isArray(articles)).toBe(true);
      articles.forEach((article) => {
        expect(article).toHaveProperty('id', expect.any(Number));
        expect(article).toHaveProperty('title', expect.any(String));
        expect(article).toHaveProperty('description', expect.any(String));
      });
    } catch (error) {
      throw new Error(
        `Failed to get all articles: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
      );
    }
  });

  it('updateArticle should return the updated article', () => {
    try {
      const updatedArticle = updateArticle(
        testArticle.id,
        'Updated Title',
        'Updated Description',
      );
      expect(updatedArticle).toBeDefined();
      expect(updatedArticle.title).toBe('Updated Title');
      expect(updatedArticle.description).toBe('Updated Description');
      expect(updatedArticle.id).toBe(testArticle.id);
    } catch (error) {
      throw new Error(
        `Failed to update article: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
      );
    }
  });

  it('deleteArticle should delete the article', () => {
    try {
      deleteArticle(testArticle.id);
      expect(() => getArticle(testArticle.id)).toThrow();
    } catch (error) {
      throw new Error(
        `Failed to delete article: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
      );
    }
  });

  it('getArticle should throw error for non-existent article', () => {
    expect(() => getArticle(999999)).toThrow('Article not found');
  });
});

const testAuthor: Author = {
  id: 0, // Will be updated after creation
  name: 'Test Author',
  email: 'testauthor@example.com',
};

describe('Author functions', () => {
  it('createAuthor should return the new author', () => {
    try {
      const newAuthor = createAuthor({
        name: testAuthor.name,
        email: testAuthor.email,
      });
      expect(newAuthor).toBeDefined();
      expect(newAuthor.name).toBe(testAuthor.name);
      expect(newAuthor.email).toBe(testAuthor.email);

      testAuthor.id = newAuthor.id;
    } catch (error) {
      throw new Error(
        `Failed to create author: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
      );
    }
  });

  it('getAuthor should return the author', () => {
    try {
      const foundAuthor = getAuthor(testAuthor.id);
      expect(foundAuthor).toBeDefined();
      expect(foundAuthor).toEqual(testAuthor);
    } catch (error) {
      throw new Error(
        `Failed to get author: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
      );
    }
  });

  it('getAllAuthors should return an array of authors', () => {
    try {
      const authors = getAllAuthors();
      expect(Array.isArray(authors)).toBe(true);

      authors.forEach((author) => {
        expect(author).toHaveProperty('id', expect.any(Number));
        expect(author).toHaveProperty('name', expect.any(String));
        expect(author).toHaveProperty('email', expect.any(String));
      });
    } catch (error) {
      throw new Error(
        `Failed to get all authors: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
      );
    }
  });

  it('updateAuthor should return the updated author', () => {
    try {
      const updatedName = 'Updated Name';
      const updatedEmail = 'updatedauthor@example.com';

      const updatedAuthor = updateAuthor(
        testAuthor.id,
        updatedName,
        updatedEmail,
      );
      expect(updatedAuthor).toBeDefined();
      expect(updatedAuthor.id).toBe(testAuthor.id);
      expect(updatedAuthor.name).toBe(updatedName);
      expect(updatedAuthor.email).toBe(updatedEmail);

      // Update our reference
      testAuthor.name = updatedName;
      testAuthor.email = updatedEmail;
    } catch (error) {
      throw new Error(
        `Failed to update author: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
      );
    }
  });

  it('deleteAuthor should delete the author', () => {
    try {
      deleteAuthor(testAuthor.id);
      expect(() => getAuthor(testAuthor.id)).toThrow();
    } catch (error) {
      throw new Error(
        `Failed to delete author: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
      );
    }
  });

  it('getAuthor should throw error for non-existent author', () => {
    expect(() => getAuthor(999999)).toThrow('Author not found');
  });
});
