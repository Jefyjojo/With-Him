import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import { MemberProtectedRoute } from '@/components/ui/member-protected-route';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePage from '@/components/pages/HomePage';
import OnboardingPage from '@/components/pages/OnboardingPage';
import PersonalizedWelcomePage from '@/components/pages/PersonalizedWelcomePage';
import MoodScripturePage from '@/components/pages/MoodScripturePage';
import DailyWalkPage from '@/components/pages/DailyWalkPage';
import PrayerJournalPage from '@/components/pages/PrayerJournalPage';
import SilentReflectionPage from '@/components/pages/SilentReflectionPage';
import ProfilePage from '@/components/pages/ProfilePage';
import TestimoniesPage from '@/components/pages/TestimoniesPage';
import TestimonyDetailPage from '@/components/pages/TestimonyDetailPage';
import ReflectionsPage from '@/components/pages/ReflectionsPage';
import ReflectionDetailPage from '@/components/pages/ReflectionDetailPage';

// Layout component that includes Header, ScrollToTop, and Footer
function Layout() {
  return (
    <>
      <Header />
      <ScrollToTop />
      <Outlet />
      <Footer />
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
        path: "onboarding",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to personalize your experience">
            <OnboardingPage />
          </MemberProtectedRoute>
        ),
      },
      {
        path: "welcome",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to access your personalized welcome">
            <PersonalizedWelcomePage />
          </MemberProtectedRoute>
        ),
      },
      {
        path: "mood-scripture",
        element: <MoodScripturePage />,
      },
      {
        path: "daily-walk",
        element: <DailyWalkPage />,
      },
      {
        path: "prayer-journal",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to access your prayer journal">
            <PrayerJournalPage />
          </MemberProtectedRoute>
        ),
      },
      {
        path: "silent-reflection",
        element: <SilentReflectionPage />,
      },
      {
        path: "profile",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to access your profile">
            <ProfilePage />
          </MemberProtectedRoute>
        ),
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
