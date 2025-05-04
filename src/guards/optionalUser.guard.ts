import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class OptionalUserGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization;

        if (token) {
            try {
                const decodedToken = await this.jwtService.verifyAsync(token, {
                secret: 'token', 
            });
            request.currentUser = decodedToken;
        } catch (err) {
            request.currentUser = null;
        }
        } else {
        request.currentUser = null;
        }

        return true;
    }
}