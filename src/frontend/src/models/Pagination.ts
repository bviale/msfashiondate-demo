export class PaginationOptions {
    pageIndex: number;
    pageSize: number;
}

export class PaginationOptionsResponse extends PaginationOptions {
    totalCount: number;
}