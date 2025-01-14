import {
  getAllArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
} from '../src/api/models/articleModel';
import {Article} from '../src/types/LocalTypes';

// Create new article for testing
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
      testArticle.id = newArticle.id; // Update the reference article id
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
      // After deletion, expect getArticle to throw
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
