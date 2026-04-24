import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Session } from '@thallesp/nestjs-better-auth';
import { UpdateProfileInput } from './dto/update-profile';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  // Returns the currently authenticated user's profile
  @Query(() => User, { name: 'me' })
  me(@Session() session: any) {
    return this.userService.me(session.user.id);
  }

  // Allows the user to update their own name or avatar
  @Mutation(() => User)
  updateProfile(
    @Args('updateProfileInput') updateProfileInput: UpdateProfileInput,
    @Session() session: any,
  ) {
    return this.userService.updateProfile(session.user.id, updateProfileInput);
  }
}
