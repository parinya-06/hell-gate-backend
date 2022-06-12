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
    // console.log('username=====',user.username)
    // console.log('password=====',user.password)

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
        // return 'res.status(400).send("Password Invalid!!");'
        return null
      }

    } catch (err) {
      console.log(err);
      return 'res.status(500).send("Server Error!");'
    }
  }

  // async checkLogin(req: any) {

  //   const { Token } = req.body
  //   // console.log('checkLogin=', Token)
  //   // this.jwtService.verify(Token, accessTokenSecret, (err, user) => {
  //   //     if (err) {
  //   //         console.log(err)
  //   //         return res.json({ login: false })
  //   //     }
  //   //     const { username, role } = user;
  //   //     return res.json({ username, role });
  //   // });

  //   console.log('checkLogin')
  //   // if (Token != null) {
  //   //   const { password, ...result } = Token;
  //   //   return result;
  //   // }
  //   // return null;
  // }



  // async checkAdmin(req: any) {
  //   try {
  //     const { username } = req.body
  //     // console.log('checkLogin=', username)
  //     const adminUser = await this.usersService.findUser(username);
  //     console.log('adminUser.role =', adminUser.role);
  //     if (adminUser.role !== 'admin') {
  //       return 'res.status(403).send(err,\'Admin Access denied\')'
  //     } else {
  //       return adminUser.role
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     return 'res.status(401).send("Admin Access denied");'
  //   }
  // }
}
