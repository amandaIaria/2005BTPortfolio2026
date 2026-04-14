import * as React from 'react';
import { useEffect, useRef, useState, useCallback } from 'react';
import { cn } from '../lib/utils';

declare global {
  interface Window {
    YT: typeof YT;
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
}

interface PlaylistVideo {
  id: string;
  title: string;
}

interface PlaylistProps extends React.ComponentProps<'div'> {
  videos: PlaylistVideo[];
}

let apiLoaded = false;
let apiReady = false;
const apiCallbacks: (() => void)[] = [];

function loadYouTubeApi(): Promise<void> {
  return new Promise((resolve) => {
    if (apiReady) {
      resolve();
      return;
    }

    apiCallbacks.push(resolve);

    if (!apiLoaded) {
      apiLoaded = true;
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);

      window.onYouTubeIframeAPIReady = () => {
        apiReady = true;
        for (const cb of apiCallbacks) cb();
        apiCallbacks.length = 0;
      };
    }
  });
}

function Playlist({ videos, className, ...props }: PlaylistProps) {
  const playerRef = useRef<YT.Player | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (videos.length === 0) return;

    let player: YT.Player | null = null;

    loadYouTubeApi().then(() => {
      if (!containerRef.current) return;

      const el = document.createElement('div');
      containerRef.current.appendChild(el);

      player = new window.YT.Player(el, {
        height: '1',
        width: '1',
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          modestbranding: 1,
        },
        events: {
          onReady: () => {
            playerRef.current = player;
            setReady(true);
          },
          onStateChange: (event: YT.OnStateChangeEvent) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
            } else if (
              event.data === window.YT.PlayerState.PAUSED ||
              event.data === window.YT.PlayerState.ENDED
            ) {
              setIsPlaying(false);
            }
            if (event.data === window.YT.PlayerState.ENDED) {
              const next = currentIndex + 1;
              if (next < videos.length) {
                playVideo(next);
              }
            }
          },
        },
      });
    });

    return () => {
      player?.destroy();
      playerRef.current = null;
    };
  }, []);

  const playVideo = useCallback(
    (index: number) => {
      if (!playerRef.current || index < 0 || index >= videos.length) return;
      const video = videos[index];
      playerRef.current.loadVideoById(video.id);
      setCurrentIndex(index);
      setIsPlaying(true);
    },
    [videos],
  );

  const togglePlayPause = useCallback(() => {
    if (!playerRef.current) return;

    if (isPlaying) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else if (currentIndex >= 0) {
      playerRef.current.playVideo();
      setIsPlaying(true);
    } else if (videos.length > 0) {
      playVideo(0);
    }
  }, [isPlaying, currentIndex, videos, playVideo]);

  return (
    <div
      data-component="playlist"
      className={cn('flex flex-col gap-2', className)}
      {...props}
    >
      {/* Hidden YouTube player */}
      <div
        ref={containerRef}
        className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0"
        aria-hidden="true"
      />

      {/* Controls */}
      <div className="flex items-center gap-3 border border-[var(--line)] bg-[var(--surface)] px-4 py-2">
        <button
          type="button"
          onClick={togglePlayPause}
          disabled={!ready}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--foam)] text-[var(--sea-ink)] transition-colors hover:bg-[var(--lagoon)]/20 disabled:opacity-40"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="currentColor"
              aria-hidden="true"
            >
              <rect x="2" y="1" width="4" height="12" rx="1" />
              <rect x="8" y="1" width="4" height="12" rx="1" />
            </svg>
          ) : (
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M3 1.5v11l9-5.5z" />
            </svg>
          )}
        </button>
        <span className="truncate text-sm font-medium text-[var(--sea-ink)]">
          {currentIndex >= 0
            ? videos[currentIndex].title
            : 'Select a track'}
        </span>
      </div>

      {/* Track list */}
      <ul className="flex flex-col" role="list">
        {videos.map((video, index) => (
          <li key={video.id}>
            <button
              type="button"
              onClick={() => playVideo(index)}
              disabled={!ready}
              className={cn(
                'flex w-full items-center gap-3 border border-[var(--line)] px-4 py-2 text-left text-sm transition-colors hover:bg-[var(--surface-strong)] disabled:opacity-40',
                index === currentIndex &&
                  'bg-[var(--lagoon)]/10 font-semibold text-[var(--lagoon-deep)]',
                index > 0 && '-mt-px',
              )}
            >
              <span className="w-5 shrink-0 text-center text-xs text-[var(--sea-ink-soft)]">
                {index === currentIndex && isPlaying ? '▶' : index + 1}
              </span>
              <span className="truncate">{video.title}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { Playlist };
export type { PlaylistVideo, PlaylistProps };
