import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthUsersModule } from './user/user.module';
import { UsersService } from './user/user.service';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { LocalStrategy } from './auth/strategies/local.strategy';
import { BooksModule } from './books/books.module';
import { HistorybookModule } from './historybook/historybook.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/test'),
     AuthUsersModule, AuthModule, JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2 day' },
    }), BooksModule, HistorybookModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, LocalStrategy, JwtStrategy],
})
export class AppModule { }
