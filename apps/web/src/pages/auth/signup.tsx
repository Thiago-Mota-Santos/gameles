import { GetServerSideProps } from "next"
import { parseCookies } from "nookies"

export default function SignUp() {
 

  // function handleRegister({ email, username, password }: CreateUserData) {
  //   request({
  //     variables: {
  //       email,
  //       password,
  //       username,
  //     },
  //     onError() {
  //       toast({
  //         variant: 'destructive',
  //         title: 'Uh oh! Something went wrong.',
  //         description: 'User already exists, try again.',
  //       })
  //     },
  //     onCompleted({ userRegisterMutation }: SignupMutation$data) {
  //       const token = userRegisterMutation?.token ?? ''
  //       const username = userRegisterMutation?.me?.username
  //       toast({
  //         title: `Welcome ${username} 🎉`,
  //         description: 'Try to login now!',
  //       })
  //       signIn(token)
  //       router.push('/auth/signin')
  //     },
  //   })
  // }

  return (
    
    <h1>signup</h1>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'game-token': token } = parseCookies(ctx)
  if (token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
