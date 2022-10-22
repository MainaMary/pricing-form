export type FormType = {
  name: string;
  index: number;
  taxation: number;
  discount: number;
  subsidy: number;
  date: any;
  productId: string;
  total?: number;
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
