import React from "react";
import Styles from "./PageHeader.module.css";
import classnames from "classnames";

export default function PageHeader({ title, summary }) {
  return (
    <>
      <h1 className={"heading-1 space-bottom "}>{title}</h1>
      <p>{summary}</p>
    </>
  );
}
