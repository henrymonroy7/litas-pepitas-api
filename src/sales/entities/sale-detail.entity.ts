/**
 * La entidad 'Detalle de Pedido' almacena información específica sobre cada producto incluido en ese pedido, como cuántos de cada producto se compraron, su precio, etc.
 */
export class SaleDetail {
  id: string;
  saleId: number;
  productId: number;
  quantity: number;
  unitPrice: number;
  subTotal: number; //El costo total del producto (precio unitario x cantidad) antes de impuestos y otros cargos
  discountApplied: number;
  datosDeEntrega?: any;
  stateId: number;
  billing: any; //facturacion conectado con modulo bills
}
