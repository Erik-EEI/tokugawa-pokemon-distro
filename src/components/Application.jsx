import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import {
  AreaFightPage,
  DashboardPage,
  ErrorPage,
  HistoryPage,
  MarketplacePage,
  SelectLocationPage,
  SnippetPage,
  TeamManagementPage,
  WelcomePage,
} from 'pages';
import { Layout } from 'components';
import { randomNumberGenerator } from 'utils';
import '../index.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBone, faChessRook, faCircleNotch, faCoins, faCrown, faHouseUser, faLocationDot, faSackDollar, faShield, faSkull, faStar, faTrophy } from '@fortawesome/free-solid-svg-icons';
library.add(faBone, faChessRook, faCircleNotch, faCoins, faCrown, faHouseUser, faLocationDot, faShield, faSackDollar, faSkull, faStar, faTrophy);

const router = createBrowserRouter(createRoutesFromElements(
  <Route element={<Layout />} errorElement={<ErrorPage />}>
    <Route path={'/'} errorElement={<ErrorPage />}>
      <Route index element={<WelcomePage />} />
    </Route>
    <Route path={'/dashboard'}>
      <Route index element={<DashboardPage />} loader={async () => await fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumberGenerator(1, 1010)}`)} />
      <Route path={'marketplace'} element={<MarketplacePage />} />
      <Route path={'team-management'} element={<TeamManagementPage />} />
      <Route path={'history'} element={<HistoryPage />} />
    </Route>
    <Route path={'/location'}>
      <Route index element={<SelectLocationPage />} />
      <Route path={':area'} element={<AreaFightPage />} />
    </Route>
    <Route path={'/snippet'}>
      <Route index element={<SnippetPage />} />
    </Route>
  </Route>,
));

const Application = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default Application;
