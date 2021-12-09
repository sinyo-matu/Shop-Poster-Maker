import React, { useState } from "react";
import styled from "styled-components";
import { ButtonCompo } from "../../../ButtonCompo";

export const ImageSizeRadioButton = ({
  onSelected,
}: {
  onSelected?: (name: string) => void;
}) => {
  const [selected, setSelected] = useState("sm");

  const handleOnClick = (
    _event: React.MouseEvent<HTMLButtonElement>,
    name?: string
  ) => {
    setSelected(name!);
    if (onSelected) onSelected(name!);
  };

  return (
    <Wrapper>
      <ButtonCompo
        name="sm"
        type="circle"
        selected={selected === "sm"}
        onClick={handleOnClick}
      >
        小
      </ButtonCompo>
      <ButtonCompo
        name="md"
        type="circle"
        selected={selected === "md"}
        onClick={handleOnClick}
      >
        中
      </ButtonCompo>
      <ButtonCompo
        name="lg"
        type="circle"
        selected={selected === "lg"}
        onClick={handleOnClick}
      >
        大
      </ButtonCompo>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100px;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;
