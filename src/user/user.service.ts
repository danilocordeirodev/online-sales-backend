import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dtos/createUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private users: User[] = [];
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const salt = 10;

    const passHashed = await bcrypt.hash(createUserDto.password, salt);

    const user: User = {
      ...createUserDto,
      id: this.users.length + 1,
      password: passHashed,
    };

    this.users.push(user);

    return user;
  }

  async getAllUser(): Promise<User[]> {
    return this.users;
  }
}
