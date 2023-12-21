import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useContext } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from 'react-relay'

import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { AuthContext } from '../../context/AuthContext'

import { SignInMutation } from '../../context/user/SigninMutation'
import { useToast } from '../../hooks/useToast'


export default function SignIn() {
  // const { toast } = useToast()
  // const { signIn } = useContext(AuthContext)
 
  // const [submit] = useMutation<SigninMutation>(SignInMutation)

  // function handleLogin({ email, password }: UserLoginFormData) {
  //   submit({
  //     variables: {
  //       email,
  //       password,
  //     },
  //     onError(error) {
  //       if (error.name === 'TypeError') {
  //         toast({
  //           variant: 'destructive',
  //           title: 'Uh oh! Something went wrong',
  //           description: 'connection failed',
  //         })
  //       } else {
  //         toast({
  //           variant: 'destructive',
  //           title: 'Uh oh! Something went wrong',
  //           description: 'Login failed',
  //         })
  //       }
  //     },
  //     onCompleted({ userLoginMutation }: SigninMutation$data) {
  //       const token = userLoginMutation?.token ?? ''
  //       const username = userLoginMutation?.me?.username

  //       toast({
  //         title: `Welcome ${username} 🚀`,
  //         description: 'Make an appointment now!',
  //       })

  //       signIn(token)
  //       router.push('/')
  //     },
  //   })
  // }
  return (
   <h1>signin</h1>
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
