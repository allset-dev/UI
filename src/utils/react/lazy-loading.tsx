// import { lazy, Suspense } from 'react';

// import { LHEmpty } from 'component/empty';
// import { LHPageSpinner } from 'component/page-spinner';

// export function createSuspense(LazyComponent, showLoading) {
//   return function(props) {
//     return (
//       <Suspense fallback={showLoading ? <LHPageSpinner /> : <LHEmpty />}>
//         <LazyComponent {...props} />
//       </Suspense>
//     );
//   };
// }

// export function lazyLoader(lazyImport, showLoading = false) {
//   const LazyComponent = lazy(() => retry(lazyImport));
//   return createSuspense(LazyComponent, showLoading);
// }

// /**
//  * If the browser fails to load a chunk/module, it will retry to do it 5 more times with a 1 second
//  * delay between each attempt. We only retry if it fails to load and if it loads then no more
//  * retries. If it fails even after 5 attempts, browser will give the error.
//  *
//  * @param {Function} fn: callback with dynamic import
//  * @param {Number} retriesLeft: no. of times we can retry
//  * @param {Number} interval: retry after this much interval interval
//  */
// export function retry(fn, retriesLeft = 5, interval = 1000) {
//   return new Promise((resolve, reject) => {
//     fn()
//       .then(resolve)
//       .catch(error => {
//         setTimeout(() => {
//           if (retriesLeft === 1) {
//             // reject('maximum retries exceeded');
//             reject(error);
//             return;
//           }

//           // Passing on "reject" is the important part
//           retry(fn, retriesLeft - 1, interval).then(resolve, reject);
//         }, interval);
//       });
//   });
// }
