import { atom, PrimitiveAtom } from "jotai";
import {
  ImageProperty,
  ImageType,
  SubTitleProperty,
  SubTitleTextType,
  TextGroupProperty,
  TextGroupType,
  TitleProperty,
  TitleTextType,
} from "../types/poster";
import { atomWithStorage, getYearMonthDay } from "./utility";

const textsKey = `texts-init`;
export const textsAtom = atomWithStorage<TextGroupProperty>(textsKey, {
  content:
    "由于老板出国旅游不管员工\n先全部清仓大甩卖，半价！半价！全部半价！\n\n本活动将持续到老板回来为止!!",
});
const titleKey = `title-init`;
export const titleAtom = atomWithStorage<TitleProperty>(titleKey, {
  content: "特价大优惠",
});
const subTitleKey = `subTitle-init`;
export const subTitleAtom = atomWithStorage<SubTitleProperty>(subTitleKey, {
  content: "半价！半价！全部半价！！",
});

const titleText = new TitleTextType(titleKey, titleAtom);

const subTitleText = new SubTitleTextType(subTitleKey, subTitleAtom);

const textGroup = new TextGroupType(textsKey, textsAtom);

export const contentsAtomsAtom = atomWithStorage<
  (TitleTextType | SubTitleTextType | TextGroupType | ImageType)[]
>("atoms", [titleText, subTitleText, textGroup], {
  setItem: (key, newValue) => {
    const contentKeys = newValue.map((type) => {
      return type.key;
    });
    localStorage.setItem(key, JSON.stringify(contentKeys));
  },
  getItem: (key) => {
    const contentKeys: string[] = JSON.parse(localStorage.getItem(key)!);
    const types: (
      | TitleTextType
      | SubTitleTextType
      | TextGroupType
      | ImageType
    )[] = contentKeys.map((key) => {
      const keyPrefix = key.split("-")[0];
      switch (keyPrefix) {
        case "title":
          const titleRaw = localStorage.getItem(key);
          const titleAtom: PrimitiveAtom<TitleProperty> = atomWithStorage(
            key,
            JSON.parse(titleRaw ? titleRaw : " ")
          );
          return new TitleTextType(key, titleAtom);
        case "subTitle":
          const subTitleRaw = localStorage.getItem(key);
          const subTitleAtom: PrimitiveAtom<SubTitleProperty> = atomWithStorage(
            key,
            JSON.parse(subTitleRaw ? subTitleRaw : " ")
          );
          return new SubTitleTextType(key, subTitleAtom);
        case "texts":
          const textsRaw = localStorage.getItem(key);
          const textsAtom: PrimitiveAtom<TextGroupProperty> = atomWithStorage(
            key,
            JSON.parse(textsRaw ? textsRaw : " ")
          );
          return new TextGroupType(key, textsAtom);
        case "image":
          const imageRaw = localStorage.getItem(key);
          const imageAtom: PrimitiveAtom<ImageProperty> = atomWithStorage(
            key,
            JSON.parse(imageRaw ? imageRaw : " ")
          );
          return new ImageType(key, imageAtom);
        default:
          const defaultAtom: PrimitiveAtom<TitleProperty> = atomWithStorage(
            key,
            JSON.parse(localStorage.getItem(key)!)
          );
          return new TitleTextType(key, defaultAtom);
      }
    });
    return types;
  },
});

export const posterTitleAtom = atom<String>((get) => {
  const [year, month, day] = getYearMonthDay();
  const suffix = `${year}-${month}-${day}`;
  const titleTypes = get(contentsAtomsAtom).filter(
    (type): type is TitleTextType => type.kind === "titleText"
  );
  if (titleTypes.length === 0) {
    return `poster_${suffix}`;
  }
  const firstTitle = get(titleTypes[0].atom);
  if (firstTitle.content.length === 0) {
    return `poster_${suffix}`;
  }
  return `${firstTitle.content}_${suffix}`;
});
