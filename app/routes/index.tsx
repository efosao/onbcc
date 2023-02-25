import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

export const loader = async () => {
  return json({
    images: [
      { title: "Autumn Puppy", image: "remy1.jpg" },
      { title: "Sleepy Puppy", image: "remy2.jpg" },
      { title: "Snowy Puppy", image: "remy3.jpg" },
      { title: "Playful Puppy", image: "remy4.jpg" },
    ],
  });
};

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <h2 className="mb-4">
        <span className="font-semibold">Gallery</span>
      </h2>
      <ul>
        {data.images.map((img, i) => {
          return (
            <li key={i}>
              <Link to={`/images/${img.image}`}>{img.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
