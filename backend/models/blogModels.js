import mongoose, { Schema } from "mongoose";

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: false,
    },
    body: {
      type: String,
    },
    // coverImage: {
    //   type: String,
    //   required: true,
    // },
    authorId: {
      type: "ObjectId",
      ref: "User",
    },
    authorFirstName: {
      type: String,
      ref: "User",
    },
    coverImageName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// blogSchema.virtual('author', {
//   ref: 'User',
//   localField: '_id',
//   foreignField: 'authorId'
// })

const blog = mongoose.model("Blog", blogSchema);
export default blog;
