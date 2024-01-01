import { useNavigate, useRouteError } from "react-router-dom";

export const ErrorElement = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="vstack" style={{ gap: "2rem" }}>
      <div className="vstack">
        <h2>Oops!</h2>
        <p style={{ textAlign: "center" }}>
          Something went wrong
          <br />{" "}
          {(error instanceof Error && error?.message) || error?.toString()}
        </p>
      </div>

      <button className="btn" onClick={() => navigate(-1)}>
        Take Me Back
      </button>
    </div>
  );
};
