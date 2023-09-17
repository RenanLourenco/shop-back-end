import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../users/entities/Role.entity';
import { User } from '../users/entities/User.entity';
import { jwtSecret } from '../../common/constants/jwt.salt';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LoginValidationMiddleware } from './middlewares/login-validation.middleware';

@Module({
  imports:[
    JwtModule.register({
      global: true,
      secret: jwtSecret,
      signOptions: { expiresIn: '30d' },
    }),
    TypeOrmModule.forFeature([Role,User])
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy,JwtStrategy]
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginValidationMiddleware).forRoutes('login');
  }
}
