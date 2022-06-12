import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
// import { UsersService } from '../user/user.service';
import { AuthUsersModule } from '../user/user.module';

@Module({
  imports: [
    PassportModule,AuthUsersModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1000' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}