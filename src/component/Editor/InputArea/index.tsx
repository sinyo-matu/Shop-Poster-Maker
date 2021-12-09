import React from "react";
import styled from "styled-components";
import {
  ImageType,
  SubTitleTextType,
  TextGroupType,
  TitleTextType,
} from "../../../types/poster";
import { ImageArea } from "./ImageArea";
import { SubTitleArea } from "./SubTitleArea";
import { TextsArea } from "./TextsArea";
import { TitleArea } from "./TitleArea";
import { AddButtons } from "./AddButtons";
import { DeleteButton } from "./DeleteButton";

export const InputArea = ({
  type,
  index,
}: {
  type: TitleTextType | SubTitleTextType | TextGroupType | ImageType;
  index: number;
}) => {
  const getInputComponent = () => {
    switch (type.kind) {
      case "titleText":
        return <TitleArea type={type} />;
      case "subTitleText":
        return <SubTitleArea type={type} />;
      case "textGroup":
        return <TextsArea type={type} />;
      case "image":
        return <ImageArea type={type} />;
    }
  };
  return (
    <InputCompoWrapper>
      <DeleteButton index={index} type={type} />
      {getInputComponent()}
      <AddButtons index={index} />
    </InputCompoWrapper>
  );
};

const InputCompoWrapper = styled.div`
  width: 70%;
  margin-top: 5px;
  position: relative;
`;
