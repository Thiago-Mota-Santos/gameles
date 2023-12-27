import { graphql, usePaginationFragment } from "react-relay";
import { Timeline } from "./Timeline";
import { TimelineList$key } from "@/__generated__/TimelineList.graphql";

interface TimelineListProps {
  query: TimelineList$key;
  search: string;
}

export function TimelineList({ query }: TimelineListProps) {
  const { data } = usePaginationFragment<_, TimelineList$key>(
    graphql`
      fragment TimelineList on Query
      @argumentDefinitions(
        first: { type: Int, defaultValue: 1 }
        after: { type: String }
      )
      @refetchable(queryName: "TimelinePaginationQuery") {
        posts(first: $first, after: $after)
          @connection(key: "TimelineList_posts") {
          edges {
            node {
              id
              ...Timeline
            }
          }
        }
      }
    `,
    query,
  );

  const { posts } = data;

  return (
    <div>
      {posts.edges.length ? (
        <div className="flex flex-col items-center justify-center">
          {posts.edges.map(({ node }) => (
            <Timeline key={node.id} postDetails={node} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
