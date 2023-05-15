import { UserTokenDto } from '../dto/user-token.dto';

export function createUser(token: UserTokenDto) {
  fetch('http://localhost:8080/api/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(token)})
    .catch(error => console.error(error));
}