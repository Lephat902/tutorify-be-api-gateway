import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Token = createParamDecorator((_, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest();

  return req.token || null;
});