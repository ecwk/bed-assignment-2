import { NextPage } from 'next';

import { Main, Sidebar, Section } from '../index';

type PaymentProps = {};

const Payment: NextPage<PaymentProps> = () => {
  return (
    <Main>
      <Sidebar />
      <Section title="Payment" subtitle="Manage your payment methods here">
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

export default Payment;
