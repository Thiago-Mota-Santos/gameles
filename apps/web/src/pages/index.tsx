import { GetServerSideProps } from "next";
import { PreloadedQuery, graphql, usePreloadedQuery } from "react-relay";
import { getCookie } from "@/utils/getToken";
import Header from "@/components/Header";
import { getPreloadedQuery } from "@/relay/network";
import pageQuery, {
  pagesQuery as pageQueryType,
} from "@/__generated__/pagesQuery.graphql";
import PostPublish from "@/components/PostPublish";
import { TimelineList } from "@/components/timeline/TimelineList";

interface HomeProps {
  queryRefs: {
    pageQuery: PreloadedQuery<pageQueryType>;
  };
}

// pageQueryType

const Post = graphql`
  query pagesQuery @preloadable {
    ...TimelineList
  }
`;

export default function Home({ queryRefs }: HomeProps) {
  const query = usePreloadedQuery(Post, queryRefs.pageQuery);

  // const [search, setSearch] = useState('')
  // const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setSearch(e.target.value)
  // }

  return (
    <main>
      <Header />
      <div className="max-w-2xl mx-auto">
        <PostPublish />
        <TimelineList query={query} />
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = getCookie(ctx.req.headers);
  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/signin",
      },

      props: {},
    };
  }

  return {
    props: {
      preloadedQueries: {
        pageQuery: await getPreloadedQuery(pageQuery, {}, token),
      },
    },
  };
};
