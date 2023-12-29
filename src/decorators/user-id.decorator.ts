import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { authorizantionToLoginPayload } from '../utils/base64-converter';

export const UserId = createParamDecorator((_, ctx: ExecutionContext) => {
  const { authorization } = ctx.switchToHttp().getRequest().headers;

  const loginPayload = authorizantionToLoginPayload(authorization);

  return loginPayload.id;
});
