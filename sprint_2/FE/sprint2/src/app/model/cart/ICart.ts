import {IAccount} from '../account/IAccount';

export interface ICart {
  cartId?: number;
  cartCode?: string;
  cartQuantity?: number;
  cartTotalMoney?: number;
  cartStatus?: boolean;
  cartAccountId?: IAccount;
  cartPurchaseDate?: string;
}
