import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserTokenDto } from './dto/user-token.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Post()
    create(@Body() userTokenDto: UserTokenDto) {
        return this.userService.create(userTokenDto);
    }

    @Get()
    findOne(@Body() userTokenDto: UserTokenDto) {
        return this.userService.findOne(userTokenDto);
    }

    @Put()
    update(@Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(updateUserDto);
    }
}
