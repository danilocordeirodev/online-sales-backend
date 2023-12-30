import { cityMock } from '../../city/__mocks__/city.mock';
import { AddressEntity } from '../entities/address.entity';
import { userEntityMock } from '../../user/__mocks__/user.mock';

export const addressMock: AddressEntity = {
  createdAt: new Date(),
  id: 1231,
  complement: 'cityName',
  updatedAt: new Date(),
  cityId: cityMock.id,
  number: 55,
  userId: userEntityMock.id,
  cep: '1234567897',
};
