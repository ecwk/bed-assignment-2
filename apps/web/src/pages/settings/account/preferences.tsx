import { NextPage } from 'next';

import { Main, Sidebar, Section } from '../index';

type PreferencesProps = {};

const Preferences: NextPage<PreferencesProps> = ({}) => {
  return (
    <Main>
      <Sidebar />
      <Section title="Preferences" subtitle="Change your preferences here">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit earum
          aperiam consectetur recusandae, repellat a quaerat et vero asperiores
          nostrum explicabo provident tempore delectus temporibus neque
          assumenda expedita sapiente maxime!
        </p>
      </Section>
    </Main>
  );
};

export default Preferences;
