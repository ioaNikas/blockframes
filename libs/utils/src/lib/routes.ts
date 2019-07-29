// import { Route } from '@angular/router';

// /**
//  * Returns the base routes (with basic guards like auth/organization/permissions)
//  * and takes children routes as an argument.
//  * @param children must be an array of Route objects. Usually, we use app specific routes for this param.
//  */
// // Find a way to use this function to build our routes => ISSUE#694
// export function routeFactory(children: Route[], appName?: string) {
//   const layout = {
//     path: 'layout',
//     component: LayoutComponent,
//     canActivate: [AuthGuard],
//     canDeactivate: [AuthGuard],
//     children: [
//       {
//         path: '',
//         redirectTo: 'o',
//         pathMatch: 'full'
//       },
//       {
//         path: 'organization',
//         loadChildren: () => import('@blockframes/organization').then(m => m.NoOrganizationModule)
//       },
//       {
//         path: 'o',
//         canActivate: [PermissionsGuard, OrganizationGuard],
//         canDeactivate: [PermissionsGuard, OrganizationGuard],
//         children: [
//           ...children,
//           {
//             path: 'account',
//             loadChildren: () => import('@blockframes/account').then(m => m.AccountModule)
//           },
//           {
//             path: 'organization',
//             loadChildren: () => import('@blockframes/organization').then(m => m.OrganizationModule)
//           }
//         ]
//       }
//     ]
//   };

//   let app: Route;
//   if (appName) {
//     app = {
//       path: appName,
//       children: [
//         {
//           path: '',
//           redirectTo: 'layout',
//           pathMatch: 'full'
//         }
//         , layout
//       ]
//     };
//   } else {
//     app = layout;
//   }

//   return [
//     {
//       path: '',
//       redirectTo: appName,
//       pathMatch: 'full'
//     },
//     {
//       path: 'auth',
//       loadChildren: () => import('@blockframes/auth').then(m => m.AuthModule)
//     },
//     app, // APP ROUTING HERE
//     {
//       path: 'not-found',
//       loadChildren: () => import('@blockframes/ui').then(m => m.ErrorNotFoundModule)
//     },
//     {
//       path: '**',
//       loadChildren: () => import('@blockframes/ui').then(m => m.ErrorNotFoundModule)
//     }
//   ];
// }
