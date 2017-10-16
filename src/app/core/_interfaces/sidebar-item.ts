export interface ISidebarItem {
  label: string;
  icon: string;
  routerUrl?: string;
  badgeNum?: number;
  rollId?: string;
  [subRole: number]: string;
}
