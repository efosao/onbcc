import { Form } from "@remix-run/react";

type PropTypes = {
  content: string;
  locX: number;
  locY: number;
};

function comment(props: PropTypes) {
  return (
    <Form method="post">
      <div
        className="bg-white border-black border-2 absolute py-1 px-2 rounded-md inline-flex gap-2"
        style={{ top: props.locY, left: props.locX }}
      >
        {props.content}
      </div>
    </Form>
  );
}

export default comment;
