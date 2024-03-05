import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  public id: string;

  @Field()
  public email: string;

  @Field(() => Int)
  public age: number;

  @Field({ nullable: true })
  public isSubscribed?: boolean;

  @Field({ nullable: true })
  public password?: string;
}
