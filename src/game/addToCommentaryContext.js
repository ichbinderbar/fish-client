export default function addToCommentaryContext(
  newContext,
  setCommentaryContext
) {
  setCommentaryContext((prevContext) => `${prevContext} ${newContext}`);
}
