import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

const BOOK_QUERY = `
  query {
    books {
      author,
      title
    }
  }
`;

const BOOK_QUERY_2 = gql`
  query {
    books {
      author
      title
    }
  }
`;

const getData = async () => {
  return fetch("http://localhost:4000/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: BOOK_QUERY,
    }),
  }).then((data) => {
    return data.json();
  });
};

export const DataDisplay = () => {
  const [data, setData] = useState("Press the button to load data");

  console.log("1", BOOK_QUERY);
  console.log("2", BOOK_QUERY_2);

  return (
    <>
      <button
        onClick={async () => {
          setData(await getData());
        }}
      >
        Load Data
      </button>
      <textarea readOnly className="data-display" value={JSON.stringify(data, null, 2)}></textarea>
    </>
  );
};

export const DataDisplay2 = () => {
  const { loading, error, data } = useQuery(BOOK_QUERY_2);
  console.log({ loading, error, data });

  return <textarea readOnly className="data-display" value={JSON.stringify(data, null, 2)}></textarea>;
};
