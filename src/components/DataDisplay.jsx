import { gql, useQuery } from "@apollo/client";
import {
  Cards,
  Header,
} from "@awsui/components-react";
import { useMemo, useState } from "react";
import { FishModal } from "./FishModal";

const ALL_FISH_QUERY = gql`
  query GetFishData {
    fish {
      id
      name
    }
  }
`;

const fishCardDefinition = {
  header: (item) => <Header>{item.name}</Header>,
  sections: [
    {
      id: "fishModalSection",
      header: "fish",
      content: item => <FishModal name={item.name} id={item.id} />
    }
  ],
};

export const SpecificFishDisplay = () => {
  const { loading, error, data } = useQuery(ALL_FISH_QUERY);
  console.log(data);

  return (
    <Cards
      header={<Header>Fish Cards</Header>}
      items={data?.fish ?? []}
      cardDefinition={fishCardDefinition}
      loading={loading}
      loadingText="Loading fish..."
      empty={error?.toString() ?? "No fish found"}
    />
  );
};
