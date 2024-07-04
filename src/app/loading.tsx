import React from "react";

const Loading = () => (
  <div className="d-flex w-100 py-80 justify-content-center">
    <div
      className="spinner-border spinner-border-sm"
      role="status"
      data-testid="loading-spinner"
    />
  </div>
);

export default Loading;
