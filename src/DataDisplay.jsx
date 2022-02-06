import { useState } from "react";

const getData = async () => {
  return fetch("http://localhost:4000/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
          query {
            books {
              author,
              title
            }
          }`,
    }),
  }).then((data) => {
    console.log(data);
    return data.json();
  });
};

export const DataDisplay = () => {
  const [data, setData] = useState("Press the button to load data");

  return (
    <>
      <button
        onClick={async () => {
          console.log(JSON.stringify(data, null, 2));
          setData(await getData());
        }}
      >
        Load Data
      </button>
      <textarea className="data-display" value={JSON.stringify(data, null, 2)}></textarea>
    </>
  );
};
