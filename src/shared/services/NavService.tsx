import * as React from 'react';

export const navigationRef: any = React.createRef();

export function navigate(name: string, params = null) {
  navigationRef.current?.navigate(name, params);
}

export const getCurrentRoute = () => {
  const route = navigationRef.getCurrentRoute();
  return route.name;
};
