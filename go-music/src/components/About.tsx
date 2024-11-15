import React from "react";

interface Props {}

export default function About({}: Props) {
  return (
    <div className="row mt-5">
      <div className="col-12 order-lg-1">
        <h3 className="mb-4">About the Go Music Store</h3>
        <p>Go music is a modern online musical instruments store</p>
        <p>
          Explore how you can combine the power of React and Go, to build a fast
          and beautiful looking online store.
        </p>
        <p>We will cover how to build this website step by step.</p>
      </div>
    </div>
  );
}
