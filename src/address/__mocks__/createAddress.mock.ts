import { cityMock } from '../../city/__mocks__/city.mock';
import { CreateAddressDto } from '../dto/createAddress.dto';
import { addressMock } from './address.mock';

export const createAddressDtoMock: CreateAddressDto = {
  complement: addressMock.complement,
  cityId: cityMock.id,
  number: addressMock.number,
  cep: addressMock.cep,
};
