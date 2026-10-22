import React, { Suspense, useState } from 'react';
import Loader from './components/global/Loader';
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import Navbar from './components/global/Navbar';
import Footer from './components/global/Footer';
import usePageMeta from './hooks/usePageMeta';
import { ROUTES_META } from './config/routes-meta';
import { LEGAL_READY } from './config/site';

// Applies title and meta tags for every static route. Dynamic pages such as
// a single blog post set their own via usePageMeta.
const RouteMeta = () => {
  const { pathname } = useLocation();
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  const meta = ROUTES_META[clean];
  if (meta?.legal && !LEGAL_READY) return null;
  return meta ? <RouteMetaApply path={clean} meta={meta} /> : null;
};

const RouteMetaApply = ({ path, meta }) => {
  usePageMeta({ title: meta.title, description: meta.description, path });
  return null;
};

const Layout = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div>
      <RouteMeta />
      <ScrollRestoration />
      <Navbar isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
      <main>
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <Loader />
            </div>
          }>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
