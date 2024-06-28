import dateFormat, { masks } from "dateformat";
import DOMPurify from "dompurify";


export const formatDate = (date) => {
  return dateFormat(date, "mmmm dS, yyyy");
};

export const sanitizeContent = (data) => {
  return  DOMPurify.sanitize(data);
}