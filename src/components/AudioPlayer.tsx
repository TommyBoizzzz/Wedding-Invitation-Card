import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import weddingMusic from '../assets/audio/music.mp3';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const removeStartListeners = () => {
      document.removeEventListener('pointerdown', startPlayback);
      document.removeEventListener('keydown', startPlayback);
    };

    const startPlayback = () => {
      void audio.play()
        .then(removeStartListeners)
        .catch(error => {
          if (error instanceof DOMException && error.name === 'NotAllowedError') return;
          console.error('Failed to play wedding music:', error);
        });
    };

    startPlayback();
    document.addEventListener('pointerdown', startPlayback);
    document.addEventListener('keydown', startPlayback);

    return removeStartListeners;
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      return;
    }

    try {
      await audio.play();
    } catch (err) {
      console.error('Failed to play wedding music:', err);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <audio
        ref={audioRef}
        src={weddingMusic}
        loop
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={() => console.error('Failed to load wedding music file:', weddingMusic)}
      />
      <button
        onClick={toggleMusic}
        type="button"
        title={isPlaying ? 'ផ្អាកភ្លេង' : 'ចាក់ភ្លេងមង្គលការ'}
        className={`flex items-center gap-2 px-3 py-2.5 rounded-full shadow-lg border backdrop-blur-md transition-all duration-300 text-xs font-medium ${
          isPlaying
            ? 'bg-amber-600/90 text-white border-amber-400 shadow-amber-900/20'
            : 'bg-white/95 text-stone-700 border-amber-200/80 shadow-stone-900/10 hover:border-amber-400'
        }`}
      >
        <span className={`p-1 rounded-full ${isPlaying ? 'bg-amber-500 animate-spin' : 'bg-stone-100'}`} style={{ animationDuration: '6s' }}>
          <Music className="w-3.5 h-3.5" />
        </span>
        <span className="whitespace-nowrap hidden sm:inline">
          {isPlaying ? 'បទភ្លេងមង្គលការ' : 'ចាក់ភ្លេង'}
        </span>
        {isPlaying ? (
          <Volume2 className="w-4 h-4 text-amber-200" />
        ) : (
          <VolumeX className="w-4 h-4 text-stone-400" />
        )}
      </button>
    </div>
  );
};
