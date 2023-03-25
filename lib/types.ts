export interface Test {
  name: string;
  callback: () => void;
}

export interface Describe {
  title: string;
  callback: () => void;
}
