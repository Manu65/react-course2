import { Suspense } from 'react';
import {
  useRouteLoaderData,
  json,
  redirect,
  defer,
  Await,
} from 'react-router-dom';

import OfferItem from '../components/OfferItem';
import { getAuthToken } from '../util/auth';

function OfferDetailPage() {
  const { offer } = useRouteLoaderData('offer-detail');

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={offer}>
          {(loadedOffer) => <OfferItem offer={loadedOffer} />}
        </Await>
      </Suspense>
    </>
  );
}

export default OfferDetailPage;

async function loadOffer(id) {

  
  const response = await fetch('http://localhost:8095/offer/' + id);

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch details for selected offer.' },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    console.log(resData)
    return resData.listing[0];
  }
}


async function getProduct(id){

  console.log("init get product");  
  const response = await fetch('http://localhost:8095/product/'+ id);
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
    console.log("from get product");
    console.log(resData);
    const product = await resData.listing[0];
    console.log(product);
    return product;
  }
}

async function loadProducts(detailProducts) {

  console.log("init load product"); 
  let enrichedDetailProducts = [];
  let product = {};

  await Promise.all(detailProducts.map(async(item)=> {
    product =  await getProduct(item.productId)
    console.log("iteration", product);

    item.shortName = product.shortName;
    item.largeName = product.largeName;
    item.description = product.description;
    item.detailedDescription = product.detailedDescription;
    item.smallPhotoURL = product.smallPhotoURL;
    item.mediumPhotoURL = product.mediumPhotoURL;
    item.bigPhotoURL = product.bigPhotoURL;
    item.status =  product.status;
    enrichedDetailProducts.push(item);
  }));
  console.log("after map", enrichedDetailProducts);

  return enrichedDetailProducts;
  
}

export async function loader({ request, params }) {
  const id = params.offerId;

  let offer = await loadOffer(id);
  const detailProducts = offer.detailProducts;
  offer.detailProducts = await loadProducts(detailProducts);
  console.log("showing detailed products");
  console.log(offer.detailProducts);

  return defer({
    offer: offer
  });
}

export async function action({ params, request }) {
  const offerId = params.offerId;

  const token = getAuthToken();
  const response = await fetch('http://localhost:8090/offers/' + offerId, {
    method: request.method,
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });

  if (!response.ok) {
    throw json(
      { message: 'Could not delete offer.' },
      {
        status: 500,
      }
    );
  }
  return redirect('/offer/offers');
}
