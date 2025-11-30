// @flow strict

import { getAllBlogs } from "@/app/lib/firestoreData";
import BlogsPageContent from "./BlogsPageContent";

export const metadata = {
  title: 'All Blogs - Portfolio',
  description: 'Read all my blog posts and articles',
};

async function page() {
  const blogs = (await getAllBlogs()) || [];

  // Convert to plain objects to avoid Firestore Timestamp serialization issues
  const plainBlogs = JSON.parse(JSON.stringify(blogs));

  return <BlogsPageContent blogs={plainBlogs} />;
}

export default page;
