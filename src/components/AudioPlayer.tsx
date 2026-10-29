import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import weddingMusic from '../assets/audio/music.mp3';

interface AudioPlayerProps {
  isPlaying?: boolean;
  onPlayingChange?: (isPlaying: boolean) => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ isPlaying: controlledIsPlaying = false, onPlayingChange }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(controlledIsPlaying);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setIsPlaying(controlledIsPlaying);
  }, [controlledIsPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (controlledIsPlaying) {
      void audio.play().catch((error) => {
        if (error instanceof DOMException && error.name === 'NotAllowedError') return;
        console.error('Failed to play wedding music:', error);
      });
      return;
    }

    audio.pause();
  }, [controlledIsPlaying]);

  const toggleMusic = async () => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    onPlayingChange?.(nextState);

    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (nextState) {
        await audio.play();
      } else {
        audio.pause();
      }
    } catch (error) {
      console.error('Failed to play wedding music:', error);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <audio
        ref={audioRef}
        src={weddingMusic}
        loop
        preload="metadata"
        onPlay={() => {
          setIsPlaying(true);
          onPlayingChange?.(true);
        }}
        onPause={() => {
          setIsPlaying(false);
          onPlayingChange?.(false);
        }}
        onError={() => console.error('Failed to load wedding music file:', weddingMusic)}
      />
      <button
        onClick={toggleMusic}
        type="button"
        title={isPlaying ? 'ផ្អាកភ្លេង' : 'ចាក់ភ្លេងមង្គលការ'}
        className={`flex items-center gap-2 px-3 py-2.5 rounded-full shadow-lg border backdrop-blur-md transition-all duration-300 text-xs font-medium ${
          isPlaying
            ? 'bg-[var(--color-gold)]/90 text-[var(--color-olive-dark)] border-[var(--color-gold)] shadow-[0_8px_24px_rgba(11,20,15,0.18)]'
            : 'bg-[var(--color-ivory)]/95 text-[var(--color-olive-dark)] border-[rgba(201,150,53,0.45)] shadow-[0_8px_24px_rgba(11,20,15,0.12)] hover:border-[var(--color-gold)]'
        }`}
      >
        <span className={`p-1 rounded-full ${isPlaying ? 'bg-[var(--color-olive)] text-[var(--color-ivory)] animate-spin' : 'bg-[rgba(33,54,41,0.08)] text-[var(--color-olive)]'}`} style={{ animationDuration: '6s' }}>
          <Music className="w-3.5 h-3.5" />
        </span>
        <span className="whitespace-nowrap hidden sm:inline">
          {isPlaying ? 'បទភ្លេងមង្គលការ' : 'ចាក់ភ្លេង'}
        </span>
        {isPlaying ? (
          <Volume2 className="w-4 h-4 text-[var(--color-olive-dark)]" />
        ) : (
          <VolumeX className="w-4 h-4 text-[rgba(26,41,31,0.65)]" />
        )}
      </button>
    </div>
  );
};
