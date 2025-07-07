import { ArticleCreationModel } from '../models/article.model';
import { faker } from '@faker-js/faker';

export function generateArticle(
  titleLength: number = 30,
  bodyParagraphs: number = 5,
): ArticleCreationModel {
  // Generate a string of at least titleLength characters
  let title = '';
  while (title.length < titleLength) {
    title += faker.lorem.words(5) + ' ';
  }
  title = title.slice(0, titleLength);
  return {
    title: title,
    body: faker.lorem.paragraphs(bodyParagraphs),
  };
}
