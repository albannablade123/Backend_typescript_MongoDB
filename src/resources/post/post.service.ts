import PostModel from "./post.model";
import Post from "@/resources/post/post.interface";

class PostService{
    private post = PostModel;

    /**
     * Create a new post 
     */

    public async create(title:String, body: String, author: String): Promise<Post>{
        try {
            //assign to post 
            const post = await this.post.create({title, body, author});
            return post;
        } catch (error) {
            throw new Error('Error in creating a post.')
        }
    }

}
export default PostService;