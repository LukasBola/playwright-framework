import { RegisterUser } from '../models/user.model';
import { faker } from '@faker-js/faker';

export function generateRegisterUser(): RegisterUser {
  const now = new Date();
  const formattedDate = now.toISOString().slice(0, 19);
  const firstName = faker.person.firstName().replace(/[^\p{L}]/gu, '');
  const lastName = faker.person.lastName().replace(/[^\p{L}]/gu, '');
  const email = faker.internet.email({
    firstName,
    lastName: `${lastName}.${formattedDate}`,
  });
  const password = faker.internet.password({ length: 8, memorable: true });
  return {
    firstName,
    lastName,
    email,
    password,
  };
}
