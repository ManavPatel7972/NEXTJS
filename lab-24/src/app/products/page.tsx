import React from "react";

export default async function page({ searchParams }: any) {
  const { pageNo } = await searchParams;

  return (
    <h1>
      <center style={{ marginTop: "40px" }}>
        PageNo : {pageNo.toString()}
      </center>
    
    </h1>
  );
}
