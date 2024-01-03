import { Suspense } from "react";
import { Await, Link, defer, useLoaderData } from "react-router-dom";
import { getPosts } from "../services";
import { PostType } from "./postDetails";

export const BlogPage = () => {
  const { posts }: PostType | any = useLoaderData();

  return (
    <Suspense fallback={<p className="text">please wait....</p>}>
      <Await
        resolve={posts}
        errorElement={
          <p className="text" style={{ textAlign: "center", color: "#fd3434" }}>
            Error fetching posts
          </p>
        }
        children={(posts) => {
          return (
            <div className="container">
              <div className="vstack" style={{ gap: "2rem" }}>
                <h2>Lastest Blog Posts</h2>

                <div
                  className="hstack"
                  style={{
                    flexWrap: "wrap",
                    alignItems: "stretch",
                    gap: ".5rem",
                  }}
                >
                  {posts &&
                    posts.map((post: any) => (
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
          );
        }}
      />
    </Suspense>
  );
};

export const loader = async () => {
  try {
    const resp = await getPosts();

    if (!resp.ok) {
      return {
        status: resp.status,
        message: resp.statusText,
      };
    }

    return defer({ posts: resp.json() });
  } catch (err) {
    throw err;
  }
};
