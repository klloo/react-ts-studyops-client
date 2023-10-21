export interface ResponseType<T> {
  isSuccess: boolean;
  status: number;
  message: string;
  data?: T;
  error?: string;
}
