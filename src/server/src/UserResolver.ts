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
    @Field({ nullable: true })
    id?: number
    
    @Field({ nullable: true })
    accessToken?: string

    @Field({ nullable: true })
    message?: string
}

@ObjectType()
class RegistrationResponse {
    @Field()
    success: boolean;

    @Field({ nullable: true })
    message: string
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
            return {
                message: "user does not exist!"
            }
        }

        //Check if password is valid
        const valid = await compare(password, user.password);

        if (!valid) {
            return {
                message: "incorrect email or password!"
            }
        }

        //Login is succesful
        //httpOnly is true so that it cant be accessed by js
        sendRefreshToken(res, createRefreshToken(user));

        return {
            id: user.id,
            accessToken: createAccessToken(user)
        };
    }


   //We use mutations when we want to update something or create something or make a change to our DB
   @Mutation(() => RegistrationResponse)
   async register(
       //email inside the quotation marks is the name of the graphql argument, email is the variable name
       @Arg('email') email: string,
       @Arg('password') password: string,
       @Arg('username') username: string,
   ) {

       const userRepository = getConnection("usersDBConnection")
           .getRepository(User);

       const userWithEmailFound = await userRepository.findOne({
           where: {
               email
           }
       })

       if (userWithEmailFound) {
           return {
               success: false,
               message: "email is already being used!"
           };
       }

       const userWithUsernameFound = await userRepository.findOne({
           where: {
               username
           }
       })

       if (userWithUsernameFound) {
           return {
               success: false,
               message: "username is already being used!"
           }
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
           return {
                success: false,
                message: "unknown error occurred"
            };
       }
       
       return {
           success: true,
       };
   }
}