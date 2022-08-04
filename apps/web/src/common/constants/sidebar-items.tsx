import {
  MdFlight,
  MdSpaceDashboard,
  MdAdminPanelSettings
} from 'react-icons/md';
import { FaUsers } from 'react-icons/fa';
import { RiBuilding3Fill } from 'react-icons/ri';
import { SettingsIcon } from '@chakra-ui/icons';

import { type SidebarItem } from '@common/types';

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: <MdSpaceDashboard fontSize="20px" />,
    iconSpacing: 4
  },
  {
    name: 'Admin',
    href: '/admin',
    icon: <MdAdminPanelSettings fontSize="20px" />,
    iconSpacing: 4,
    nestedItems: [
      {
        name: 'Flights',
        href: '/admin/flights'
      },
      {
        name: 'Airports',
        href: '/admin/airports'
      },
      {
        name: 'Users',
        href: '/admin/users'
      },
      {
        name: 'Bookings',
        href: '/admin/bookings'
      }
    ]
  },
  {
    name: 'Flights',
    href: '/search?type=flight',
    icon: <MdFlight fontSize="20px" />,
    iconSpacing: 4
  },
  {
    name: 'Airports',
    href: '/search?type=airport',
    icon: <RiBuilding3Fill fontSize="20px" />,
    iconSpacing: 4
  },
  {
    name: 'Users',
    href: '/search?type=user',
    icon: <FaUsers fontSize="20px" />,
    iconSpacing: 4
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: <SettingsIcon />,
    iconSpacing: 4,
    nestedItems: [
      {
        name: 'Account',
        href: '/settings/account',
        nestedItems: [
          {
            name: 'Profile',
            href: '/settings/account/profile'
          },
          {
            name: 'Preferences',
            href: '/settings/account/preferences'
          },
          {
            name: 'Privacy',
            href: '/settings/account/privacy'
          },
          {
            name: 'Bookings',
            href: '/settings/account/bookings'
          }
        ]
      },
      {
        name: 'Billing',
        href: '/settings/billing',
        nestedItems: [
          {
            name: 'Payment',
            href: '/settings/billing/payment'
          },
          {
            name: 'Discounts',
            href: '/settings/billing/discounts'
          }
        ]
      },
      {
        name: 'Others',
        href: '/settings/others',
        nestedItems: [
          {
            name: 'Notifications',
            href: '/settings/others/notifications'
          }
        ]
      }
    ]
  }
];
