const getDateTimeLocaleFormat = (date) => {
  date = new Date(date);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
  };
  return date.toLocaleString("en-US", options);
};

export { getDateTimeLocaleFormat };
