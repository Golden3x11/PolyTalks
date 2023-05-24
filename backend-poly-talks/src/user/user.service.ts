import { Injectable, NotFoundException } from '@nestjs/common';
import { UserTokenDto } from './dto/user-token.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';
import { decodeToken } from '../authentication/token_verify';
import { Thread } from 'src/thread/entities/thread.entity';

@Injectable()
export class UserService {
    constructor(
      @InjectModel(User.name) private userModel: Model<UserDocument>
    ) {}

    async create(userTokenDto: UserTokenDto): Promise<User> {
        const decodedToken = await decodeToken(userTokenDto.token)

        return this.userModel.findOne({"email": decodedToken.email}).exec().then(user => {
            if(user){
                return user;
            }else{
                const newUser = new this.userModel({"username": decodedToken.name, "email": decodedToken.email, "avatar": 1})
                return newUser.save()
            }
        })
    }

    async findOne(token: string): Promise<User> {
        const email = (await decodeToken(token)).email
        const user = await this.userModel.findOne({"email": email}).exec()
        if(!user){
            throw new NotFoundException(`User with email ${email} not found`);
        }
        return user;
    }

    async update(updateUserDto: UpdateUserDto): Promise<User> {
        const email = (await decodeToken(updateUserDto.token)).email

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

    async getSubscribedThreads(token: string): Promise<Thread[]> {
        const userId = (await this.findOne(token))._id
        return this.userModel.findOne({"_id": userId}).populate("subscribedThreads").exec().then(user => {
            if(!user)
                throw new NotFoundException(`User with id ${userId} not found`);
            return user.subscribedThreads;
        }) 
    }

    async addSubscribedThread(userId: string, threadId: string): Promise<User> {
        return this.userModel.findOneAndUpdate(
          {"_id": userId},
          {$push: {"subscribedThreads": threadId}},
          {new: true}
        ).exec().then(user => {
            if(!user)
                throw new NotFoundException(`User with id ${userId} not found`);
            return user;
        })
    }

    async removeSubscribedThread(userId: string, threadId: string): Promise<User> {
        return this.userModel.findOneAndUpdate(
          {"_id": userId},
          {$pull: {"subscribedThreads": threadId}},
          {new: true}
        ).exec().then(user => {
            if(!user)
                throw new NotFoundException(`User with id ${userId} not found`);
            return user;
        })
    }

}