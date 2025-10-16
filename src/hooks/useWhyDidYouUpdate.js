import { useEffect, useRef } from 'react';

// Create a custom hook to detect unnecessary re-renders
function useWhyDidYouUpdate(name, props) {
  const previousProps = useRef();

  useEffect(() => {
    if (previousProps.current) {
      const allKeys = Object.keys({ ...previousProps.current, ...props });
      const changesObj = {};

      allKeys.forEach((key) => {
        if (previousProps.current[key] !== props[key]) {
          changesObj[key] = {
            from: previousProps.current[key],
            to: props[key],
          };
        }
      });

      if (Object.keys(changesObj).length) {
        console.log('[why-did-you-update]', name, changesObj);
      }
    }

    previousProps.current = props;
  });
}

// Usage in component
function MyComponent(props) {
  useWhyDidYouUpdate('MyComponent', props);
  return <div>{/* ... */}</div>;
}
