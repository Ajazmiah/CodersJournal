This is a full-stack blogging web application built using the MERN stack (MongoDB, Express, React, Node.js) and AWS S3 for media storage. The app allows users to write, edit, update, and delete articles. Only authenticated users can create or modify their own posts, while anyone can read the articles without authentication.

Features
User Authentication: Users can sign up and log in to create, edit, update, or delete their own blog posts.
Role-based Access:
Authenticated Users: Can create, edit, update, and delete only their own posts.
Unauthenticated Users: Can only read articles but cannot create or modify posts.
Article Management:
Full CRUD functionality (Create, Read, Update, Delete) for posts, but restricted to post creators.
AWS S3 Integration: Media and images are stored in an AWS S3 bucket.
Responsive Design: Optimized for all device sizes.
State Management: Utilizes Redux Toolkit for efficient and scalable state management.
