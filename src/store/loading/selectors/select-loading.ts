import {MainState} from "../../main/create-store";
import {LoadingKeys, LoadingStatus} from "../loading-store";

function selectLoading(name: LoadingKeys) {
  return (state: MainState) => ({
    loading: state.loading[name],
    isIdle: state.loading[name] === LoadingStatus.Idle,
    isPending: state.loading[name] === LoadingStatus.Pending,
    isResolved: state.loading[name] === LoadingStatus.Resolved,
    isRejected: state.loading[name] === LoadingStatus.Rejected,
  });
}

export {selectLoading};
