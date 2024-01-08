import { Inset } from "@radix-ui/themes";
import { Input } from "@repo/ui/input";
import { Button } from "@repo/ui/button";
import { ImageIcon } from "lucide-react";
import {
  PreloadedQuery,
  graphql,
  useMutation,
  usePreloadedQuery,
} from "react-relay";
import { ChangeEvent, useState } from "react";
import { GetServerSideProps } from "next";
import { postMutation, updater } from "./timeline/mutations/post";
import { getCookie } from "@/utils/getToken";
import { getPreloadedQuery } from "@/relay/network";

interface PostPublishProps {
  queryRefs: {
    pageQuery: PreloadedQuery<>;
  };
}

export default function PostPublish({ queryRefs }) {
  const query = usePreloadedQuery(Post, queryRefs.pageQuery);
  const [post, setPost] = useState("");
  const [request] = useMutation(postMutation);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPost(e.target.value);
  };

  const handleSubmit = () => {
    request({
      variables: {
        description: post,
      },
      updater,

      onCompleted() {
        console.log("post has registred");
      },

      onError(err) {
        console.error(err.message);
      },
    });
  };

  return (
    <main className="p-6">
      <div className="w-full flex justify-center items-center">
        <div className="w-full max-w-md">
          <div className="flex flex-col space-y-4">
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                className="h-9"
                onChange={handleChange}
                placeholder="Post something about games"
                type="text"
              />

              <Button
                className="bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  handleSubmit();
                }}
                type="submit"
              >
                Publish
              </Button>
            </div>
            <Inset mb="2" side="y">
              <ImageIcon className="w-4 h-4" />
            </Inset>
          </div>
        </div>
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
