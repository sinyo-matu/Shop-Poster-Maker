import { useAtom } from "jotai";
import React from "react";
import styled from "styled-components";
import { deriveFadeIn } from "../../../styles/animation";
import { Color } from "../../../styles/Color";
import { SubTitleTextType } from "../../../types/poster";
import Input from "../../../styles/atoms/TextArea";

export const SubTitleArea = ({ type }: { type: SubTitleTextType }) => {
  const [property, setProperty] = useAtom(type.atom);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProperty({ ...property, content: event.target.value });
  };

  return (
    <FadeInWrapper>
      <AreaTitle>副标题</AreaTitle>
      <Input value={property.content} onChange={handleTextChange} />
    </FadeInWrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
`;

const FadeInWrapper = deriveFadeIn(Wrapper);

const AreaTitle = styled.div`
  font-size: 14px;
  color: ${Color.MAIN};
`;
