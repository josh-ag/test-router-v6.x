import { Link, Outlet } from "react-router-dom";
import "./blogLayout.css";

export const BlogLayout = () => {
  return (
    <div className="flex">
      <div className="blogbar">
        <Link
          to="/blogs/create"
          className="btn"
          style={{ background: "aliceblue", color: "#555", padding: "1rem" }}
        >
          Create Post
        </Link>
      </div>
      <div style={{ marginLeft: "10rem", width: "100%" }}>
        <Outlet />
      </div>
    </div>
  );
};
