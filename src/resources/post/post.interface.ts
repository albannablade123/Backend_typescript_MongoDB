import { Document } from "mongoose";

export default interface Post extends Document{
    title: String,
    body: String,
    author: String,
    
}