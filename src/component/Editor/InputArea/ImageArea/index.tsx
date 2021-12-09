import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { deriveFadeIn, PopUp } from "../../../../styles/animation";
import { Color } from "../../../../styles/Color";
import { ImageType } from "../../../../types/poster";
import { ImageSizeRadioButton } from "./ImageSizeRadioButton";
import { IMAGE_SIZE } from "../../../../styles/Size";
import { open as openDialog } from "@tauri-apps/api/dialog";
import {
  createAppData,
  loadAppData,
  readFile,
  removeAppData,
} from "../../../../lib/fileOpe";
export const ImageArea = ({ type }: { type: ImageType }) => {
  const [property, setProperty] = useAtom(type.atom);
  const [uploading, setUploading] = useState(false);
  const [localUrl, setLocalUrl] = useState("");
  useEffect(() => {
    const loadAndSet = async () => {
      if (property.filePath) {
        const blob = await loadAppData(property.filePath);
        const url = (window.URL || window.webkitURL).createObjectURL(blob);
        setLocalUrl(url);
      }
    };
    loadAndSet();
  }, [property.filePath]);

  const handleUpload = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      setUploading(true);
      const path = await openDialog();
      const file = await readFile(path as string);
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `images/${fileName}`;
      try {
        await createAppData(filePath, await file.arrayBuffer());
      } catch (e) {
        throw e;
      }
      if (property.filename !== "") {
        await removeAppData(property.filePath);
      }
      setProperty({ ...property, filename: file.name, filePath: filePath });
    } catch (error: any) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSizeSelected = (name: string) => {
    let size: IMAGE_SIZE;
    switch (name) {
      case "sm":
        size = IMAGE_SIZE.SM;
        break;
      case "md":
        size = IMAGE_SIZE.MD;
        break;
      case "lg":
        size = IMAGE_SIZE.LG;
        break;
      default:
        size = IMAGE_SIZE.MD;
    }
    setProperty({ ...property, size: size });
  };

  return (
    <FadeInWrapper>
      <AreaTitle>
        图片{property.filename ? `:${property.filename}` : null}
      </AreaTitle>
      {localUrl ? (
        <ImagePreview
          imageWidth={property.size}
          src={localUrl}
          alt="preview image"
        />
      ) : null}
      <FileInputWrapper>
        <UploadButton onClick={handleUpload}>
          {uploading ? "加载中" : "上传图片"}
        </UploadButton>
        <ImageSizeRadioButton onSelected={handleSizeSelected} />
      </FileInputWrapper>
    </FadeInWrapper>
  );
};

const Wrapper = deriveFadeIn(styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`);

const FadeInWrapper = deriveFadeIn(Wrapper);

interface ImageProps {
  imageWidth?: IMAGE_SIZE;
}
const ImagePreview = styled.img<ImageProps>`
  width: ${(props) => (props.imageWidth ? props.imageWidth : IMAGE_SIZE.MD)}px;
  max-width: 100%;
`;
const AreaTitle = styled.div`
  align-self: flex-start;
  font-size: 14px;
  color: ${Color.MAIN};
`;
const FileInputWrapper = styled.div`
  width: 350px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

interface LabelPropers {
  clicked?: boolean;
}

const UploadButton = styled.button<LabelPropers>`
  flex-grow: 1;
  display: inline-block;
  background-color: ${Color.Default};
  min-height: 20px;
  min-width: 20px;
  padding: 5px;
  border: 1px solid ${Color.MAIN};
  border-radius: 9999px;
  color: ${Color.MAIN};
  text-align: center;
  cursor: pointer;
  box-shadow: 0px 0px 1px ${Color.MAIN};
  transition: 0.2s;
  ${(props) => (props.clicked ? PopUp : null)};
  &:hover {
    background-color: ${Color.MAIN};
    color: white;
    border-color: ${Color.MAIN};
    box-shadow: 0px 0px 3px ${Color.MAIN};
  }
`;
