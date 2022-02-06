import { gql, useQuery } from "@apollo/client";
import { useMemo } from "react";

const BOOK_QUERY = gql`
  query GetFishData {
    fish {
      name
      prices {
        normal
        silver
        gold
        iridium
      }
    }
  }
`;

export const DataDisplay = () => {
  const { loading, error, data } = useQuery(BOOK_QUERY);
  console.log({ loading, error, data });

  const dataDisplayContent = useMemo(() => {
    if (loading) return "Loading...";
    if (error) return error.toString();
    return JSON.stringify(data, null, 2);
  }, [loading, error, data]);

  return <textarea readOnly className="data-display" value={dataDisplayContent}></textarea>;
};
