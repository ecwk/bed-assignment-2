import { NextPage } from 'next';

import { Main, Sidebar, Section } from '../index';

type BookingsProps = {};

const Bookings: NextPage<BookingsProps> = ({}) => {
  return (
    <Main>
      <Sidebar />
      <Section title="Bookings" subtitle="Manage your bookings here">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem
          rem quod dolores doloribus voluptate at nobis similique vel officia.
          Repellat, iure voluptas optio perspiciatis officia laborum
          necessitatibus amet tenetur quae.
        </p>
      </Section>
    </Main>
  );
};

export default Bookings;
