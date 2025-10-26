export interface AllOriginsResponse<T> {
  status: number;
  method: string;
  url: string;
  response: {
    contents: T;
    status: {
      url: string;
      content_type: string;
      http_code: number;
      response_time: number;
      content_length: number;
    };
  };
}

export interface ItunesPopularResponse {
  feed: Feed;
}

export interface Feed {
  author: Author;
  entry: Entry[];
  updated: Icon;
  rights: Icon;
  title: Icon;
  link: Link[];
  id: Icon;
}

export interface Author {
  name: Icon;
  uri: Icon;
}

export interface Icon {
  label: string;
}

export interface Entry {
  'im:name': Icon;
  'im:image': IMImage[];
  summary: Icon;
  'im:price': IMPrice;
  'im:contentType': IMContentType;
  rights?: Icon;
  title: Icon;
  link: Link;
  id: ID;
  'im:artist': IMArtist;
  category: Category;
  'im:releaseDate': IMReleaseDate;
}

export interface Category {
  attributes: CategoryAttributes;
}

export interface CategoryAttributes {
  'im:id': string;
  term: TermLabel;
  scheme: string;
  label: TermLabel;
}

export type TermLabel =
  | 'Music'
  | 'Music Commentary'
  | 'Music History'
  | 'Music Interviews';

export interface ID {
  label: string;
  attributes: {
    'im:id': string;
  };
}

export interface IMArtist {
  label: string;
  attributes?: {
    href: string;
  };
}

export interface IMContentType {
  attributes: {
    term: 'Podcast';
    label: 'Podcast';
  };
}

export interface IMImage {
  label: string;
  attributes: {
    height: string;
  };
}

export interface IMPrice {
  label: string;
  attributes: {
    amount: string;
    currency: string;
  };
}

export interface IMReleaseDate {
  label: Date;
  attributes: Icon;
}

export interface Link {
  attributes: {
    rel: Rel;
    type?: 'text/html' | 'image/png';
    href: string;
  };
}

export type Rel = 'alternate' | 'self';

export type ItunesDetailsResponse = ItunesLookupResult & ITunesEpisode;

export interface ItunesLookupResponse {
  resultCount: number;
  results: ItunesDetailsResponse[];
}

export interface ItunesLookupResult {
  kind: string;
  collectionId: number;
  trackId: number;
  artistName: string;
  collectionName: string;
  trackName: string;
  artworkUrl100: string;
  trackCount: number;
  artworkUrl600: string;
}

export interface ITunesEpisode {
  artworkUrl600: string;
  artistIds: number[];
  episodeGuid: string;
  releaseDate: string;
  trackId: number;
  trackName: string;
  trackViewUrl: string;
  trackTimeMillis: number;
  shortDescription: string;
  closedCaptioning: string;
  collectionId: number;
  collectionName: string;
  kind: string;
  description: string;
  country: string;
  previewUrl: string;
  artworkUrl160: string;
  episodeUrl: string;
  episodeFileExtension: string;
}
