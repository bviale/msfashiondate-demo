import { PaginationOptionsResponse } from './Pagination';

export class MarsPicture {
    id: number;
    earthDate: Date;
    imageUrl: string;
    roverName: string;
    cameraName: string;
    isFavorite: boolean = false;
}

export class MarsPicturesApiResponse {
    pictures: Array<MarsPicture>;
    pagination: PaginationOptionsResponse;
}