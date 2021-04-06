import { gql, useQuery } from '@apollo/client';


export const useHelloQuery = () => {
    const query = gql`
        query Hello {
            hello
        }
    `

    return useQuery(query);
}