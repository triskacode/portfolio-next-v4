import { type Post, posts } from '#site/content';
import { PostNotFoundException } from './exceptions';

export function getPostBySlug(slug: string): Post {
  const foundPost = posts.find((p) => p.slugAsParams === slug);
  if (!foundPost) {
    throw new PostNotFoundException(`Post not found for slug: ${slug}`);
  }

  return foundPost;
}
