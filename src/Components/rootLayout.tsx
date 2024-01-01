import { Link, Outlet, useLocation } from "react-router-dom";
import "./rootLayout.css";

export const RootLayout = () => {
  const location = useLocation();

  return (
    <>
      <div
        className="appbar"
        style={{
          width: location.pathname.includes("blogs")
            ? "calc(100% - 10rem)"
            : "100%",
        }}
      >
        <div
          className="container flex"
          style={{
            padding: "1rem",
          }}
        >
          <Link to="/" className="title">
            Blog
          </Link>

          <div className="hstack" style={{ gap: "1rem" }}>
            <Link to="/blogs" className="navlink">
              Posts
            </Link>
            <Link to="/about" className="navlink">
              About
            </Link>
          </div>
        </div>
      </div>
      <div style={{ paddingTop: "5rem" }}>
        <Outlet />
      </div>
    </>
  );
};
