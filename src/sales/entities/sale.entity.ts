export class Sale {
  id: string; //uuid o algo asi
  totalSale: number;
  state: string[];
  shippingAddress: string[]; //Puede tener varias direcciones de envio
  paymentMethod: string;
  products: any[];
}
