import * as React from 'react';
import { NavigationActions } from 'react-navigation';

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}


// export function goBack() { 
//     navigationRef.dispatch(
//         NavigationActions.back()
//     );
// }