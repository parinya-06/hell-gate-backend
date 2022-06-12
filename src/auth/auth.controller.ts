import { Controller, Request, Post, UseGuards,Get } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  getHello(): string {
    return "this.appService.getHello();"
  }
  
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
      // console.log('req=',req)
      const { username, password } = req.body;
      console.log('username=',username)
      // console.log('password=',password)
    // return 'this.authService.login(req.user);'
    return  this.authService.login(req);
  }

  // @Post('/check-login')
  // async checkLogin(@Request() req) {
  //     // console.log('req=',req)
  //     const { Token } = req.body;
  //     // console.log('Token==',Token)
  //   // return 'this.authService.login(req.user);'
  //   return  this.authService.checkLogin(req);
  // }

  // @Post('/current-admin')
  // async checkAdmin(@Request() req) {
  //     console.log('req=',req)
  //     const { username } = req.body;
  //     console.log('username==',username)
  //   return this.authService.checkAdmin(req);
  // }
}
