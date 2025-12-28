import { ApplicationController } from './classes/ApplicationController';

async function main() {
  try {
    const app = new ApplicationController();
    await app.start();
  } catch (error) {
    console.error('Произошла ошибка:', error);
    process.exit(1);
  }
}

main();
