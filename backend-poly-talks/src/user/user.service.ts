import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UserTokenDto } from './dto/user-token.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';
import jwtDecode from 'jwt-decode';

@Injectable()
export class UserService {
    constructor(
      @InjectModel(User.name) private userModel: Model<UserDocument>
    ) {}

    create(userTokenDto: UserTokenDto) {
        const decodedToken = this.decodeToken(userTokenDto)

        return this.userModel.findOne({"email": decodedToken.email}).exec().then(user => {
            if(user){
                throw new ConflictException("User has already created an account")
            }else{
                const newUser = new this.userModel({"username": decodedToken.name, "email": decodedToken.email, "avatar": 1})
                return newUser.save()
            }
        })
    }

    findOne(userTokenDto: UserTokenDto) {
        const email = this.decodeToken(userTokenDto).email
        return this.userModel.findOne({"email": email}).exec().then(user => {
            if(!user)
                throw new NotFoundException(`User with email ${email} not found`);
        })
    }

    update(updateUserDto: UpdateUserDto) {
        const email = this.decodeToken(updateUserDto).email

        return this.userModel.findOneAndUpdate(
          {"email": email},
          {"username": updateUserDto.username, "avatar": updateUserDto.avatar},
          {new: true}
        ).exec().then(user => {
            if(!user)
                throw new NotFoundException(`User with email ${email} not found`);
            return user;
        })
    }

    private decodeToken(userTokenDto: UserTokenDto): DecodedUser {
        const decodedToken = jwtDecode(userTokenDto.token);
        return {
            "email": decodedToken["email"],
            "name": decodedToken["name"]
        }
    }
}

interface DecodedUser {
    email: string,
    name: string
}
