import { Link, defer, useLoaderData } from "react-router-dom";
import { getPosts } from "../services";
import { Suspense } from "react";
import { PostType } from "./postDetails";

export const BlogPage = () => {
  const loaderData: PostType | any = useLoaderData();

  return (
    <Suspense fallback={<p>please wait....</p>}>
      <div className="container">
        <div className="vstack" style={{ gap: "2rem" }}>
          <h2>Lastest Blog Posts</h2>

          <div
            className="hstack"
            style={{ flexWrap: "wrap", alignItems: "stretch", gap: ".5rem" }}
          >
            {loaderData &&
              loaderData?.posts &&
              loaderData?.posts.map((post: any) => (
                <Link
                  to={"/blogs/post/" + post.id}
                  className="card"
                  key={post.id}
                >
                  <h2 className="title" style={{ color: "#555" }}>
                    {post.title}
                  </h2>
                  <p className="text">{post.body}</p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export const loader = async () => {
  try {
    const resp = await getPosts();
    const data = await resp.json();

    if (!resp.ok) {
      return {
        status: resp.status,
        message: resp.statusText,
      };
    }
    return defer({ posts: data });
  } catch (err) {
    throw err;
  }
};
