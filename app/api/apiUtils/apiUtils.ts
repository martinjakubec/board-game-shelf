export type ApiError = {
  error: string
  success: false
}

export type ApiSuccess<T> = {
  success: true
  data: T
}

export function generateErrorResponse(error: string): ApiError {
  return {
    success: false,
    error: error,
  }
}

export function generateSuccessResponse<T>(data: T): ApiSuccess<T> {
  return {
    success: true,
    data,
  }
}
