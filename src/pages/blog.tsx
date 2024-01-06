import { Suspense } from "react";
import { Await, Link, defer, useLoaderData } from "react-router-dom";
import { getPosts } from "../services";

export const BlogPage = () => {
  const { posts }: any = useLoaderData();

  return (
    <Suspense
      fallback={
        <p className="title" style={{ textAlign: "center" }}>
          please wait....
        </p>
      }
    >
      <Await
        resolve={posts}
        errorElement={
          <p className="text" style={{ textAlign: "center", color: "#fd3434" }}>
            Error fetching posts
          </p>
        }
      >
        {(posts) => {
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
                  {posts.map((post) => (
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
      </Await>
    </Suspense>
  );
};

export const loader = async () => {
  try {
    const resp = await getPosts();

    if (!resp.ok) {
      throw new Response(resp.statusText, { status: resp.status });
    }

    return defer({ posts: resp.json() });
  } catch (err) {
    throw err;
  }
};
