import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/user/entities/user.entity';
import { LoginDto } from './dtos/login.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { ReturnLogin } from './dtos/returnLogin.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginPayload } from './dtos/loginPayload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<ReturnLogin> {
    const user: UserEntity | undefined = await this.userService
      .findUserByEmail(loginDto.email)
      .catch(() => undefined);

    const isMatch = await bcrypt.compare(
      loginDto.password,
      user?.password || '',
    );

    if (!user || !isMatch) {
      throw new NotFoundException('Email or password are invalid');
    }

    return {
      accessToken: this.jwtService.sign({ ...new LoginPayload(user) }),
      user,
    };
  }
}
