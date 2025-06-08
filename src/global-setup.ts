import dotenv from 'dotenv';

async function globalSetup(): Promise<void> {
  dotenv.config({ override: true });
  // console.log('⚠️ URL: ', process.env.BASE_URL);
  // console.log('⚠️ USER_NAME: ', process.env.USER_NAME);
  // console.log('⚠️ USER_PASSWORD: ', process.env.USER_PASSWORD);
}
export default globalSetup;
