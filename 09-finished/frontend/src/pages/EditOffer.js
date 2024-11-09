import { useRouteLoaderData } from 'react-router-dom';

import OfferForm from '../components/OfferForm';



function EditOfferPage() {

  const data = useRouteLoaderData('offer-detail');

  return <OfferForm method="patch" offer={data.offer} />;
}



export default EditOfferPage;
