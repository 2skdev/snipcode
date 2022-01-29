const getQueryAsString = (value: string | string[]): string => {
  return Array.isArray(value) ? value[0] : value;
};

const getQueryAsNumber = (value: string | string[]): number | undefined => {
  const parsed = parseInt(getQueryAsString(value), 10);
  return isNaN(parsed) ? undefined : parsed;
};

export { getQueryAsString, getQueryAsNumber };
