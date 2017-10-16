import {ICarouselSlide} from './carousel-slide';

export interface IDashboardIFrameContent {
  url: string;
}

/*
 define all the choices for the contents of a dashboard grid item
 add items to the enum, example must be either be removed as left
 as the last item in the enum.

 a const enum ensures that the enum is inlined in JS instead of
 requiring a lookup at all times.
 */
export const enum ItemChoices {
  Iframe,
  Carousel,
  Example
}

export interface IDashboardCarouselContent {
  slides: ICarouselSlide[];
}

export interface IDashboardItem {
  type: string;
  id: number;
  w: number;
  h: number;
  x: number;
  y: number;
  title?: string;
  subtitle?: string;
  content: IDashboardIFrameContent | IDashboardCarouselContent | void;
}

export interface IDashboardRes {
  items: IDashboardItem[];
}
