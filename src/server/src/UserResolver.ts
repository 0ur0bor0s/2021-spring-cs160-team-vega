import {Arg, Ctx, Field, Int, Mutation, ObjectType, Query, Resolver, UseMiddleware} from 'type-graphql'
import { hash, compare } from 'bcryptjs';
import { User } from './entity/mysql/User';
import { MyContext } from './MyContext';
import { createAccessToken, createRefreshToken } from './auth';
import { isAuth } from './isAuth';
import { sendRefreshToken } from './sendRefreshToken';
import { getConnection } from 'typeorm';

@ObjectType()
class LoginResponse {
    @Field()
    accessToken: string
}

@Resolver()
export class UserResolver {
    @Query(()=>String)
    hello() {
        return "hi";
    }

    @Query(() => String)
    @UseMiddleware(isAuth)
    bye(@Ctx() {payload}: MyContext) {
        console.log(payload)
        return `your user id is: ${payload!.userId}`;
    }

    @Query(() => [User])
    async users() {
        return await getConnection("usersDBConnection")
            .getRepository(User)
            .find();
    }

    @Query(() => User)
    async getUserByUsername(
        @Arg ('username', () => String) username : string
    ) {
        return await getConnection("usersDBConnection")
            .getRepository(User)
            .findOne({
                    where: {
                        username: username
            }});
    }



    //THIS IS FOR TESTING PURPOSES ONLY
    //Ideally we wouldn't create a mutation to revokeTokens
    //Instead we'd put this in a place where a user wants to "Forget password"
    @Mutation(() => Boolean)
    async revokeRefreshTokensForUser(
        @Arg('userId', () => Int) userId: number
    ) {
        await getConnection("usersDBConnection")
            .getRepository(User)
            .increment({id: userId}, 'tokenVersion', 1);

        return true;
    }

    @Mutation(() => LoginResponse)
    async login(
        @Arg('email') email: string,
        @Arg('password') password: string,
        @Ctx() {res}: MyContext
    ): Promise<LoginResponse> {

        //Make sure user exists
        const user = await getConnection("usersDBConnection")
            .getRepository(User)
            .findOne({ where: { email } });

        if (!user) {
            throw new Error('User does not exist!');
        }

        //Check if password is valid
        const valid = await compare(password, user.password);

        if (!valid) {
            throw new Error("Bad pasword");
        }

        //Login is succesful
        //httpOnly is true so that it cant be accessed by js
        sendRefreshToken(res, createRefreshToken(user));

        return {
            accessToken: createAccessToken(user)
        };
    }


   //We use mutations when we want to update something or create something or make a change to our DB
   @Mutation(() => Boolean)
   async register(
       //email inside the quotation marks is the name of the graphql argument, email is the variable name
       @Arg('email') email: string,
       @Arg('password') password: string,
       @Arg('username') username: string,
   ) {

       const userRepository = getConnection("usersDBConnection")
           .getRepository(User);

       const userFound = await userRepository.findOne({
           where: {
               email
           }
       })

       if (userFound) {
           console.log("user already exists in database!");
           return false;
       }

       const hashedPassword = await hash(password, 12);

       try {
           await userRepository
               .insert({
                   email,
                   username,
                   password: hashedPassword
               });
       } catch(err) {
           console.log(err);
           return false;
       }
       
       return true;
   }
}