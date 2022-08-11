import React from 'react'
import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import Link from 'next/link'
import { API_URL } from '@/config/index'
const qs = require('qs');

export default function Home({events}) {

  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      {events.length > 0 && (
        <Link href='/events'>
          <a className='btn-secondary'>View All Events</a>
        </Link>
      )}
    </Layout>
  )
}

export async function getStaticProps() {
  const query = qs.stringify({
    populate: '*', 
  }, {
    encodeValuesOnly: true,
  });
  const res = await fetch(`${API_URL}/api/events?${query}&_sort=date:ASC`)
  const json = await res.json()

  return {
    props: {events: json.data},
    revalidate: 1,
  }
}