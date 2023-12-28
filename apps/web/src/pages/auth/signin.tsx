import Image from "next/image";
import type { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useState } from "react";
import { useMutation } from "react-relay";
import { useRouter } from "next/navigation";
import { Input } from "@repo/ui/input";
import { Icons } from "@repo/ui/icons";
import { toast } from "@repo/ui/useToast";
import { UserAuth } from "../../context/AuthContext";
import { SignInMutation } from "./SigninMutation";

export default function Signin() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { signIn } = UserAuth();
  const [submit] = useMutation(SignInMutation);

  const handleLogin = ({ email, password }) => {
    setIsLoading(true);
    submit({
      variables: {
        email,
        password,
      },
      onError(error) {
        console.log(error);
      },
      onCompleted({ userLoginMutation }) {
        const token = userLoginMutation?.token ?? "";
        const username = userLoginMutation?.me?.username;

        toast({
          title: `Welcome ${username} 🚀`,
          description: "Welcome to gameles!!!",
        });

        signIn(token);
        router.push("/");
        setIsLoading(false);
      },
    });
  };

  return (
    <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-[url('/home.svg')] bg-auto bg-no-repeat bg-center p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 " />
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <div className="flex justify-center mx-auto">
              <Image
                alt="logo pix em cima da mão"
                height={70}
                priority
                src="/pix-hand.svg"
                width={70}
              />
            </div>
            <p className="mt-3 font-bold text-xl">
              Crie uma conta <br /> para o seu comércio
            </p>
            <p className="text-gray-500 mt-4">entre com sua conta Google.</p>
          </div>
          <Input name="email" placeholder="email" />
          <Input name="password" placeholder="password" type="password" />
          <button
            className="bg-gray-800 hover:bg-gray-900 transition-all"
            disabled={isLoading}
            onClick={() => {
              handleLogin({ email: "thiago@email.com", password: "123456" });
            }}
            type="button"
          >
            <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
            Entrar
          </button>
        </div>
      </div>
    </div>
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
