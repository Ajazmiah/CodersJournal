import React from "react";
import styles from "./SideBar.module.css"; // Assuming you use CSS modules
import Ad from "../Ad/Ad";

const relatedPosts = [
  {
    link: "/post/1",
    title: "How to Optimize Your React App",
    excerpt: "Learn how to make your React app faster and more efficient.",
  },
  {
    link: "/post/2",
    title: "Understanding Redux Toolkit",
    excerpt: "A deep dive into the Redux Toolkit and its benefits.",
  },
  {
    link: "/post/3",
    title: "CSS Modules in React",
    excerpt: "Why and how to use CSS Modules for scoped styling in React.",
  },
];

const RelatedPost = () => {
  return (
    <div className={styles.relatedPostsSection}>
      <h3>Related Posts</h3>
      {relatedPosts.map((post, index) => (
        <div key={index} className={styles.relatedPost}>
          <a href={post.link}>
            <h4>{post.title}</h4>
            <p>{post.excerpt}</p>
          </a>
        </div>
      ))}
    </div>
  );
};

const Sidebar = ({ children }) => {
  const ads = [
    {
      image: "https://via.placeholder.com/300x250?text=Ad+1",
      link: "https://example.com/ad1",
      title: "Ad 1",
    },
    // {
    //   image: "https://via.placeholder.com/300x250?text=Ad+2",
    //   link: "https://example.com/ad2",
    //   title: "Ad 2",
    // },
    // {
    //   image: "https://via.placeholder.com/300x250?text=Ad+3",
    //   link: "https://example.com/ad3",
    //   title: "Ad 3",
    // },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.adsSection}>
       <Ad/>
      </div>
      {children}
    </aside>
  );
};

Sidebar.RelatedPost = RelatedPost;

export default Sidebar;
