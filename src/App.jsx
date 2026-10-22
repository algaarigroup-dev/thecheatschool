import React, { lazy } from "react";
import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
const Events = lazy(() => import("./pages/EventsPage"));
const Gallery = lazy(() => import("./pages/GalleryPage"));
const ContactUs = lazy(() => import("./pages/ContactUsPage"));
import LandingPage from "./pages/LandingPage";
const BlogsPage = lazy(() => import("./pages/BlogsPage"));
const BlogDetailPage = lazy(() => import("./pages/BlogDetailPage"));
import NotFound from "./pages/not-found";
const CivilEngineering = lazy(() => import("./pages/CivilEngineering"));
const AiCourses = lazy(() => import("./pages/AiEngineering"));
const LegalPage = lazy(() => import("./pages/LegalPage"));
const FrenchNclc7 = lazy(() => import("./pages/FrenchNclc7"));

// Hash routing is used only for the hosted preview build (VITE_PREVIEW=1).
const createRouter = import.meta.env.VITE_PREVIEW ? createHashRouter : createBrowserRouter;

const router = createRouter([
{
  path: "/",
  element: <Layout />,
  children: [
  {
    index: true,
    element: <LandingPage />
  },
  {
    path: "events",
    element: <Events />
  },
  {
    path: "gallery",
    element: <Gallery />
  },
  {
    path: "blogs",
    element: <BlogsPage />
  },
  {
    path: "blogs/:slug",
    element: <BlogDetailPage />
  },
  {
    path: "contact-us",
    element: <ContactUs />
  }, {

    path: "civil-engineering",
    element: <CivilEngineering />
  },
  {

    path: "ai-engineering",
    element: <AiCourses />
  },
  { path: "french-nclc-7", element: <FrenchNclc7 /> },
  { path: "terms", element: <LegalPage doc="terms" /> },
  { path: "privacy", element: <LegalPage doc="privacy" /> },
  { path: "refund-policy", element: <LegalPage doc="refund-policy" /> }]


},
{
  path: "*",
  element: <NotFound />
}]
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;