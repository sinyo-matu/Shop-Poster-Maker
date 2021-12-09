import { useAtom } from "jotai";
import { atomWithStorage } from "../../../lib/utility";
import styled from "styled-components";
import { contentsAtomsAtom } from "../../../lib/store";
import { random } from "../../../lib/utility";
import { Color } from "../../../styles/Color";
import { ButtonCompo } from "../../ButtonCompo";
import {
  ImageProperty,
  ImageType,
  SubTitleTextType,
  TextGroupType,
  TitleTextType,
} from "../../../types/poster";
import { IMAGE_SIZE } from "../../../styles/Size";

export const AddButtons = ({ index }: { index: number }) => {
  const [contentsAtoms, setContentsAtoms] = useAtom(contentsAtomsAtom);
  const handleTitleButtonOnClick = () => {
    const key = `title-${random()}`;
    const titleAtom = atomWithStorage(key, { content: "" });
    const title = new TitleTextType(key, titleAtom);
    contentsAtoms.splice(index + 1, 0, title);
    setContentsAtoms([...contentsAtoms]);
  };
  const handleSubTitleButtonOnClick = () => {
    const key = `subTitle-${random()}`;
    const titleAtom = atomWithStorage(key, { content: "" });
    const title = new SubTitleTextType(key, titleAtom);
    contentsAtoms.splice(index + 1, 0, title);
    setContentsAtoms([...contentsAtoms]);
  };
  const handleTextGroupButtonOnClick = () => {
    const key = `texts-${random()}`;
    const titleAtom = atomWithStorage(key, { content: "" });
    const title = new TextGroupType(key, titleAtom);
    contentsAtoms.splice(index + 1, 0, title);
    setContentsAtoms([...contentsAtoms]);
  };
  const handleImageButtonClick = () => {
    const key = `image-${random()}`;
    const imageAtom = atomWithStorage<ImageProperty>(key, {
      filename: "",
      filePath: "",
      size: IMAGE_SIZE.SM,
    });
    const image = new ImageType(key, imageAtom);
    contentsAtoms.splice(index + 1, 0, image);
    setContentsAtoms([...contentsAtoms]);
  };

  return (
    <Wrapper>
      <ButtonsWrapper>
        <ButtonCompo onClick={handleTitleButtonOnClick}>主标题</ButtonCompo>
        <ButtonCompo onClick={handleSubTitleButtonOnClick}>副标题</ButtonCompo>
        <ButtonCompo onClick={handleTextGroupButtonOnClick}>正文</ButtonCompo>
        <ButtonCompo onClick={handleImageButtonClick}>图片</ButtonCompo>
      </ButtonsWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  margin-top: 20px;
  width: 100%;
  min-height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:before {
    content: "";
    position: absolute;
    background-color: ${Color.MAIN};
    height: 1px;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    z-index: 100;
    transition: opacity 0.5s;
  }
  &:after {
    content: "+";
    height: 25px;
    text-align: center;
    width: 25px;
    background-color: ${Color.Default};
    border-radius: 50%;
    text-align: center;
    border: 1px solid ${Color.MAIN};
    color: ${Color.MAIN};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-45%);
    transition: opacity 0.5s;
    z-index: 101;
  }

  &:hover::after {
    opacity: 0;
    z-index: -1;
  }

  &:hover::before {
    opacity: 0;
    z-index: -1;
  }
`;

const ButtonsWrapper = styled.div`
  height: 30px;
  display: flex;
  width: 80%;
  flex-direction: row;
  justify-content: center;

  align-items: center;
  transform: scaleY(0) scaleX(0);
  opacity: 0;
  gap: 20px;
  transition: 0.5s;
  ${Wrapper}:hover & {
    opacity: 1;
    transform: scaleY(1) scaleX(1);
  }
`;
