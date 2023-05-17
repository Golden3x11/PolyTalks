import { UserTokenDto } from './user-token.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateUserDto extends UserTokenDto {
  @IsNotEmpty()
  @IsNumber()
  avatar: number

  @IsNotEmpty()
  @IsString()
  username: string

  @IsNotEmpty()
  @IsString()
  token: string
}
