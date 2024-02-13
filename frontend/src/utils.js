import dateFormat, { masks } from "dateformat";

export const formatDate = (date) => {
  return dateFormat(date, "mmmm dS, yyyy");
};
