export type SidebarItem = {
  name: string;
  href: string;
  icon?: React.ReactElement;
  iconSpacing?: string | number;
  nestedItems?: SidebarItem[];
};
