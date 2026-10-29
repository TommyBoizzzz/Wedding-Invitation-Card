
import React, { useEffect, useRef, useState } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  SkipForward,
  Maximize2,
  Minimize2,
} from 'lucide-react';

type PreWeddingVideoProps = {
  onComplete: () => void;
  onResumeMusic?: () => void;
  videoSrc?: string;
};

export const PreWeddingVideo: React.FC<PreWeddingVideoProps> = ({
  onComplete,
  onResumeMusic,
  videoSrc = new URL('../assets/video/pre-wedding.mp4', import.meta.url).href,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const completedRef = useRef(false);

  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const formatTime = (seconds: number) => {
    if (!Number.isFinite(seconds) || seconds < 0) return '00:00';

    const total = Math.floor(seconds);
    const hours = Math.floor(total / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    const secs = total % 60;
    const pad = (n: number) => String(n).padStart(2, '0');

    return hours > 0
      ? `${pad(hours)}:${pad(minutes)}:${pad(secs)}`
      : `${pad(minutes)}:${pad(secs)}`;
  };

  const handleComplete = () => {
    if (completedRef.current) return;
    completedRef.current = true;

    const video = videoRef.current;
    if (video) {
      video.pause();
      video.muted = true;
    }

    onComplete();
    onResumeMusic?.();
  };

  const togglePlayback = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      try {
        await video.play();
      } catch (error) {
        console.warn('Unable to play video:', error);
      }
    } else {
      video.pause();
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleSeek = (value: number) => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(value)) return;

    video.currentTime = value;
    setCurrentTime(value);
  };

  const toggleFullscreen = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await video.requestFullscreen();
      }
    } catch {
      // Fullscreen may not be supported by the browser.
      // The video timeline remains available in the original layout.
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;

    video.play().catch(() => {
      setIsPaused(true);
    });
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener(
        'fullscreenchange',
        handleFullscreenChange,
      );
    };
  }, []);

  const progress =
    duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#050b09]">
      <div className="relative h-full w-full bg-black">
        {/* Original video */}
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          autoPlay
          muted
          playsInline
          preload="auto"
          onLoadedMetadata={(event) => {
            setDuration(event.currentTarget.duration || 0);
          }}
          onDurationChange={(event) => {
            const value = event.currentTarget.duration;
            if (Number.isFinite(value)) setDuration(value);
          }}
          onTimeUpdate={(event) => {
            if (!isSeeking) {
              setCurrentTime(event.currentTarget.currentTime);
            }
          }}
          onSeeking={() => setIsSeeking(true)}
          onSeeked={(event) => {
            setCurrentTime(event.currentTarget.currentTime);
            setIsSeeking(false);
          }}
          onEnded={handleComplete}
          onError={handleComplete}
          onPause={() => setIsPaused(true)}
          onPlay={() => setIsPaused(false)}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>

        {/* Original cinematic overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />

        {/* Top-right controls */}
        <div className="absolute right-4 top-4 z-10 flex items-center gap-2 sm:right-6 sm:top-6">
          {/* Sound */}
          {/* <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? 'Turn sound on' : 'Turn sound off'}
            className="flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-3 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-white shadow-lg backdrop-blur-md transition hover:bg-black/50 active:scale-95 sm:px-4"
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            <span>{isMuted ? 'Sound Off' : 'Sound On'}</span>
          </button> */}

          {/* Play / Pause */}
          {/* <button
            type="button"
            onClick={togglePlayback}
            aria-label={isPaused ? 'Play video' : 'Pause video'}
            className="flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-3 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-white shadow-lg backdrop-blur-md transition hover:bg-black/50 active:scale-95 sm:px-4"
          >
            {isPaused ? <Play size={15} /> : <Pause size={15} />}
            <span>{isPaused ? 'Play' : 'Pause'}</span>
          </button> */}

          {/* Zoom / Fullscreen */}
          {/* <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? 'Exit fullscreen' : 'View fullscreen'}
            title={isFullscreen ? 'Exit fullscreen' : 'View fullscreen'}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white shadow-lg backdrop-blur-md transition hover:bg-black/50 active:scale-95"
          >
            {isFullscreen ? (
              <Minimize2 size={17} />
            ) : (
              <Maximize2 size={17} />
            )}
          </button> */}

          {/* Skip */}
          <button
            type="button"
            onClick={handleComplete}
            aria-label="Close video and resume music"
            className="flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-3 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-white shadow-lg backdrop-blur-md transition hover:bg-black/50 active:scale-95 sm:px-4"
          >
            <SkipForward size={15} />
            <span>Skip</span>
          </button>
        </div>

        {/* Bottom video timeline */}
        <div className="absolute bottom-0 left-0 z-10 w-full px-4 pb-5 pt-12 sm:px-6 sm:pb-7">
          <div className="mb-2 flex items-center justify-between text-xs font-medium tabular-nums text-white/90">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          {/* Seek slider */}
          <div className="group relative flex h-6 items-center">
            <div className="absolute h-1.5 w-full overflow-hidden rounded-full bg-white/30 transition-all group-hover:h-2.5">
              <div
                className="h-full rounded-full bg-amber-300 transition-[width] duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>

            <input
              type="range"
              min={0}
              max={duration || 100}
              step={0.1}
              value={Math.min(currentTime, duration || 0)}
              disabled={!duration}
              onPointerDown={() => setIsSeeking(true)}
              onChange={(event) => {
                handleSeek(Number(event.target.value));
              }}
              onPointerUp={() => setIsSeeking(false)}
              onKeyUp={() => setIsSeeking(false)}
              aria-label="Seek video timeline"
              className="absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent
                [&::-webkit-slider-runnable-track]:h-1.5
                [&::-webkit-slider-thumb]:mt-[-5px]
                [&::-webkit-slider-thumb]:h-4
                [&::-webkit-slider-thumb]:w-4
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:border-2
                [&::-webkit-slider-thumb]:border-white
                [&::-webkit-slider-thumb]:bg-amber-300
                [&::-moz-range-thumb]:h-3
                [&::-moz-range-thumb]:w-3
                [&::-moz-range-thumb]:rounded-full
                [&::-moz-range-thumb]:border-2
                [&::-moz-range-thumb]:border-white
                [&::-moz-range-thumb]:bg-amber-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
