import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { ReactNode } from 'react';

export interface SideNavDividerType {
  type: 'divider';
  visible: boolean;
}

export interface SideNavTitleType extends Omit<SideNavDividerType, 'type'> {
  label: string;
  type: 'title';
}

export interface SideNavConfig extends Omit<SideNavDividerType, 'type'>, Omit<SideNavTitleType, 'type'> {
  type?: 'title' | 'divider';
  link?: string;
  icon?: ReactNode;
  children?: (SideNavConfig | SideNavTitleType)[];
}

const sideNavConfig: SideNavConfig[] = [
  {
    label: 'home',
    link: '/home',
    icon: <HomeOutlinedIcon />,
    visible: true,
  },
];

export default sideNavConfig;
