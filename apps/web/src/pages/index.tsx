import { ChangeEvent, useState } from 'react'
import { PreloadedQuery, graphql, usePreloadedQuery } from 'react-relay'
import { GetServerSideProps } from 'next'
import { getPreloadedQuery } from '../relay/network'

import Logout from '../components/Logout'
import { AppointmentList } from '../components/appointments/AppointmentList'
import { getCookie } from '@/utils/getToken'

// interface HomeProps {
//   queryRefs: {
//     pageQuery: PreloadedQuery<pageQueryType>
//   }
// }

// const Appointment = graphql`
//   query pagesQuery @preloadable {
//     ...AppointmentList_appointment
//   }
// `

export default function Home({ queryRefs }: HomeProps) {
  // const query = usePreloadedQuery(Appointment, queryRefs.pageQuery)
  // const [search, setSearch] = useState('')
  // const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setSearch(e.target.value)
  // }

  return (
    <main className="h-full flex-items justify-center">
       <h1>gameles: </h1>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = getCookie(ctx.req.headers)
  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: '/auth/signin',
      },

      props: {},
    }
  }

  return {
    props: {
      preloadedQueries: {
        pageQuery: await getPreloadedQuery(pageQuery, {}, token),
      },
    },
  }
}
