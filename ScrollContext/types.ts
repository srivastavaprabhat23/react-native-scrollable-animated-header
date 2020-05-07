export interface ScrollContextInterface {
  opacity: number;
  maxOffset: number;
  offset: number;
  // test:object;
  titleShowing: boolean;
  updateOffset (val: number): void;
};