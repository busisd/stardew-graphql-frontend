import { gql, useQuery } from "@apollo/client";
import {
  Cards,
  Header,
  Pagination,
  PropertyFilter,
} from "@awsui/components-react";
import { useMemo, useState } from "react";
import { useCardSlotProps } from "util/awsuiCardUtil";
import { FishModal } from "./FishModal";

const ALL_FISH_QUERY = gql`
  query GetFishData {
    fish {
      id
      name
      availableSeasons
      description
    }
  }
`;

const fishCardDefinition = {
  header: (item) => <Header>{item.name}</Header>,
  sections: [
    {
      id: "fishDescription",
      header: "Description",
      content: (item) => item.description,
    },
    {
      id: "fishModalSection",
      content: (item) => <FishModal name={item.name} id={item.id} />,
    },
  ],
};

const seasonOptions = [
  {
    propertyKey: "Season",
    value: "Summer",
  },
  {
    propertyKey: "Season",
    value: "Spring",
  },
  {
    propertyKey: "Season",
    value: "Fall",
  },
  {
    propertyKey: "Season",
    value: "Winter",
  },
];

const generateFilteringOptionsForField = (
  items,
  fieldName,
  fieldKey = fieldName
) => {
  const optionsSet = new Set();
  items.forEach((item) => optionsSet.add(item[fieldName]));
  return Array.from(optionsSet).map((option) => ({
    propertyKey: fieldKey,
    value: option,
  }));
};

export const SpecificFishDisplay = () => {
  const { loading, error, data } = useQuery(ALL_FISH_QUERY);
  const fish = data?.fish ?? [];
  const nameOptions = useMemo(
    () => generateFilteringOptionsForField(fish, "name"),
    [fish]
  );

  const { items, propertyFilterProps, paginationProps } =
    useCardSlotProps(fish);

  return (
    <Cards
      header={<Header>Stardew Valley Fish</Header>}
      items={items}
      cardDefinition={fishCardDefinition}
      loading={loading}
      loadingText="Loading fish..."
      empty={error?.toString() ?? "No fish found"}
      pagination={<Pagination {...paginationProps} />}
      filter={
        <PropertyFilter
          {...propertyFilterProps}
          filteringProperties={[
            {
              key: "Season",
              propertyLabel: "Season",
              groupValuesLabel: "Seasons",
            },
            {
              key: "name",
              propertyLabel: "Name",
              groupValuesLabel: "Names",
            },
          ]}
          filteringOptions={[...seasonOptions, ...nameOptions]}
        />
      }
    />
  );
};
