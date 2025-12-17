import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import TestimoniesPage from '@/components/pages/TestimoniesPage';
import TestimonyDetailPage from '@/components/pages/TestimonyDetailPage';
import ReflectionsPage from '@/components/pages/ReflectionsPage';
import ReflectionDetailPage from '@/components/pages/ReflectionDetailPage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "testimonies",
        element: <TestimoniesPage />,
      },
      {
        path: "testimonies/:id",
        element: <TestimonyDetailPage />,
      },
      {
        path: "reflections",
        element: <ReflectionsPage />,
      },
      {
        path: "reflections/:id",
        element: <ReflectionDetailPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
