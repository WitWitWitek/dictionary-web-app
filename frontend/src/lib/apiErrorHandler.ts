export interface IApiError {
  error: {
    data: {
      message: string;
    };
    status: number;
  };
}

export function isErrorWithMessage(error: unknown): error is IApiError {
  const hasErrorPropertyError = typeof error === 'object' && error != null && 'error' in error;
  if (hasErrorPropertyError) {
    const { error: errorApi } = error as unknown as { error: IApiError };
    return (
      hasErrorPropertyError &&
      'data' in errorApi &&
      'status' in errorApi &&
      typeof (errorApi as any).data.message === 'string' &&
      typeof (errorApi as any).status === 'number'
    );
  }
  return false;
}
