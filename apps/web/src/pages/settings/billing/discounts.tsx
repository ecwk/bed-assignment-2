import { NextPage } from 'next';

import { Main, Sidebar, Section } from '../index';

type DiscountsProps = {};

const Discounts: NextPage<DiscountsProps> = () => {
  return (
    <Main>
      <Sidebar />
      <Section title="Discounts" subtitle="View and manage your discounts here">
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi
          blanditiis asperiores, iusto eligendi voluptas omnis provident esse
          sit perferendis ea a ipsam ut sequi impedit illum? Adipisci quos dicta
          quisquam?
        </p>
      </Section>
    </Main>
  );
};

export default Discounts;
