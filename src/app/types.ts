import { z } from "zod";

// Base product type
export type ProductType = {
  id: number;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  size: string[];
  color: string[];
  image: Record<string, string>;
  category: string;
};

export type ProductListType = ProductType[];

// Extended cart item type
export type CartItemType = ProductType & {
  quantity: number;
  selectSize: string;
  selectColor: string;
};

export type CartItemsType = CartItemType[];

export const shippingFormSchema = z.object({
  name: z.string().min(1, "name is required"),
  email: z.string().email("Invalid email").min(1, "email is required"),
  phone: z.string()
    .min(7, "Phone number must be at least 7 digits")
    .max(15, "Phone number cannot exceed 15 digits")
    .regex(/^[0-9+()\s-]*$/, "Phone number can only contain numbers, +, -, (, ) or spaces"),
  address: z.string().min(1, "Address is required!"),
  City: z.string().min(1, "City is required!")       
});

export type ShippingFormInputs = z.infer<typeof shippingFormSchema>;

export const PaymentFormSchema = z.object({
  CardHolder: z.string().min(1, "Card holder name is required"),
  CardNumber: z.string()
    .min(16, "Card number must be at least 16 digits")
    .max(19, "Card number cannot exceed 19 digits")
    .regex(/^[0-9\s]+$/, "Card number can only contain numbers and spaces"),
  ExpirationDate: z.string()
    .regex(
      /^(0[1-9]|1[0-2])\/([0-9]{2}|[0-9]{4})$/,
      "Expiration date must be in MM/YY or MM/YYYY format"
    )
    .refine((val) => {
      const [month, year] = val.split('/');
      const expiryYear = year.length === 2 ? `20${year}` : year;
      const expiryDate = new Date(parseInt(expiryYear), parseInt(month) - 1, 1);
      const currentDate = new Date();
      return expiryDate > currentDate;
    }, "Card has expired"),
  cvv: z.string()
    .min(3, "CVV must be at least 3 digits")
    .max(4, "CVV cannot exceed 4 digits")
    .regex(/^[0-9]+$/, "CVV can only contain numbers")
});

export type PaymentFormInputs = z.infer<typeof PaymentFormSchema>;

export type CartStoreStateType = {
  cart: CartItemType[];
  hasHaydrated:boolean
};

export type CartStoreActionType = {
  addToCart: (product: CartItemType) => void;
  removeFromCart: (product: CartItemType) => void;
  clearCart: () => void;
};