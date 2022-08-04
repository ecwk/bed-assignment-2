import { type SettingsItem } from '@common/types';

export const SETTINGS_ITEMS: SettingsItem[] = [
  {
    name: 'Account',
    href: '/settings/account',
    links: [
      {
        name: 'Profile',
        src: '/images/personal-information.svg',
        href: '/settings/account/profile'
      },
      {
        name: 'Preferences',
        src: '/images/selection.svg',
        href: '/settings/account/preferences'
      },
      {
        name: 'Privacy',
        src: '/images/security.svg',
        href: '/settings/account/privacy'
      },
      {
        name: 'Bookings',
        src: '/images/booking.svg',
        href: '/settings/account/bookings'
      }
    ]
  },
  {
    name: 'Billing',
    href: '/settings/billing',
    links: [
      {
        name: 'Payment',
        src: '/images/credit-card.svg',
        href: '/settings/billing/payment'
      },
      {
        name: 'Discounts',
        src: '/images/discounts.svg',
        href: '/settings/billing/discounts'
      }
    ]
  },
  {
    name: 'Others',
    href: '/settings/others',
    links: [
      {
        name: 'Notifications',
        src: '/images/notifications.svg',
        href: '/settings/others/notifications'
      }
    ]
  }
];
