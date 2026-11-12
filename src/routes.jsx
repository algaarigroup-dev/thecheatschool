// Route table, lazily loaded pages and page preloading.
import React from "react";
import lazyPreload from "./utils/lazyPreload";
import { createBrowserRouter, createHashRouter } from "react-router-dom";
import Layout from "./Layout";
const Events = lazyPreload(() => import("./pages/EventsPage"));
const ContactUs = lazyPreload(() => import("./pages/ContactUsPage"));
import LandingPage from "./pages/LandingPage";
const BlogsPage = lazyPreload(() => import("./pages/BlogsPage"));
const BlogDetailPage = lazyPreload(() => import("./pages/BlogDetailPage"));
import NotFound from "./pages/not-found";
const CivilEngineering = lazyPreload(() => import("./pages/CivilEngineering"));
const AiCourses = lazyPreload(() => import("./pages/AiEngineering"));
const LegalPage = lazyPreload(() => import("./pages/LegalPage"));
const FrenchNclc7 = lazyPreload(() => import("./pages/FrenchNclc7"));

// Hash routing is used only for the hosted preview build (VITE_PREVIEW=1).
const createRouter = import.meta.env.VITE_PREVIEW ? createHashRouter : createBrowserRouter;

export const router = createRouter([
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

// Load the code for the page being opened before React takes over the
// prerendered HTML (see main.jsx).
const PAGE_BY_PATH = [
  [/^\/events\/?$/, Events],
  [/^\/blogs\/?$/, BlogsPage],
  [/^\/blogs\/[^/]+\/?$/, BlogDetailPage],
  [/^\/contact-us\/?$/, ContactUs],
  [/^\/civil-engineering\/?$/, CivilEngineering],
  [/^\/ai-engineering\/?$/, AiCourses],
  [/^\/french-nclc-7\/?$/, FrenchNclc7],
  [/^\/(terms|privacy|refund-policy)\/?$/, LegalPage],
];
export const preloadCurrentPage = (pathname) => {
  const hit = PAGE_BY_PATH.find(([re]) => re.test(pathname));
  return hit ? hit[1].preload().catch(() => {}) : Promise.resolve();
};
