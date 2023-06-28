import { lazy } from 'react';
import { IconEnum } from '../../../../ui/Icon/IconSidenav';
import { FeaturesEnum } from './getFeaturesFromShopType';

const DashboardComponent = lazy(() => import('app/components/features/Home/Home'));
const BillingComponent = lazy(() => import('app/components/features/Billing/Billing'));
const OrdersComponent = lazy(() => import('app/components/features/Orders/Orders'));
const StatisticsComponent = lazy(() => import('app/components/features/Statistics/Statistics'));
const DeliveryComponent = lazy(() => import('app/components/features/Delivery/Delivery'));
const ProductsManager = lazy(() => import('app/components/features/ProductManager/ProductManager'));
const TransactionsComponent = lazy(() => import('app/components/features/Transactions/Transactions'));
const StorageManagerAdmin = lazy(() => import('app/components/features/StorageManagerAdmin/StorageManagerAdmin'));

export interface Feature {
  name: string;
  component: React.ComponentType;
  icon: IconEnum;
}

type ComponentListType = {
  [key in FeaturesEnum]: Feature;
};

const ComponentList : ComponentListType= {
    Home: {
      name: 'Home',
      component: DashboardComponent,
      icon: IconEnum.Home,
    },
    Billing: {
      name: 'Billing',
      component: BillingComponent,
      icon: IconEnum.Billing,
    },
    Orders: {
      name: 'Orders',
      component: OrdersComponent,
      icon: IconEnum.Orders,
    },
    Statistics: {
      name: 'Statistics',
      component: StatisticsComponent,
      icon: IconEnum.Statistics,
    },
    Delivery: {
      name: 'Delivery',
      component: DeliveryComponent,
      icon: IconEnum.Delivery,
    },
    Products: {
      name: 'Products',
      component: ProductsManager,
      icon: IconEnum.Catalogue,
    },
    Transactions: {
      name: 'Transactions',
      component: TransactionsComponent,
      icon: IconEnum.Transactions,
    },
    Inventory: {
      name: 'Inventory',
      component: DeliveryComponent,
      icon: IconEnum.Inventory,
    },
    ImagePoolManagerAdmin: {
      name: 'Storage Manager Admin',
      component: StorageManagerAdmin,
      icon: IconEnum.Catalogue
    }
};

function getComponentsFromFeatures(featureList: FeaturesEnum[]) :Feature[]{
  return featureList.map((feature) => ComponentList[feature]);
}

export default getComponentsFromFeatures;