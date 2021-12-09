import { useAtom } from "jotai";
import styled from "styled-components";
import { textsAtom } from "../../lib/store";
import TextWrapper from "../../styles/atoms/TextWrapper";
export const TextGroup = ({ atom }: { atom: typeof textsAtom }) => {
  const [property] = useAtom(atom);
  if (!property.content) {
    return null;
  }
  return (
    <TextGroupWrapper>
      {property.content.split("\n\n").map((text, i) => {
        return (
          <Wrapper key={i}>
            {text.split("\n").map((subText, i) => {
              if (i === text.split("\n").length - 1) {
                return <>{subText}</>;
              }
              return (
                <>
                  {subText}
                  <br />
                </>
              );
            })}
          </Wrapper>
        );
      })}
    </TextGroupWrapper>
  );
};

const TextGroupWrapper = styled.div`
  background-color: inherit;
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  z-index: 2;
`;

const Wrapper = styled(TextWrapper)`
  font-size: calc(8px + 1vmin);
`;
