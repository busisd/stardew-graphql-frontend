import { Header } from "@awsui/components-react";
import { useMemo, useState, useCallback, useEffect } from "react";

const propertyFilteringI18Strings = {
  allPropertiesLabel: "All Properties",
  applyActionText: "Apply",
  cancelActionText: "Cancel",
  clearFiltersText: "Clear",
  dismissAriaLabel: "Dismiss",
  editTokenHeader: "",
  enteredTextLabel: (text) => text,
  filteringAriaLabel: "Filtering",
  filteringPlaceholder: "Filtering",
  groupPropertiesText: "Filter by",
  groupValuesText: "Suggestions",
  operationAndText: "and",
  operationOrText: "or",
  operatorContainsText: "Contains",
  operatorDoesNotContainText: "Does not contain",
  operatorDoesNotEqualText: "",
  operatorEqualsText: "",
  operatorGreaterOrEqualText: "",
  operatorGreaterText: "",
  operatorLessOrEqualText: "",
  operatorLessText: "",
  operatorText: "Operator",
  operatorsText: "Operator",
  propertyText: "Property",
  removeTokenButtonAriaLabel: ({ value, propertyKey, operator }) =>
    `Remove token ${value} ${operator} ${propertyKey}`,
  tokenLimitShowFewer: "Show Fewer",
  tokenLimitShowMore: "Show More",
  valueText: "Value",
};

const applyQueryToItem = (item, query) => {
  switch (query.propertyKey) {
    case "Season":
      return item.availableSeasons.includes(query.value);
    default:
      if (query.propertyKey) return item[query.propertyKey] === query.value;
      else
        return JSON.stringify(item)
          .toLowerCase()
          .includes(query.value.toLowerCase());
  }
};

const filterItemsByProperties = (items, propertyFilterQueries) =>
  items.filter((item) =>
    propertyFilterQueries.operation === "and"
      ? propertyFilterQueries.tokens.every((query) =>
          applyQueryToItem(item, query)
        )
      : propertyFilterQueries.tokens.some((query) =>
          applyQueryToItem(item, query)
        )
  );

export const useCardSlotProps = (items, pageSize = 20) => {
  const [propertyFilterQueries, setPropertyFilterQueries] = useState({
    tokens: [],
    operation: "and",
  });
  const onPropertyFilterChange = useCallback(
    (e) => setPropertyFilterQueries(e.detail),
    [setPropertyFilterQueries]
  );

  const filteredItems = useMemo(
    () => filterItemsByProperties(items, propertyFilterQueries),
    [items, propertyFilterQueries]
  );
  const matchedItemsText = useMemo(
    () => <Header variant="h4">{filteredItems.length} matches</Header>,
    [filteredItems.length]
  );

  const [currentPageIndex, setcurrentPageIndex] = useState(1);
  const pagesCount = useMemo(
    () => Math.max(Math.ceil(filteredItems.length / pageSize), 1),
    [pageSize, filteredItems.length]
  );
  useEffect(() => {
    if (currentPageIndex > pagesCount) setcurrentPageIndex(1);
  }, [pagesCount]);

  const onPaginationChange = useCallback(
    (e) => setcurrentPageIndex(e.detail.currentPageIndex),
    [setcurrentPageIndex]
  );

  const filteredPaginatedItems = useMemo(
    () =>
      filteredItems.slice(
        (currentPageIndex - 1) * pageSize,
        currentPageIndex * pageSize
      ),
    [filteredItems, currentPageIndex]
  );

  return {
    items: filteredPaginatedItems,
    propertyFilterProps: {
      query: propertyFilterQueries,
      onChange: onPropertyFilterChange,
      i18nStrings: propertyFilteringI18Strings,
      countText: matchedItemsText,
    },
    paginationProps: {
      currentPageIndex,
      pagesCount,
      onChange: onPaginationChange,
    },
  };
};
