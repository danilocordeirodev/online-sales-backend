import { categoryMock } from '../../category/__mocks__/category.mock';
import { ProductEntity } from '../entities/product.entity';

export const productMock: ProductEntity = {
  createdAt: new Date(),
  id: 1231,
  name: 'state',
  updatedAt: new Date(),
  categoryId: categoryMock.id,
  price: 50,
  image: 'http:image.com',
};
