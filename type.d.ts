interface CustomInputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  label: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
}

interface CustomButtonProps {
  onPress?: () => void;
  title?: string;
  style?: any;
  textStyle?: any;
  leftIcon?: React.ReactNode;
  isLoading?: boolean;
}

interface AuthState {
  isAuthenticated: boolean;
  username: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
}

interface MenuItem {
  id: string;
  image: ImageSourcePropType;
  name: string;
  category: string;
  price: number;
}

interface MenuProp {
  menu: MenuItem[];
}
interface categoryItem {
  id: string;
  name: string;
}
interface categoriesProp {
  categories: categoryItem[];
}

interface CartItem {
  menu: MenuItem;
  amount: number;
}

interface CartProp {
  cart: CartItem[];
  totalPrice: number;
  totalItems: number;
}
