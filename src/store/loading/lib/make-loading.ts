import {LoadingKeys, LoadingStatus} from "../loading-store";

function makeIdle(key: LoadingKeys) {
  return {
    key,
    status: LoadingStatus.Idle,
  };
}

function makePending(key: LoadingKeys) {
  return {
    key,
    status: LoadingStatus.Pending,
  };
}

function makeResolved(key: LoadingKeys) {
  return {
    key,
    status: LoadingStatus.Resolved,
  };
}

function makeRejected(key: LoadingKeys) {
  return {
    key,
    status: LoadingStatus.Rejected,
  };
}

export {makeIdle, makePending, makeResolved, makeRejected};
