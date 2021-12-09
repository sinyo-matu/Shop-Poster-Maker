import { useAtom } from "jotai";
import React from "react";
import styled from "styled-components";
import { deriveFadeIn } from "../../../styles/animation";
import { Color } from "../../../styles/Color";
import { TitleTextType } from "../../../types/poster";
import Input from "../../../styles/atoms/TextArea";
export const TitleArea = ({ type }: { type: TitleTextType }) => {
  const [text, setText] = useAtom(type.atom);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText({ ...text, content: event.target.value });
  };

  return (
    <Wrapper>
      <AreaTitle>主标题</AreaTitle>
      <Input value={text.content} onChange={handleTextChange} />
    </Wrapper>
  );
};

const Wrapper = deriveFadeIn(styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
`);

const AreaTitle = styled.div`
  font-size: 20px;
  color: ${Color.MAIN};
`;
