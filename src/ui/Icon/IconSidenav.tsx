import { Suspense, FC } from 'react';
import { lazy } from 'react';

const HomeIcon = lazy(() =>
  import('assets/icons/dashboard.svg').then((module) => ({ default: module.ReactComponent })),
);
const BillingIcon = lazy(() =>
  import('assets/icons/billing.svg').then((module) => ({ default: module.ReactComponent })),
);
const OrdersIcon = lazy(() =>
  import('assets/icons/orders.svg').then((module) => ({ default: module.ReactComponent })),
);
const ReportsIcon = lazy(() =>
  import('assets/icons/reports.svg').then((module) => ({ default: module.ReactComponent })),
);
const DeliveryIcon = lazy(() =>
  import('assets/icons/delivery.svg').then((module) => ({ default: module.ReactComponent })),
);
const ProfileIcon = lazy(() =>
  import('assets/icons/profile.svg').then((module) => ({ default: module.ReactComponent })),
);
const CatalogueIcon = lazy(() =>
  import('assets/icons/menu.svg').then((module) => ({ default: module.ReactComponent })),
);
const TransactionsIcon = lazy(() =>
  import('assets/icons/transactions.svg').then((module) => ({ default: module.ReactComponent })),
);
const AccountIcon = lazy(() =>
  import('assets/icons/profile.svg').then((module) => ({ default: module.ReactComponent })),
);
const FirebaseIcon = lazy(() =>
  import('assets/icons/profile.svg').then((module) => ({ default: module.ReactComponent })),
);

export enum IconEnum {
    Home = "Home",
    Billing = "Billing",
    Orders = "Orders",
    Statistics = "Statistics",
    Delivery = "Delivery",
    Inventory = "Inventory",
    Transactions = "Transactions",
    Catalogue = "Catalogue",
    Account = "Account",
    Firebase = "Firebase"
}

interface IconMapType {
    [key: string]: React.FC;
}
  
export const iconMap: IconMapType = {
    [IconEnum.Home]: HomeIcon,
    [IconEnum.Billing]: BillingIcon,
    [IconEnum.Orders]: OrdersIcon,
    [IconEnum.Statistics]: ReportsIcon,
    [IconEnum.Delivery]: DeliveryIcon,
    [IconEnum.Inventory]: ProfileIcon,
    [IconEnum.Transactions]: TransactionsIcon,
    [IconEnum.Catalogue]: CatalogueIcon,
    [IconEnum.Account]: AccountIcon,
    [IconEnum.Account]: AccountIcon,
    [IconEnum.Firebase]: FirebaseIcon,
};
  
interface IconSidenavProps {
  iconName: keyof typeof IconEnum;
  fill?: string;
  zoom?: boolean;
  [key: string]: any;
}

const IconSidenav: FC<IconSidenavProps> = ({ iconName, fill = 'white', zoom, ...props }) => {
  const IconComponent = iconName ? iconMap[iconName] : null;
  const size = zoom ? '1.5rem' : '1rem';
  return (
    <Suspense fallback={<div>.</div>}>
      {IconComponent && (
        <svg viewBox="0 0 512 512" style={{ height: size, width: size, fill: fill }} {...props}>
          <IconComponent />
        </svg>
      )}
    </Suspense>
  );
};

export default IconSidenav;
