import App from "./containers/App";
import Popular from "./containers/Popular";
import Error from "./containers/Error";
import AppRoot from "./AppRoot";

const routes = [
  { component: AppRoot,
    routes: [
      { path: '/',
        exact: true,
        component: App
      },
      { path: '/favorite',
        component: Popular
      },
      {
        path: '*',
        component: Error
      }
    ]
  }
];

export default routes;