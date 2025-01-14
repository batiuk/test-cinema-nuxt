export interface ApiResponse<T> {
    error_code: number;
    error_message: string;
    data: T;
}
