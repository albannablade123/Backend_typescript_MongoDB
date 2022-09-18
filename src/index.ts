import 'dotenv/config';
import App from './app';
import validateEnv from '@/utils/validateEnv';
import PostController from './resources/post/post.controller';

//validateEnv();

console.log("reached here");

const app = new App([
    new PostController()
], Number(process.env.PORT));

app.listen();