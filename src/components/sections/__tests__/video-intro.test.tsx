import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { VideoIntro } from '../video-intro';

describe('VideoIntro', () => {
  it('renders section with id="video-intro"', () => {
    const { container } = render(<VideoIntro />);
    const section = container.querySelector('#video-intro');
    expect(section).toBeInTheDocument();
  });

  it('renders a video element with poster attribute', () => {
    render(<VideoIntro />);
    const video = document.querySelector('video');
    expect(video).toBeInTheDocument();
    expect(video?.getAttribute('poster')).toBe('/intro-poster.svg');
  });

  it('renders two source elements (WebM + MP4)', () => {
    render(<VideoIntro />);
    const sources = document.querySelectorAll('video source');
    expect(sources.length).toBe(2);
    expect(sources[0].getAttribute('type')).toBe('video/webm');
    expect(sources[1].getAttribute('type')).toBe('video/mp4');
  });

  it('renders a track element for captions', () => {
    render(<VideoIntro />);
    const track = document.querySelector('track');
    expect(track).toBeInTheDocument();
    expect(track?.getAttribute('kind')).toBe('captions');
    expect(track?.getAttribute('src')).toBe('/intro.vtt');
  });

  it('renders play button', () => {
    render(<VideoIntro />);
    expect(screen.getByLabelText('Play video introduction')).toBeInTheDocument();
  });

  it('renders heading with Introduction label', () => {
    render(<VideoIntro />);
    expect(screen.getByText('Meet Jerome')).toBeInTheDocument();
  });
});
