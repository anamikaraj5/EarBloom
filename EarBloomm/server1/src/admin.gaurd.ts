// admin.guard.ts
import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest() as Request & { user?: any };
    const user = request.user;
    console.log(user)


    if (!user || user.role !== 'admin') {
      throw new ForbiddenException('Admins only!');
    }

    return true;
  }
}
