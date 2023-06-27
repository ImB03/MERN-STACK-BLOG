import React from "react";

export default function Image({ className, imageUrl }) {
  return (
    <img
      className={className}
      src={
        imageUrl
          ? imageUrl
          : "https://www.wolflair.com/wp-content/uploads/2017/01/placeholder.jpg"
      }
      alt=""
    />
  );
}
