import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtSecret } from 'src/common/constants/jwt.salt';
import { Role } from './entities/Role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/User.entity';

@Module({
  imports:[],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
