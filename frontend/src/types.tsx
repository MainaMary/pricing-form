export type FormType = {
  name: string;
  index: number;
  tax: number;
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
