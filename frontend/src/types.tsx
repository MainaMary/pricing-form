export type FormType = {
  name: string;
  index: number;
  taxation: number;
  discount: number;
  subsidy: number;
  date: any;
  createdAt?: any;
  updatedAt?: any;
  productId: string;
  total?: number;
  _id?: string;
};

export type LocationType = {
  site?: string;
  price?: number;
  id?: number;
};
export type SnackbarProps = {
  title: string;
  content: string;
  severity: any;
};
