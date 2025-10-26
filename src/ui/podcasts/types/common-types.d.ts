interface ReactComponentModule {
  default: React.ComponentType;
}

interface Episode {
  trackId: number;
  trackName: string;
  releaseDate: string;
  trackTimeMillis: number;
}
