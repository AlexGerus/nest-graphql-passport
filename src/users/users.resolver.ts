import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './models';
import { UsersService } from './users.service';
import {
  CreateUserInput,
  DeleteUserInput,
  GetUserArgs,
  UpdateUserInput,
} from './dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User, { name: 'user', nullable: true })
  getUser(@Args() getUserArgs: GetUserArgs): User {
    return this.usersService.getById(getUserArgs);
  }

  @Query(() => [User], { name: 'users', nullable: 'items' })
  @UseGuards(GqlAuthGuard)
  getUsers(): User[] {
    return this.usersService.getAll();
  }

  @Mutation(() => User)
  createUser(@Args('createUserData') createUserData: CreateUserInput): User {
    return this.usersService.create(createUserData);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserData') updateUserData: UpdateUserInput): User {
    return this.usersService.update(updateUserData);
  }

  @Mutation(() => User)
  deleteUser(@Args('deleteUserData') deleteUserData: DeleteUserInput): User {
    return this.usersService.delete(deleteUserData);
  }
}
