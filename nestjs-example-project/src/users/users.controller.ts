import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import VerifyEmailDto from './dto/verify-email.dto';
import UserLoginDto from './dto/user-login.dto';
import UserInfo from './dto/user-info.dto';
import { ValidationPipe } from './pipes/validation.pipe';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<void> {
    await this.usersService.createUser(dto.name, dto.password, dto.email);
  }

  @Post('/email-verify')
  async verifyEmail(@Query() dto: VerifyEmailDto): Promise<string> {
    const { signupVerifyToken } = dto;

    return await this.usersService.verifyEmail(signupVerifyToken);
  }

  @Post('/login')
  async login(@Body() dto: UserLoginDto): Promise<string> {
    const { email, password } = dto;

    return await this.usersService.login(email, password);
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  async getUserInfo(
    @Param('id', ValidationPipe) userId: string,
  ): Promise<UserInfo> {
    return await this.usersService.getUserInfo(userId);
  }

  @Get()
  findAll(
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    console.log(`offset: ${offset}`);
    console.log(`limit: ${limit}`);

    return this.usersService.findAll();
  }

  // ===================== 3-1 코드

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  //
  // @Redirect('https://nestjs.com', 301)
  // @Header('Custom', 'Test Header')
  // @Get(':id')
  // findOneWithHeader(@Param('id') id: string) {
  //   if (+id < 1) {
  //     throw new BadRequestException('id는 0보다 커야합니다.');
  //   }
  //
  //   return this.usersService.findOne(+id);
  // }
  //
  // @HttpCode(202)
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
