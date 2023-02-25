import { ActionArgs, json, LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData, useParams } from "@remix-run/react";
import { useRef, useState } from "react";
import Comment from "~/components/comment";
import CommentForm from "~/components/comment-form";
import { addComment, getCommentsPageId } from "~/models/comment.server";

export const loader = async ({ params }: LoaderArgs) => {
  const comments = await getCommentsPageId(params.slug || "empty");
  return json({ comments });
};

type CommentType = {
  content: string;
  id: string;
  locX: number;
  locY: number;
};

type LoaderType = {
  comments: CommentType[];
};

export async function action({ request }: ActionArgs) {
  const body = await request.formData();
  const id = body.get("id")?.toString() || "";
  const pageId = body.get("pageId")?.toString() || "";
  const content = body.get("content")?.toString() || "";
  const locX = Number(body.get("locX") || 0);
  const locY = Number(body.get("locY") || 0);
  await addComment({ id, pageId, content, locX, locY });
  return null;
}

export default function ImageView() {
  let { slug } = useParams();
  const imageContainerRef = useRef<HTMLImageElement>(null);
  const [isCommFormOpen, setIsCommFormOpen] = useState(false);
  const [commFormLocX, setCommFormLocX] = useState(0);
  const [commFormLocY, setCommFormLocY] = useState(0);
  const { comments } = useLoaderData<LoaderType>();

  function onImageClick(event: any) {
    const offsetX = imageContainerRef.current?.offsetLeft || 0;
    const offsetY = imageContainerRef.current?.offsetTop || 0;
    const { pageX, pageY } = event;
    const locX = pageX - offsetX;
    const locY = pageY - offsetY;

    setCommFormLocX(locX);
    setCommFormLocY(locY);
    setIsCommFormOpen(true);
  }

  return (
    <main>
      <h2 className="mb-4">
        <span className="font-semibold">
          <Link to={`/`}>Gallery</Link>
        </span>{" "}
        &gt; Image View
      </h2>

      <div className="relative" ref={imageContainerRef}>
        <img
          src={`/${slug}`}
          alt="13"
          onClick={onImageClick}
          height={640}
          width={480}
        />
        {comments.map((c) => {
          return (
            <Comment
              key={c.id}
              content={c.content}
              locX={c.locX}
              locY={c.locY}
            />
          );
        })}
        <CommentForm
          locX={commFormLocX}
          locY={commFormLocY}
          open={isCommFormOpen}
          pageId={slug || "empty"}
          onClose={() => {
            setIsCommFormOpen(false);
          }}
        />
      </div>
    </main>
  );
}
