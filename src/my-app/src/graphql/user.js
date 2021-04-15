import { gql, useQuery } from '@apollo/client';
import Product from './product';

// use the UserResolver to get User.Id where username=username. Not the entire User entry.
// *only returning the id of the user.
export const useGetUserByUsernameQuery = (username) => {
    const query = gql` 
    query GetUsers($username: String!) {
        getUserByUsername(username: $username) {
            id
        }
    }
    `
    
    return useQuery(query, {
        variables: {
            username
        }
    });
}