import {LoadingKeys, LoadingStatus} from "../loading-store";

function makeIdle(key: LoadingKeys | string) {
  return {
    key,
    status: LoadingStatus.Idle,
  };
}

function makePending(key: string | LoadingKeys) {
  return {
    key,
    status: LoadingStatus.Pending,
  };
}

function makeResolved(key: LoadingKeys | string) {
  return {
    key,
    status: LoadingStatus.Resolved,
  };
}

function makeRejected(key: LoadingKeys | string) {
  return {
    key,
    status: LoadingStatus.Rejected,
  };
}

export {makeIdle, makePending, makeResolved, makeRejected};
