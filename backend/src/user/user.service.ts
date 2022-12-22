import { Injectable } from '@nestjs/common';
import { CrudService } from '../common/crud.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity'; 
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserService extends CrudService<User> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ){
    super(userRepository)
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: {
        email: email
      }
    });
  }
}
