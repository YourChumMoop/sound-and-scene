import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Custom CSS
import './index.css';
import './App.css';

// Components
import App from './App.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import Home from './pages/Home.tsx';
import Events from './pages/Events.tsx';
import EventDetails from './pages/EventDetails.tsx';
import Login from './pages/Login.tsx';

// Routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true, // Default route for "/"
        element: <Home />
      },
      {
        path: 'events',
        element: <Events />
      },
      {
        path: 'event-details',
        element: <EventDetails />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: '*', // Route for undefined paths
        element: <ErrorPage />
      }
    ]
  }
]);

// Rendering the application
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}