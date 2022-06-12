import { Injectable } from '@nestjs/common';
import { UsersService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { clearConfigCache } from 'prettier';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findUser(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(req: any): Promise<any> {
    console.log('login')
    // console.log('req=====', req)
    // console.log('user=====',user)
    // const payload = { username: user.username, sub: user.userId };
    // return {
    //   access_token: this.jwtService.sign(payload),
    // };
    try {
      const { username, password, userId } = req.body;
      // console.log('username=====', username)
      // console.log('password=====', password)
      // console.log('userId=====', userId)
      const user = await this.usersService.findUser(username);
      console.log('enabled=====', user.enabled)
      if (user && user.enabled) {
        const payload = {
          user: {
            username: user.username,
            role: user.role,
          },
          sub: userId
        };
        // console.log('payload=', payload);
        // return this.jwtService.sign(payload)
        return {
          token: this.jwtService.sign(payload), payload: payload
        };
      } else {
        return JSON.stringify("Password Invalid!!");
      }

    } catch (err) {
      console.log(err);
      return JSON.stringify("Server Error!");
    }
  }
}
