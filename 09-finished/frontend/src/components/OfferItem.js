import { Link, useRouteLoaderData, useSubmit, useLoaderData, json, defer } from 'react-router-dom';

import classes from './OfferItem.module.css';
import ProductsTable from './ProductsTable';

function OfferItem({ offer }) {
  const token = useRouteLoaderData('root');
  const submit = useSubmit();

  function startDeleteHandler() {
    const proceed = window.confirm('Are you sure?');

    if (proceed) {
      submit(null, { method: 'delete' });
    }
  }


   


  return (
    <article className={classes.offer}>
      <img src={offer.bigPhotoURL} alt={offer.shortName} />
      <h1>Short Name: {offer.shortName}</h1>
      <h1>Large Name: {offer.largeName}</h1>
      <h1>List Price: {offer.listPrice}</h1>
      <h1>Offer Price: {offer.offerPrice}</h1>
      <h1>Discount: {offer.discount}</h1>
      <h1>Offer Type: {offer.offerType}</h1>
      <h1>Status: {offer.status}</h1>
      <div>
        <ProductsTable products={offer.detailProducts} />;
      </div>
      {token && (
        <menu className={classes.actions}>
          <Link to="edit">Edit</Link>
          <button onClick={startDeleteHandler}>Delete</button>
        </menu>
      )}
    </article>
  );
}

export default OfferItem;



