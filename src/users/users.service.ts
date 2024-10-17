import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    create = async (user: User) => {
        return this.usersRepository.save(user);
    }

    findAll = async () => {
        const res = await this.usersRepository.find();
        return res;
    }

    findOne = async (id: number) => {
        const result = await this.usersRepository.findOneBy({ id });
        return result;
    }

    update = async (id: number, user: Partial<User>) => {
        await this.usersRepository.update(id, user);
        return this.findOne(id);
    }

    remove = async (id: number) => {
        return this.usersRepository.delete(id);
    }
}
