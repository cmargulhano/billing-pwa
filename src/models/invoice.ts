import { Customer } from './customer';

export interface Invoice {
  id?: string;
  competencyDate?: string;
  expirationDate?: string;
  paymentDate?: string;
  value?: number;
  customer?: string;
}
