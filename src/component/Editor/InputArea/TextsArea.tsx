import { useAtom } from "jotai";
import React, { useState } from "react";
import styled from "styled-components";
import { deriveFadeIn } from "../../../styles/animation";
import { Color } from "../../../styles/Color";
import { TextGroupType } from "../../../types/poster";
import Input from "../../../styles/atoms/TextArea";

export const TextsArea = ({ type }: { type: TextGroupType }) => {
  const [property, setProperty] = useAtom(type.atom);
  const [textContent, setTextContent] = useState(property.content);
  const handleTextsAreaOnChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const changedValue = event.target.value;
    setProperty({ ...property, content: changedValue });
    setTextContent(changedValue);
  };
  return (
    <Wrapper>
      <AreaTitle>正文</AreaTitle>
      <TextArea value={textContent} onChange={handleTextsAreaOnChange} />
    </Wrapper>
  );
};

const Wrapper = deriveFadeIn(styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
`);

const TextArea = styled(Input)`
  height: 100px;
`;

const AreaTitle = styled.div`
  font-size: 14px;
  color: ${Color.MAIN};
`;
