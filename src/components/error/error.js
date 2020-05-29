import React from "react";
import Typography from "@material-ui/core/Typography";

const errorStyle = {
  display: "flex",
  height: "100%",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

export const ShowError = ({ errorMessage = "Something went worng." }) => {
  return (
    <div
      // @ts-ignore
      style={{ ...errorStyle }}
    >
      <Typography variant="overline">{errorMessage}</Typography>
      <Typography variant="caption">
        This may occur due to some browser extention
      </Typography>
    </div>
  );
};
