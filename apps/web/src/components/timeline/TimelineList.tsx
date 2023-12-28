import { graphql, usePaginationFragment } from "react-relay";
import { Timeline } from "./Timeline";
import { TimelineList$key } from "@/__generated__/TimelineList.graphql";
import { TimelinePaginationQuery } from "@/__generated__/TimelinePaginationQuery.graphql";

interface TimelineListProps {
  query: TimelineList$key;
}

export function TimelineList({ query }: TimelineListProps) {
  const { data } = usePaginationFragment<
    TimelinePaginationQuery,
    TimelineList$key
  >(
    graphql`
      fragment TimelineList on Query
      @argumentDefinitions(
        first: { type: Int, defaultValue: 1 }
        after: { type: String }
      )
      @refetchable(queryName: "TimelinePaginationQuery") {
        posts(first: $first, after: $after)
          @connection(key: "TimelineList_posts", filters: []) {
          edges {
            node {
              id
              ...TimelineDetails
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
      <div className="flex flex-col items-center justify-center">
        {posts.edges.map(({ node }) => (
          <Timeline key={node.id} query={node} />
        ))}
      </div>
    </div>
  );
}
