declare type State = "FETCHING" | "SUCCESS" | "FAILURE" | "INIT";
declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>; // T로 부터 property K를 제외
declare type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
declare type ApiResponse<T> = {
  payload: T;
};
