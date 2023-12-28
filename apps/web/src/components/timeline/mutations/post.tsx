import { RecordSourceSelectorProxy, graphql, ROOT_ID } from "relay-runtime";
import { connectionUpdater } from "@/utils/connectionUpdater";

const postQuery = graphql`
  query postQuery {
    posts {
      edges {
        node {
          id
          name
          description
          likes
          rt
          imageUrl
        }
      }
    }
  }
`;

const postMutation = graphql`
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
          id
          name
          description
          likes
          rt
          imageUrl
        }
      }
    }
  }
`;

const updater = (store: RecordSourceSelectorProxy) => {
  const newEdge = store
    .getRootField("postRegisterMutation")
    .getLinkedRecord("postEdge");

  connectionUpdater({
    store,
    parentId: ROOT_ID,
    connectionName: "TimelineList_posts",
    edge: newEdge,
    before: true,
  });
};

export { postQuery, postMutation, updater };
