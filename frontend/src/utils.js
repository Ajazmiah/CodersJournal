import dateFormat, { masks } from "dateformat";
import DOMPurify from "dompurify";

export const formatDate = (date) => {
  return dateFormat(date, "mmmm dS, yyyy");
};

export const sanitizeContent = (data) => {
  return DOMPurify.sanitize(data);
};

export const validateInputs = (...inputs) => {
  let errors = "";

  inputs.forEach((input) => {
    if (input === "" || input === null) {
      errors = `everything must be filled\n`;
    }
  });

  if (errors.length > 0) {
    toast.error(errors);
    return false;
  }

  return true;
};
