import {IAccount} from './IAccount';
import {IRole} from './IRole';

export interface IAccountRole {
  accountRoleId?: number;
  accountId?: IAccount;
  roleId?: IRole;
}
