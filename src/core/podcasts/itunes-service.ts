import { ItunesRepository } from './itunes-repository';

export const getPopularPodcasts = async () => {
  const response = await ItunesRepository.getMostPopularPodcasts();
  return response;
};

export const getPodcastDetails = async (id: string) => {
  const response = await ItunesRepository.getPodcastById(id);
  return response;
};
