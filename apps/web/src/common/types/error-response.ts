export type ErrorResponse<TFieldValues extends FieldValues = FieldValues> = {
  statusCode: number;
  message: string;
  error?: string;
  errors?: TFieldValues;
};

export type FieldValues = Record<string, string>;
