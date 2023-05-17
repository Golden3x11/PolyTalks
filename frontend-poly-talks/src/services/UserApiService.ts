import { UserTokenDto } from '../dto/user-token.dto';
import { UserDto } from '../dto/user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

export function createUser(token: UserTokenDto): Promise<UserDto> {
  return fetch('http://localhost:8080/api/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(token)})
    .then(response => response.json())
}

export function getUser(token: string): Promise<UserDto> {
  return fetch(`http://localhost:8080/api/user?token=${token}`, {
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then((response) => response.json());
}

export function updateUser(user: UpdateUserDto): Promise<UserDto> {
  return fetch(`http://localhost:8080/api/user`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: "PUT",
    body: JSON.stringify(user)
  })
    .then((response) => response.json());
}