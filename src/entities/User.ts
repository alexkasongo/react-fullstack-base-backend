
import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

// first database table
// we are using type graphql which works great with class decorators

@ObjectType() // Decorator which converts class to object type
@Entity() //Decorator
export class User {
  @Field() // If not included, it will not be exposed by graphql
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: 'date' })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt = new Date();

  @Field()
  @Property({ type: 'text', unique: true}) // usernames must be unique
  username!: string;

  @Property({ type: 'text', unique: true}) // no field
  password!: string;
}