import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
  json,
  redirect
} from 'react-router-dom';

import { getAuthToken } from '../util/auth';
import classes from './OfferForm.module.css';
import ProductsTable from './ProductsTable';
import ProductsTableOptions from './ProductsTableOptions';
import SearchBox from './SearchBox';



function OfferForm({ method, offer }) {
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  console.log("offer")
  console.log(offer)

  //let { products } = useLoaderData();

  const isSubmitting = navigation.state === 'submitting';

  function cancelHandler() {
    navigate('..');
  }

  return (
    <Form method={method} className={classes.form}>
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <div>
      <p>
        <label htmlFor="title">Short Name</label>
        <input
          id="shortName"
          type="text"
          name="shortName"
          required
          defaultValue={offer ? offer.shortName : ''}
        />
      </p>
      <p>
        <label htmlFor="title">Large Name</label>
        <input
          id="largeName"
          type="text"
          name="largeName"
          required
          defaultValue={offer ? offer.largeName : ''}
        />
      </p>
      <p>
        <label htmlFor="title">List Price</label>
        <input
          id="listPrice"
          type="text"
          name="listPrice"
          required
          defaultValue={offer ? offer.listPrice : ''}
        />
      </p>
      <p>
        <label htmlFor="title">Offer Price</label>
        <input
          id="offerPrice"
          type="text"
          name="offerPrice"
          required
          defaultValue={offer ? offer.offerPrice : ''}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="bigPhotoURL"
          type="url"
          name="bigPhotoURL"
          required
          defaultValue={offer ? offer.bigPhotoURL : ''}
        />
      </p>
      </div>
      <table>
        <tr>
          <td>
            
          </td>
          <td>
            <SearchBox setParPage={""} setSearchValue={""} searchValue={""} />
          </td>
        </tr>
        <tr>
          <td>
            <ProductsTable products={offer.detailProducts} />;
          </td>
          <td>
            <ProductsTableOptions products={[]} />;
          </td>
        </tr>
      </table>
      
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Save'}
        </button>
      </div>
    </Form>
  );
}

export default OfferForm;

export async function action({ request, params }) {
  console.log("into action")
  const method = request.method;
  const data = await request.formData();
  

  const offerData = {
    shortName: data.get('shortName'),
    largeName: data.get('largeName'),
    listPrice: data.get('listPrice'),
    offerPrice: data.get('offerPrice'),
    discount: data.get('discount'),
    description: data.get('description'),
    detailedDescription: data.get('detailedDescription'),
    offerType: data.get('offerType'),
    smallPhotoURL: data.get('smallPhotoURL'),
    mediumPhotoURL: data.get('mediumPhotoURL'),
    bigPhotoURL: data.get('bigPhotoURL'),
    detailProducts: data.get('detailProducts'),
    conditionalPromotions: data.get('conditionalPromotions'),
    conditionalCartPromotions: data.get('conditionalCartPromotions'),
    status: data.get('status'),
  };

  let url = 'http://localhost:8095/offers';

  if (method === 'PATCH') {
    const offerId = params.offerId;
    url = 'http://localhost:8095/offers/' + offerId;
  }

  const token = getAuthToken();
  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(offerData),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'Could not save offer.' }, { status: 500 });
  }

  return redirect('/offers');
}

