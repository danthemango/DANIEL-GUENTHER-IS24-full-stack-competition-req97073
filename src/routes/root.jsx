import { getContacts, createContact } from '../contacts';
import { Outlet, useNavigation, ScrollRestoration } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export async function action() {
    const contact = await createContact();
    return redirect(`/contacts/${contact.id}/edit`)
}

export async function loader({request}) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    const contacts = await getContacts(q);
    return { contacts, q };
}

import React, { ReactNode } from 'react';

export default function RootPage({ children }) {
  const navigation = useNavigation();

  return (
    <>
      <Navbar />
      <div id="detail" className={navigation.state === "loading" ? "loading" : ""}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
