import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PodcastEpisode } from './index';

describe('PodcastEpisode', () => {
  it('renders the podcast episode details correctly', () => {
    const props = {
      name: 'Episode 1',
      description: '<p>This is the first episode</p>',
      audioUrl: 'http://example.com/audio.mp3',
    };

    render(<PodcastEpisode {...props} />);

    expect(screen.getByText('Episode 1')).toBeDefined();
    expect(screen.getByText('This is the first episode')).toBeDefined();
    expect(
      screen.getByTestId('podcast-episode-audio-player').getAttribute('src')
    ).toBe(props.audioUrl);
  });

  it('sanitizes the description before rendering', () => {
    const props = {
      name: 'Episode 2',
      description: '<script>alert("XSS")</script><p>Safe description</p>',
      audioUrl: 'http://example.com/audio2.mp3',
    };

    render(<PodcastEpisode {...props} />);

    expect(screen.queryByText('alert("XSS")')).toBeNull();
    expect(screen.getByText('Safe description')).toBeDefined();
  });

  it('renders the audio player with controls', () => {
    const props = {
      name: 'Episode 3',
      description: '<p>Another episode</p>',
      audioUrl: 'http://example.com/audio3.mp3',
    };

    render(<PodcastEpisode {...props} />);

    const audioPlayer = screen.getByTestId('podcast-episode-audio-player');
    expect(audioPlayer).toBeDefined();
    expect(audioPlayer.hasAttribute('controls')).toBe(true);
    expect(audioPlayer.getAttribute('src')).toBe(props.audioUrl);
  });
});
