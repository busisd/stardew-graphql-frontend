import { gql, useQuery } from "@apollo/client";
import { useMemo, useState } from "react";

const ALL_FISH_QUERY = gql`
  query GetFishData {
    fish {
      name
      prices {
        iridium
      }
      catchDifficulty
      legendary
      bundle
      catchOpportunities {
        season
      }
    }
  }
`;

const SPECIFIC_FISH_QUERY = gql`
  query GetSpecificFish($name: String) {
    fish(name: $name) {
      name
      prices {
        iridium
      }
      catchDifficulty
      legendary
      bundle
      catchOpportunities {
        season
      }
    }
  }
`;

export const DataDisplay = () => {
  const { loading, error, data } = useQuery(ALL_FISH_QUERY);

  const dataDisplayContent = useMemo(() => {
    if (loading) return "Loading...";
    if (error) return error.toString();
    return JSON.stringify(data, null, 2);
  }, [loading, error, data]);

  return <textarea readOnly className="data-display" value={dataDisplayContent}></textarea>;
};

export const SpecificFishDisplay = () => {
  const [fishToShow, setFishToShow] = useState("Albacore");

  const { loading, error, data } = useQuery(SPECIFIC_FISH_QUERY, {
    variables: { name: fishToShow === "All" ? null : fishToShow },
  });

  const dataDisplayContent = useMemo(() => {
    if (loading) return "Loading...";
    if (error) return error.toString();
    return JSON.stringify(data, null, 2);
  }, [loading, error, data]);

  return (
    <>
      <select value={fishToShow} onChange={(e) => setFishToShow(e.target.value)}>
        <option value="All">All</option>
        <option value="Albacore">Albacore</option>
        <option value="Anchovy">Anchovy</option>
        <option value="Angler">Angler</option>
        <option value="Blob Fish">Blob Fish</option>
        <option value="Bream">Bream</option>
      </select>
      <textarea readOnly className="data-display" value={dataDisplayContent} />
    </>
  );
};
