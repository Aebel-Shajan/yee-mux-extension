import React, { type ButtonHTMLAttributes } from "react";
import styles from "./IconButton.module.css";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const IconButton = (
  {
    children,
    ...props
  }: IconButtonProps
) => {
  return (
    <button className={styles.iconButton} {...props}>
      {children}
    </button>
  );
};

export default IconButton;
