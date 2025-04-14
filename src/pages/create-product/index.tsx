import { TProductEssential } from '../../shared/types/store.types.ts';

import { ProductForm } from '../../components';

interface IProductCreatePage {
  productInformation: TProductEssential;
}

export function ProductCreatePage({ productInformation }: IProductCreatePage) {
  return <ProductForm productInformation={productInformation} />;
}
