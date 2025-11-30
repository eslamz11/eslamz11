// @flow strict
import BlogContent from './BlogContent';

function Blog({ blogs }) {
  // Convert to plain objects to avoid Firestore Timestamp serialization issues
  const plainBlogs = blogs ? JSON.parse(JSON.stringify(blogs)) : [];

  return <BlogContent blogs={plainBlogs} />;
}

export default Blog;
