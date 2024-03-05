import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { User } from './models';
import {
  CreateUserInput,
  DeleteUserInput,
  GetUserArgs,
  GetUsersArgs,
  UpdateUserInput,
} from './dto';

@Injectable()
export class UsersService {
  private users: User[] = [];

  public getAll(): User[] {
    return this.users;
    // return getUsersArgs.ids.map((id) => this.getById({ id }));
  }

  public getById(getUserArgs: GetUserArgs): User {
    return this.users.find((u) => u.id === getUserArgs.id);
  }

  public getByEmail(email: string): User | undefined {
    return this.users.find((u) => u.email === email);
  }

  public create(createUserData: CreateUserInput): User {
    const user: User = {
      id: uuid(),
      ...createUserData,
    };
    this.users.push(user);
    return user;
  }

  public update(updateUserData: UpdateUserInput): User {
    const user = this.users.find((u) => u.id === updateUserData.id);
    Object.assign(user, updateUserData);

    return user;
  }

  public delete(deleteUserData: DeleteUserInput): User {
    const userIndex = this.users.findIndex((u) => u.id === deleteUserData.id);
    const user = this.users[userIndex];
    this.users.splice(userIndex);

    return user;
  }
}
