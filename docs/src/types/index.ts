import { type IAmicon } from "@studio384/amicons";

export interface IIcon {
  title: string;
  categories: string[];
  tags: string[];
  created: string;
  updated: string;
}

export interface ILibraryIcon {
  component: string;
  categories: string[];
  tags: string[];
  created: string | null;
  updated: string | null;
  slug: string;
  icon: IAmicon;
}

export interface IIconCategory {
  slug: string;
  title: string;
  icon: IAmicon;
}
