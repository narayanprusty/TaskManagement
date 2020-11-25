import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from '../dto/auth-credentials.dto';
import { User } from '../user.entity';
import { UserRepository } from '../user.repository';
import { JwtService } from '@nestjs/jwt'
import { JwtPayload, LoginRo } from '../ro/login.ro';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) 
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signup(authCredentialsDto)
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<LoginRo> {
    const username = await this.userRepository.validateUserPassword(authCredentialsDto)

    if(!username) {
      throw new UnauthorizedException('Invalid Credentials')
    }

    const payload: JwtPayload = { username } 
    const accessToken = await this.jwtService.sign(payload)

    return { accessToken }
  }
}
