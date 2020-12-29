import { User } from "src/entities/User";
import { MyContext } from "src/types";
import { Resolver, Mutation, Arg, InputType, Field, Ctx } from "type-graphql";
import argon2 from "argon2";

@InputType()
class UsernamePasswordIput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async register(
    @Arg("options") options: UsernamePasswordIput,
    @Ctx() { em }: MyContext
  ) {
    const hashedPassword = await argon2.hash(options.password);
    const user = em.create(User, {
      username: options.username,
      password: hashedPassword,
    });
    await em.persistAndFlush(user);
    return user;
  }
}
