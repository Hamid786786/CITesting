import {ICarouselSlide} from './carousel-slide';

export interface ILoginRes {
  tId: number;
  logoURL: string;
  logoALT: string;
  slides: ICarouselSlide[];
  favicon: string;
  title: string;
}
