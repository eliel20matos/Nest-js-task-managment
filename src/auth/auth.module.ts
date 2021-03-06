import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersRepository } from './users.repository';
import { TypeOrmExModule } from 'src/database/typeorm-ex.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtEstrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'topSecret51', //not use in prodution 
      signOptions: {
        expiresIn: 3600,
      }
    }),
    TypeOrmExModule.forCustomRepository([UsersRepository],)
  ],
  providers: [AuthService, JwtEstrategy],
  controllers: [AuthController],
  exports: [AuthService, JwtEstrategy, PassportModule],
})
export class AuthModule {}
