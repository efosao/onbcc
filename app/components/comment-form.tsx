import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";

type PropTypes = {
  pageId: string;
  locX: number;
  locY: number;
  onClose: () => void;
  open: boolean;
};

function CommentForm(props: PropTypes) {
  const inputRef = useRef<HTMLInputElement>(null);

  function clearComment() {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  function abort() {
    clearComment();
    props.onClose();
  }

  return props.open ? (
    <form
      method="post"
      className="bg-white border-red border-2 absolute py-1 px-2 rounded-md"
      style={{ top: props.locY, left: props.locX }}
    >
      <button
        className="bg-pink-300 mx-1 p-1 w-8 rounded inline-flex justify-center items-center text-center"
        onClick={abort}
      >
        x
      </button>
      <input
        name="content"
        type="text"
        className="p-2"
        placeholder="add comment"
        ref={inputRef}
      />
      <input name="id" type="hidden" value={uuidv4()} />
      <input name="pageId" type="hidden" value={props.pageId} />
      <input name="locX" type="hidden" value={props.locX} />
      <input name="locY" type="hidden" value={props.locY} />{" "}
      <button className="bg-green-300 mx-1 p-1 rounded" type="submit">
        Add
      </button>
    </form>
  ) : null;
}

export default CommentForm;
