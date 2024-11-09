// import { useLoaderData } from 'react-router-dom';
import { Link } from 'react-router-dom';

import classes from './OfferList.module.css';

function OfferList({offers}) {
  // const events = useLoaderData();

  return (
    <div className={classes.offers}>
      <h1>All Offers</h1>
      <ul className={classes.list}>
        {offers.map((offer) => (
          <li key={offer.id} className={classes.item}>
            <Link to={`/offers/${offer.id}`}>
              <img src={offer.mediumPhotoURL} alt={offer.shortName} />
              <div className={classes.content}>
                <h2>{offer.shortName}</h2>
                <h2>List Price: {offer.listPrice} PEN</h2>
                <h2>Offer Price: {offer.offerPrice} PEN</h2>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OfferList;
