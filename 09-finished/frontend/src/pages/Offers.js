import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';

import OfferList from '../components/OfferList';

function OffersPage() {
  const { offers } = useLoaderData();
  console.log("offer 1");
  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={offers}>
        {(loadedOffers) => <OfferList offers={loadedOffers} />}
      </Await>
    </Suspense>
  );
}

export default OffersPage;

async function loadOffers() {
  const response = await fetch('http://localhost:8095/offer/offers');
  console.log(response);
  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch events.' };
    // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
    //   status: 500,
    // });
    throw json(
      { message: 'Could not fetch offers.' },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    console.log(resData);
    return resData.listing;
  }
}

export function loader() {
  return defer({
    offers: loadOffers(),
  });
}
