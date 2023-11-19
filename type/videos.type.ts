export interface IVideoList {
  data: IVideos[];
  pagination: IVideoPagination;
}

export interface IVideos {
  videoId: string;
  title: string;
  description: string;
  public: boolean;
  panoramic: boolean;
  mp4Support: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  tags: any[];
  metadata: any[];
  source: IVideoSource;
  assets: IVideoAssets;
}

export interface IVideoSource {
  type: string;
  uri: string;
}

export interface IVideoAssets {
  iframe: string;
  player: string;
  hls: string;
  thumbnail: string;
  mp4: string;
}

export interface IVideoPagination {
  currentPage: number;
  currentPageItems: number;
  pageSize: number;
  pagesTotal: number;
  itemsTotal: number;
  links: Link[];
}

export interface Link {
  rel: string;
  uri: string;
}
