import { stateMock } from '../../state/__mocks__/state.mock';
import { CityEntity } from '../entities/city.entity';

export const cityMock: CityEntity = {
  createdAt: new Date(),
  id: 1231,
  name: 'cityName',
  updatedAt: new Date(),
  stateId: stateMock.id,
};
