import { gql, useQuery } from "@apollo/client";
import {
  Box,
  Button,
  Container,
  Select,
  SpaceBetween,
  Textarea,
} from "@awsui/components-react";
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

const fishOptions = [
  { label: "All", value: "All" },
  { label: "Albacore", value: "Albacore" },
  { label: "Anchovy", value: "Anchovy" },
  { label: "Angler", value: "Angler" },
  { label: "Blob Fish", value: "Blob Fish" },
  { label: "Bream", value: "Bream" },
];

export const SpecificFishDisplay = () => {
  const [fishOption, setFishOption] = useState(fishOptions[1]);

  const { loading, error, data } = useQuery(SPECIFIC_FISH_QUERY, {
    variables: { name: fishOption.value === "All" ? null : fishOption.value },
  });

  const dataDisplayContent = useMemo(() => {
    if (loading) return "Loading...";
    if (error) return error.toString();
    return JSON.stringify(data, null, 2);
  }, [loading, error, data]);

  return (
    <Container>
      <SpaceBetween size="m">
        <Textarea readOnly value={dataDisplayContent} rows={25} />
        <Select
          options={fishOptions}
          selectedOption={fishOption}
          onChange={(e) => setFishOption(e.detail.selectedOption)}
        />
      </SpaceBetween>
    </Container>
  );
};
