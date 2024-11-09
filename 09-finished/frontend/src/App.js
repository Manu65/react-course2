import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import EditEventPage from './pages/EditEvent';
import EditOfferPage from './pages/EditOffer';
import ErrorPage from './pages/Error';
import EventDetailPage, {
  loader as eventDetailLoader,
  action as deleteEventAction,
} from './pages/EventDetail';
import OfferDetailPage, {
  loader as offerDetailLoader,
  action as deleteOfferAction,
} from './pages/OfferDetail';
import EventsPage, { loader as eventsLoader } from './pages/Events';
import EventsRootLayout from './pages/EventsRoot';
import OffersPage, { loader as offersLoader } from './pages/Offers';
import OffersRootLayout from './pages/OffersRoot';
import HomePage from './pages/Home';
import NewEventPage from './pages/NewEvent';
import NewOfferPage from './pages/NewOffer';
import RootLayout from './pages/Root';
import { action as manipulateEventAction } from './components/EventForm';
import { action as manipulateOfferAction } from './components/OfferForm';
import NewsletterPage, { action as newsletterAction } from './pages/Newsletter';
import AuthenticationPage, {
  action as authAction,
} from './pages/Authentication';
import { action as logoutAction } from './pages/Logout';
import { checkAuthLoader, tokenLoader } from './util/auth';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: 'root',
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'events',
        element: <EventsRootLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,
          },
          {
            path: ':eventId',
            id: 'event-detail',
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteEventAction,
              },
              {
                path: 'edit',
                element: <EditEventPage />,
                action: manipulateEventAction,
                loader: checkAuthLoader,
              },
            ],
          },
          {
            path: 'new',
            element: <NewEventPage />,
            action: manipulateEventAction,
            loader: checkAuthLoader,
          },
        ],
      },
      {
        path: 'offers',
        element: <OffersRootLayout />,
        children: [
          {
            index: true,
            element: <OffersPage />,
            loader: offersLoader,
          },
          {
            path: ':offerId',
            id: 'offer-detail',
            loader: offerDetailLoader,
            children: [
              {
                index: true,
                element: <OfferDetailPage />,
                action: deleteOfferAction,
              },
              {
                path: 'edit',
                element: <EditOfferPage />,
                action: manipulateOfferAction,
                loader: checkAuthLoader,
              },
            ],
          },
          {
            path: 'new',
            element: <NewOfferPage />,
            action: manipulateEventAction,
            loader: checkAuthLoader,
          },
        ],
      },
      {
        path: 'auth',
        element: <AuthenticationPage />,
        action: authAction,
      },
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction,
      },
      {
        path: 'logout',
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
