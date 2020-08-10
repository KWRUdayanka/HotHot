export type RootStackParamList = {
  Root: undefined;
  Menu: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
  TabThree: undefined;
};

export type TabOneParamList = {
  Notification: undefined;
  menuView: { menuId?: string; title?: string };
  Order: { orderId?: string , title?: string };
  OrderView: { orderId?: string, title?: string };
};

export type TabTwoParamList = {
  Home: undefined;
  Foods: { shopId?: string , name?: string, contactNumber?:string };
  CreateMenu: undefined;
  MenuView: { menuId?: string, title?: string, contactNumber?:string };
  Order: { orderId?: string , title?: string };
  AddProducts: { menuId?: string };
};

export type TabThreeParamList = {
  Profile: undefined;
};

export type AuthParamList = {
  Login: undefined;
  Register: undefined;
};

export type AllUsers = {
  userType?: string;
};

export type User = {
  userName?: string;
  contactNumber?: string;
  address?: string;
  email?: string;
  orders?: Array<string | null>;
};



export type Shop = {
  shopId?: any;
  shopName?: string;
  userName?: string;
  contactNumber?: string;
  address?: string;
  email?: string;
  menus?: Array<string | null>;
  orders?: Array<string | null>;
};

export type Driver = {
  userName?: string;
  contactNumber?: string;
  address?: string;
  email?: string;
  orders?: Array<string | null>;
};

export type Menu = {
  ownerId?: string;
  menuId?: string;
  foodItem?: string;
  itemNo?: string;
  image?:string;
  description?: string;
  available?: boolean;
}

export type Order = {
  userId?: string;
  menuId?: string;
  orderId?: any;
  foodItem?: string;
  itemNo?: string;
  shopId?:string;
  description?: string;
  acceptOrder?: boolean;
  driverAcceptOrder?: boolean
}
