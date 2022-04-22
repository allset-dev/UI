// import { call, cancel, fork, take, select } from 'redux-saga/effects';

// export function LHCheckType(prop) {
//   const propType = typeof prop;
//   if (propType === 'object') {
//     // objet can be array or null, so explicitly checking for them and returning a custom string.
//     if (Array.isArray(prop)) {
//       return 'array';
//     } else if (prop === null) {
//       return 'null';
//     }
//   }
//   return propType;
// }

// export function LHGetExpectedProperties({ payload = {}, defaultState } = {}) {
//   const payloadType = LHCheckType(payload);
//   const defaultStateType = LHCheckType(defaultState);
//   let finalPayload = {};
//   if (payloadType !== 'object') {
//     // eslint-disable-next-line no-console
//     console.error(
//       `Expected payload to be an object but got ${payloadType}.\n`,
//       'payload: ',
//       payload
//     );
//   } else if (defaultStateType !== 'object') {
//     // eslint-disable-next-line no-console
//     console.error(
//       `Expected defaultValues to be an object but got ${defaultStateType}.\n`,
//       'defaultState: ',
//       defaultState
//     );
//   } else {
//     const payloadEntries = Object.entries(payload);

//     if (payloadEntries.length > 0) {
//       const propsToUpdate = payloadEntries.filter(([payloadEntryKey, payloadEntryValue]) => {
//         const defaultPropValue = defaultState[payloadEntryKey];
//         const defaultPropValueType = LHCheckType(defaultPropValue);

//         if (defaultPropValueType === 'undefined') {
//           // if provided key value pair is not found in defaultState.

//           // eslint-disable-next-line no-console
//           console.error(
//             `${payloadEntryKey} does not exists in default state\n`,
//             'defaultState: ',
//             defaultState
//           );
//         } else if (defaultPropValueType === 'object') {
//           // if provided value is an object.

//           // eslint-disable-next-line no-console
//           console.error(
//             `${payloadEntryKey} cannot be set, because setting object using spread operator might create new non existing states, so please create a new action reducer\n`,
//             `${payloadEntryKey}: `,
//             payloadEntryValue
//           );
//         } else {
//           const payloadEntryValueType = LHCheckType(payloadEntryValue);
//           if (payloadEntryValueType !== defaultPropValueType) {
//             // if type of provided value is diffrent from defaultState value.

//             // eslint-disable-next-line no-console
//             console.error(
//               `${payloadEntryKey} is expected to be ${defaultPropValueType} but got ${payloadEntryValueType}`
//             );
//           } else {
//             // Enters this block on below condition:
//             // 1.provided key exists in defaultState
//             // 2.value type matches the default state type.
//             // 3.value is not an object.
//             return true;
//           }
//         }
//         return false;
//       });

//       finalPayload = Object.fromEntries(propsToUpdate);
//     } else {
//       // on empty payload, defaultState will be set.
//       finalPayload = defaultState;
//     }
//   }
//   return finalPayload;
// }

// function stopType(type) {
//   return `${type}-STOP`;
// }

// export function stoppableSaga(type, step) {
//   return [
//     type,
//     function*({ payload }) {
//       // Starts the task in the background.
//       const task = yield fork(step, { payload });

//       // Wait for the user to stop the fetchs step, if he clicks on some other trigger node
//       yield take(stopType(type));

//       // Once user calls the stopFetchSteps action
//       // this causes the forked task `fetchStepTask` to jump into its finally block.
//       yield cancel(task);
//     },
//   ];
// }

// export function stopAction(type) {
//   return {
//     type: stopType(type),
//   };
// }

// /**
//  * Safely return failure for yield call
//  * This function prevents the response to go into catch block, if the api fails.
//  * It is also helpful when we're calling multiple apis with yield all(data => call([], data))
//  * and we do not want it to fail and go into catch block, as soon as one of the apis fails
//  * Ref: https://github.com/redux-saga/redux-saga/issues/1128
//  */
// export function safeCall(worker, ...args) {
//   return call(function*() {
//     try {
//       const response = yield call(worker, ...args);
//       return { response };
//     } catch (error) {
//       return { error, data: args };
//     }
//   });
// }

// export function* sagaWaitFor(selector) {
//   if (yield select(selector)) return;

//   while (true) {
//     yield take('*');
//     if (yield select(selector)) return;
//   }
// }
