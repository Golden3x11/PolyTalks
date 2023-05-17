import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { UserTokenDto } from './dto/user-token.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('api/user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Post()
    create(@Body() userTokenDto: UserTokenDto): Promise<User> {
        return this.userService.create(userTokenDto);
    }

    @Get()
    findOne(@Query('token') token: string): Promise<User> {
        return this.userService.findOne(token);
    }

    @Put()
    update(@Body() updateUserDto: UpdateUserDto): Promise<User> {
        return this.userService.update(updateUserDto);
    }
}
