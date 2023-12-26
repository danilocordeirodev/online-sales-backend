import { Injectable } from '@nestjs/common';
import { UserEntity } from './interfaces/user.entity';
import { CreateUserDto } from './dtos/createUser.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const salt = 10;

    const passHashed = await bcrypt.hash(createUserDto.password, salt);

    return this.userRepository.save({
      ...createUserDto,
      password: passHashed,
    });
  }

  async getAllUser(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }
}
