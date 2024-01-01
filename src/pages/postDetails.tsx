import { useLoaderData } from "react-router-dom";
import { getPost } from "../services";

export type PostType = {
  id: string;
  userId: string;
  body: string;
  title: string;
};

export const PostDetails = () => {
  const data: PostType | any = useLoaderData();

  return (
    <div className="container">
      <h2 className="heading">Post Details</h2>
      <div className="card" style={{ width: "auto" }}>
        <h2 className="title" style={{ color: "#666" }}>
          {data?.title}
        </h2>
        <p className="text">{data?.body}</p>

        <div style={{ borderTop: "1px solid #ccc", padding: "1rem 0px" }}>
          <div className="text"> #Post: {data?.id}</div>
          <div className="text"> #User: {data?.userId}</div>
        </div>
      </div>
    </div>
  );
};

type LoaderType = { params: { id: string } };

export const loader = async ({ params }: LoaderType) => {
  try {
    const resp = await getPost(params.id);
    const data = await resp.json();

    if (!resp.ok) {
      throw new Error(resp.status.toString());
    }

    return data;
  } catch (err) {
    throw err;
  }
};
