export interface MenuInfo {
    title: string,
    key: string,
    link: string,
    icon?: string,
    children?: MenuInfo[]
  }