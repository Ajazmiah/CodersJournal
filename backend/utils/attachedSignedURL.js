import { getFileFromS3} from "./s3.js";

export const attachPresignedURLs  = async (blogPosts) => {
    // Check if blogPosts is an array or a single object
    const isArray = Array.isArray(blogPosts);
    
    // Normalize blogPosts to always be an array for easier processing
    const postsArray = isArray ? blogPosts : [blogPosts];

    for (const blog of postsArray) {
        if (blog?.coverImageName) {
            const presignedURL = await getFileFromS3(blog.coverImageName);
            blog.coverImageName = presignedURL;
        }
        delete blog.coverImage; // Optionally handle the coverImage deletion here
    }

    // Return in the same format as received
    return isArray ? postsArray : postsArray[0];
}