export class PostNotFoundException extends Error {
  constructor(message = 'Post not found') {
    super(message);
    this.name = 'PostNotFoundException';
  }
}
