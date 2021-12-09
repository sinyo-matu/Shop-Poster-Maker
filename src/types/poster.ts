import { PrimitiveAtom } from "jotai";
import { IMAGE_SIZE } from "../styles/Size";
interface PosterContent {}
export interface TitleProperty {
  content: string;
}
export interface SubTitleProperty {
  content: string;
}
export interface TextGroupProperty {
  content: string;
}

export interface ImageProperty {
  filename: string;
  filePath: string;
  size: IMAGE_SIZE;
}

export class TitleTextType implements PosterContent {
  constructor(key: string, atom: PrimitiveAtom<TitleProperty>) {
    this.kind = "titleText";
    this.key = key;
    this.atom = atom;
  }
  kind: "titleText";
  key: string;
  atom: PrimitiveAtom<TitleProperty>;
}

export class SubTitleTextType implements PosterContent {
  constructor(key: string, atom: PrimitiveAtom<SubTitleProperty>) {
    this.kind = "subTitleText";
    this.key = key;
    this.atom = atom;
  }
  kind: "subTitleText";
  key: string;
  atom: PrimitiveAtom<SubTitleProperty>;
}

export class TextGroupType implements PosterContent {
  constructor(key: string, atom: PrimitiveAtom<TextGroupProperty>) {
    this.kind = "textGroup";
    this.key = key;
    this.atom = atom;
  }
  kind: "textGroup";
  key: string;
  atom: PrimitiveAtom<TextGroupProperty>;
}

export class ImageType implements PosterContent {
  constructor(key: string, atom: PrimitiveAtom<ImageProperty>) {
    this.kind = "image";
    this.key = key;
    this.atom = atom;
  }
  kind: "image";
  key: string;
  atom: PrimitiveAtom<ImageProperty>;
}
