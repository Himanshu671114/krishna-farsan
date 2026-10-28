export interface FaralProduct {
  id: string;
  nameMr: string;
  nameEn: string;
  pricePerKg: number;
  descriptionMr: string;
  descriptionEn: string;
  imageCrop: {
    src: string;
    bgPosition: string;
    bgSize: string;
  };
  weightOptions: {
    grams: number;
    labelMr: string;
    labelEn: string;
    multiplier: number;
  }[];
}

export interface ComboItemIncluded {
  nameMr: string;
  nameEn: string;
  quantityMr: string;
  quantityEn: string;
}

export interface FaralCombo {
  id: string;
  nameMr: string;
  nameEn: string;
  subtitleMr: string;
  price: number;
  items: ComboItemIncluded[];
  popular?: boolean;
  image: string;
  imageCrop?: {
    bgPosition: string;
    bgSize: string;
  };
}

export interface CartItem {
  cartId: string; // unique for item + weight combination
  type: 'individual' | 'combo';
  productId: string;
  nameMr: string;
  nameEn: string;
  weightGrams?: number;
  weightLabel?: string;
  unitPrice: number;
  quantity: number;
  image: string;
  imageCrop?: {
    bgPosition: string;
    bgSize: string;
  };
  comboItems?: ComboItemIncluded[];
}

export interface CustomerDetails {
  fullName: string;
  phoneNumber: string;
  deliveryAddress: string;
  locality: string;
  isMalad: boolean;
  notes: string;
}
