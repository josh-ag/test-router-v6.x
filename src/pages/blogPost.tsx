import { Form, useActionData, useNavigation } from "react-router-dom";
import { PostDataType, makePost } from "../services";

export const BlogPostPage = () => {
  const postAction: any = useActionData();
  const navigation = useNavigation();

  return (
    <div className="container">
      <div className="vstack" style={{ gap: "1.5rem" }}>
        <h2 className="title">Create Post</h2>

        <Form action="/blogs/create" method="POST">
          {postAction?.status === 400 && (
            <p className="text" style={{ color: "#f11e1e" }}>
              {postAction?.message}
            </p>
          )}
          {postAction?.status === 200 ||
            (postAction?.status === 201 && (
              <p className="text" style={{ color: "#02f902" }}>
                New post was created
              </p>
            ))}
          <div className="vstack" style={{ gap: "1rem" }}>
            <input
              disabled={navigation.state === "submitting" ? true : false}
              className="input"
              type="text"
              name="title"
              placeholder="Title"
              style={{ width: "100%" }}
            />
            <textarea
              disabled={navigation.state === "submitting" ? true : false}
              className="input formControl"
              name="content"
              placeholder="Content"
              style={{ width: "100%" }}
              rows={6}
              cols={4}
              maxLength={700}
            />
            <button
              className="btn"
              style={{ width: "100%", padding: "1rem" }}
              disabled={navigation.state === "submitting" ? true : false}
            >
              Create
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export const actions = async ({ request }: any) => {
  try {
    const formData = await request.formData();
    const title = formData.get("title");
    const body = formData.get("content");

    if (!title || !body) {
      return { status: 400, message: "Title and Content field is required" };
    }
    const postData: PostDataType = { title, body };

    const postResp = await makePost(postData);
    const res = await postResp.json();

    return { status: postResp.status, data: res };
  } catch (err) {
    throw err;
  }
};
