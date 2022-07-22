export interface IBundleStartPayload {
  cellId: string;
}

export interface IBundleCompletePayload {
  cellId: string;
  bundle: {
    code: string;
    err: string;
  };
}

export interface IBundleState {
  [key: string]:
    | {
        loading: boolean;
        code: string;
        err: string;
      }
    | undefined;
}
