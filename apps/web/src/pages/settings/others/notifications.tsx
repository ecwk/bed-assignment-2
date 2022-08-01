import { NextPage } from 'next';

import { Main, Sidebar, Section } from '../index';

type NotificationProps = {};

const Notification: NextPage<NotificationProps> = ({}) => {
  return (
    <Main>
      <Sidebar />
      <Section
        title="Notifications"
        subtitle="Manage your notification settings here"
      >
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae
          iusto deleniti tempora nihil asperiores autem? Eveniet aperiam
          sapiente magnam magni exercitationem! Qui illum placeat ratione eos et
          inventore repellat neque?
        </p>
      </Section>
    </Main>
  );
};

export default Notification;
