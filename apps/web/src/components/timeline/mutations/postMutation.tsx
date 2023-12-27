import { graphql } from "relay-runtime";

const post = graphql`
  mutation postMutation(
    $name: String!
    $description: String!
    $likes: Int!
    $rt: Boolean!
  ) {
    postRegisterMutation(
      input: { name: $name, description: $description, likes: $likes, rt: $rt }
    ) {
      postEdge {
        node {
          name
          description
          likes
          id
        }
      }
    }
  }
`;

export { post };
