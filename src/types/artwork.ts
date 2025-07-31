export interface Artwork {
  id: number;
  title: string;
  artist_title: string;
  date_display: string;
  medium_display: string;
  dimensions: string;
  image_id: string;
  thumbnail?: {
    width: number;
    height: number;
    alt_text: string;
  };
}

export interface ArtworkResponse {
  data: Artwork[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    total_pages: number;
    current_page: number;
    next_url: string | null;
    prev_url: string | null;
  };
  info: {
    license_text: string;
    license_links: string[];
    version: string;
  };
  config: {
    iiif_url: string;
    website_url: string;
  };
} 