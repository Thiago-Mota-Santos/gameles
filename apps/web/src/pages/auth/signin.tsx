import Image from "next/image";
import type { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useState, FormEvent } from "react";
import { useMutation } from "react-relay";
import { useRouter } from "next/navigation";
import { Input } from "@repo/ui/input";
import { Icons } from "@repo/ui/icons";
import { Button } from "@repo/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormSubmit,
  toast,
} from "@repo/ui/index";
import { UserAuth } from "../../context/AuthContext";
import { SignInMutation } from "./SigninMutation";
import { SigninMutation$data } from "@/__generated__/SigninMutation.graphql";

interface Data {
  email?: string;
  password?: string;
}

export default function Signin() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Data>({
    email: "",
    password: "",
  });
  const router = useRouter();
  const { signIn } = UserAuth();
  const [submit] = useMutation(SignInMutation);

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    submit({
      variables: {
        email: data.email,
        password: data.password,
      },
      onError(error) {
        console.log(error);
      },
      onCompleted({ userLoginMutation }: SigninMutation$data) {
        const token = userLoginMutation?.token ?? "";
        const username = userLoginMutation?.me?.username;

        toast(`Welcome ${username}`, {
          description: "Welcome to gameles!!!",
        });

        signIn(token);
        router.push("/");
        setIsLoading(false);
      },
    });
  };

  return (
    <Form onSubmit={handleLogin}>
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-[url('/home.svg')] bg-auto bg-no-repeat bg-center p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 " />
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <div className="flex justify-center mx-auto">
                <Image
                  alt="game icon"
                  height={70}
                  priority
                  src="/game.svg"
                  width={70}
                />
              </div>
              <p className="mt-3 font-bold text-xl">Create an account</p>
              <p className="text-gray-500 mt-4">
                Talk about games with your friends
              </p>
            </div>

            <FormField name="email">
              <FormControl asChild>
                <Input
                  name="email"
                  onChange={(e) => {
                    setData((prevData) => ({
                      ...prevData,
                      email: e.target.value,
                    }));
                  }}
                  placeholder="Digit your email"
                  type="email"
                  value={data.email}
                />
              </FormControl>
            </FormField>

            <FormField name="password">
              <FormControl asChild>
                <Input
                  name="password"
                  onChange={(e) => {
                    setData((prevData) => ({
                      ...prevData,
                      password: e.target.value,
                    }));
                  }}
                  placeholder="password"
                  type="password"
                  value={data.password}
                />
              </FormControl>
            </FormField>

            <FormSubmit asChild>
              <Button
                className="max-w-[240px] flex items-center justify-center px-6 py-3 mt-4 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 hover:bg-gray-50 w-full md:max-w-none"
                disabled={isLoading}
                variant="ghost"
              >
                {isLoading ? (
                  <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                <span className="mx-2">Entrar</span>
              </Button>
            </FormSubmit>
          </div>
        </div>
      </div>
    </Form>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { "game-token": token } = parseCookies(ctx);

  if (token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
