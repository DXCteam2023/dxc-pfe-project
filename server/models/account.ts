import mongoose, { Schema, Document } from 'mongoose';

interface IAccountDocument extends Document {
  id: string;
  country: string;
  notes: string | null;
  stock_symbol: string | null;
  number: string;
  sys_updated_by: string;
  sys_created_on: string;
  contact: string | null;
  stock_price: number | null;
  state: string | null;
  sys_created_by: string;
  zip: string;
  phone: string;
  fax_phone: string | null;
  name: string;
  account_code: string;
  primary: boolean;
  city: string;
  sys_class_name: string;
  manufacturer: boolean;
  street: string;
  vendor: boolean;
  theme: string | null;
  vendor_type: string | null;
  sn_ind_tsm_core_external_id: string | null;
  website: string | null;
  registration_code: string;
  customer: boolean;
}

const AccountSchema = new Schema<IAccountDocument>({
  id: { type: String, required: true },
  country: { type: String, required: true },
  notes: { type: String, default: null },
  stock_symbol: { type: String, default: null },
  number: { type: String, required: true },
  sys_updated_by: { type: String, required: true },
  sys_created_on: { type: String, required: true },
  contact: { type: String, default: null },
  stock_price: { type: Number, default: null },
  state: { type: String, default: null },
  sys_created_by: { type: String, required: true },
  zip: { type: String, required: true },
  phone: { type: String, required: true },
  fax_phone: { type: String, default: null },
  name: { type: String, required: true },
  account_code: { type: String, required: true },
  primary: { type: Boolean, required: true },
  city: { type: String, required: true },
  sys_class_name: { type: String, required: true },
  manufacturer: { type: Boolean, required: true },
  street: { type: String, required: true },
  vendor: { type: Boolean, required: true },
  theme: { type: String, default: null },
  vendor_type: { type: String, default: null },
  sn_ind_tsm_core_external_id: { type: String, default: null },
  website: { type: String, default: null },
  registration_code: { type: String, required: true },
  customer: { type: Boolean, required: true },
});

const Account = mongoose.model<IAccountDocument>('Account', AccountSchema);

export default Account;
