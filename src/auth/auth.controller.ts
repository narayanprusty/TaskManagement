import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { LoginRo } from './ro/login.ro';
import { AuthGuard } from '@nestjs/passport'
import { GetUser } from './decorator/get-user-decorator';
import { User } from "./user.entity";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signUp(authCredentialsDto)
  }

  @Post('signin')
  signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<LoginRo> {
    return this.authService.signIn(authCredentialsDto)
  }

  @Post('test')
  @UseGuards(AuthGuard())
  test(@GetUser() user: User) {
  }
}
