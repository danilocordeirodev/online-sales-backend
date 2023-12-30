import { UserEntity } from '../entities/user.entity';
import { UserType } from '../enum/user-type.enum';

export const userEntityMock: UserEntity = {
  cpf: '12345678900',
  createdAt: new Date(),
  email: 'uhasu@jkfj.com',
  id: 4566,
  name: 'nameMock',
  password: 'largePassword',
  phone: '4656666688',
  typeUser: UserType.User,
  updatedAt: new Date(),
};
