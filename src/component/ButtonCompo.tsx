import React, { useState } from "react";
import Button from "../styles/atoms/Button";

interface Props {
  children?: React.ReactElement | string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>, name?: string) => void;
  type?: "circle" | "pill";
  selected?: boolean;
  name?: string;
  animated?: boolean;
}

export const ButtonCompo = ({
  children,
  onClick,
  type,
  selected,
  name,
  animated = true,
}: Props) => {
  const [clicked, setClicked] = useState(false);
  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(event, name);
    }
    setClicked(true);
    if (animated) setTimeout(() => setClicked(false), 500);
  };
  return (
    <Button
      name={name}
      clicked={animated && clicked}
      buttontype={type}
      onClick={handleOnClick}
      selected={selected}
    >
      {children}
    </Button>
  );
};
