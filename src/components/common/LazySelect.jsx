import { lazy, Suspense } from 'react';

const LazySelect = lazy(() => import('react-select'));

const Select = (props) => (
  <Suspense
    fallback={
      <div className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 animate-pulse">
        Loading...
      </div>
    }
  >
    <LazySelect {...props} />
  </Suspense>
);

export default Select;
