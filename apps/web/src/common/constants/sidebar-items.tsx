import { FaUsers } from 'react-icons/fa';
import { MdFlight } from 'react-icons/md';
import { SettingsIcon } from '@chakra-ui/icons';
import { RiBuilding3Fill } from 'react-icons/ri';

import { type SidebarItem } from '@common/types';

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    icon: <MdFlight fontSize="20px" />,
    name: 'Flights',
    href: '/search?type=flight',
    iconSpacing: 4
  },
  {
    icon: <RiBuilding3Fill fontSize="20px" />,
    name: 'Airports',
    href: '/search?type=airport',
    iconSpacing: 4
  },
  {
    icon: <FaUsers fontSize="20px" />,
    name: 'Users',
    href: '/search?type=user',
    iconSpacing: 4
  },
  {
    icon: <SettingsIcon />,
    name: 'Settings',
    href: '/settings',
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
