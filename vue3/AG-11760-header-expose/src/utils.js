export const rowData = [
  {
    athlete: "Michael Phelps",
    age: 23,
    country: "United States",
    year: 2008,
    date: "24/08/2008",
    sport: "Swimming",
    gold: 8,
    silver: 0,
    bronze: 0,
    total: 8,
  },
];

const convertToColDef = (columnName, index) => {
  return {
    headerComponent: "HeaderComponent",
    headerName: columnName,
    colId: `${index}`,
    field: columnName,
  };
};

export const colDefs = [
  "athlete",
  "age",
].map((columnName, index) => convertToColDef(columnName, index));
