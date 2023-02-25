type PropTypes = {
  content: string;
  locX: number;
  locY: number;
};

function comment(props: PropTypes) {
  return (
    <div
      className="bg-white border-black border-2 absolute py-1 px-2 rounded-md"
      style={{ top: props.locY, left: props.locX }}
    >
      {props.content}
    </div>
  );
}

export default comment;
