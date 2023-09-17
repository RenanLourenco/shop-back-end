import {  HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterUserDTO } from './DTO/RegisterUser.dto';
import { LoginUserDTO } from './DTO/LoginUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../users/entities/Role.entity';
import { User } from '../users/entities/User.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserPayload } from './interfaces/UserPayload.interface';
import { UserToken } from './interfaces/UserToken.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService
    ){}

    async registerUser(data: RegisterUserDTO): Promise<User>{
        const findUser = await this.userRepository.findOneBy({
            email:data.email
        })

        if(findUser){
            throw new HttpException(
                'User already exists with this email',
                HttpStatus.BAD_REQUEST
            )
        }
        data.password = await bcrypt.hash(data.password, 10);

        const user = await this.userRepository.save(data);

        return user

    }

    login(data: User): UserToken{

        const payload: UserPayload = {
            sub: data.id,
            email: data.email,
            name: data.name
        }

        return {
            token: this.jwtService.sign(payload)
        }
    
    }

    async validateUser(email: string, password: string) {
        const findUser = await this.userRepository.findOneBy({
            email:email
        })
        if(findUser == null){
            throw new HttpException(
                'User not found',
                HttpStatus.BAD_REQUEST
            )
        }
        const matchPass = await bcrypt.compare(password,findUser.password);
        if(!matchPass){
            throw new HttpException(
                'Wrong email/password.',
                HttpStatus.BAD_REQUEST
            )
        }

        return {
            ...findUser,
            password
        }

    }

}
