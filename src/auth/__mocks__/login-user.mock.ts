import { userEntityMock } from '../../user/__mocks__/user.mock';
import { LoginDto } from '../dtos/login.dto';

export const loginDtoMock: LoginDto = {
  email: userEntityMock.email,
  password: 'abc',
};
