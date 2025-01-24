import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Sidebar from "../components/Sidebar";
import Home from "../components/Home";
import Videopage from "../components/Videopage";
import Chanel from "../components/Chanel";
import Search from '../components/Search';

const router = createBrowserRouter([
  {
    path: '',
    element: <App />,
    children: [
      {
        path: '',
        element: <Sidebar />,
        children: [
          {
            path: 'category/:id',
            element: <Home />,
          },
          {
            path: 'video/:id',
            element: <Videopage />,
          },
          {
            path: 'channel/:id',
            element: <Chanel />,
          },
          {
            path: 'search',
            element: <Search />,
          },
        ],
      },
    ],
  },
]);

export default router;
