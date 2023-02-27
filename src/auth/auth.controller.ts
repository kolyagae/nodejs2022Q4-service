import { Controller, Post, Header, Body } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Public } from './guard/jwt-guard';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @Header('content-type', 'application/json')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('login')
  @Header('content-type', 'application/json')
  login(@Body() loginUserDto: CreateUserDto) {
    return this.authService.login(loginUserDto);
  }
}
