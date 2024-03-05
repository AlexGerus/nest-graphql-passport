import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/models';
import { jwtSecret } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  validate(email: string, password: string): User | null {
    const user = this.usersService.getByEmail(email);

    if (!user) {
      return null;
    }

    const isPasswordValid = password === user.password;
    return isPasswordValid ? user : null;
  }

  login(user: User): { access_token: string } {
    const payload = {
      email: user.email,
      sub: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  verify(token: string): User {
    const decoded = this.jwtService.verify(token, {
      secret: jwtSecret,
    });

    const user = this.usersService.getByEmail(decoded.email);
    if (!user) {
      throw new Error('Unable to get the user from decoded token');
    }
    return user;
  }
}
