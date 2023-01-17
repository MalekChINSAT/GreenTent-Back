import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Request, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/decorators/user.decorator';
import { ResetPasswordDto } from './dto/reset.password.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Account')
@Controller('account')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('mybookings')
  getCurrentUserBookings(@User() user) {
    return this.userService.getBookingsById(user.id);
  }

  @Put('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
      return await this.userService.resetPassword(resetPasswordDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('me')
  getProfile(@User() user) {
    return this.userService.findOne(user.id);
  }

  @Patch('profile')
  update(@Body() updateUserDto: UpdateUserDto, @User() user ) {
    return this.userService.update(user.id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

}

