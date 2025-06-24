import { ArticleCreationModel } from '../models/article.model';
import { faker } from '@faker-js/faker';

export function generateArticle(): ArticleCreationModel {
  return {
    title: faker.lorem.sentence(3),
    body: faker.lorem.paragraphs(5),
  };
}
