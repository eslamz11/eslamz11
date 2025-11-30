import { getBlogById } from '@/app/lib/firestoreData';
import { notFound } from 'next/navigation';
import BlogDetailContent from './BlogDetailContent';

// Helper function to serialize Firestore data
function serializeBlog(blog) {
  if (!blog) return null;

  return {
    ...blog,
    createdAt: blog.createdAt?.toDate?.() ? blog.createdAt.toDate().toISOString() : blog.createdAt,
    updatedAt: blog.updatedAt?.toDate?.() ? blog.updatedAt.toDate().toISOString() : blog.updatedAt,
    published_at: blog.published_at?.toDate?.() ? blog.published_at.toDate().toISOString() : blog.published_at,
  };
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const blog = await getBlogById(id);

  if (!blog) {
    return {
      title: 'Blog Not Found',
    };
  }

  return {
    title: `${blog.title} - Blog Details`,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      images: [blog.cover_image],
    },
  };
}

export default async function BlogDetailsPage({ params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const blog = await getBlogById(id);

  if (!blog) {
    notFound();
  }

  // Serialize the blog object to remove Firestore Timestamps
  const serializedBlog = serializeBlog(blog);

  return <BlogDetailContent blog={serializedBlog} />;
}
