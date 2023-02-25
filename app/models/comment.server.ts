import db from "cakebase";

const comments = db("./comments.json");

type CommentType = {
  content: string;
  id: string;
  pageId: string;
  locX: number;
  locY: number;
};

export async function getCommentsPageId(
  pageId: string
): Promise<CommentType[]> {
  return comments.get((o) => o.pageId === pageId) as Promise<CommentType[]>;
}

export async function addComment(comment: CommentType) {
  return comments.set(comment);
}
