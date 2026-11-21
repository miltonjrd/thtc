import { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import correctedImage from "@/assets/thtc-coluna-corrigida.jpg";
import audioAsset from "@/assets/thtc-coluna-corrigida-3s.wav.asset.json";

export const INTRO_AUDIO_SECONDS = 3;
export const INTRO_AUDIO_TRANSCRIPT = "Fiz THTC e não tenho mais dor na coluna!";

export function IntroAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const playRequest = useRef(0);
  const [playing, setPlaying] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      playRequest.current += 1;
      audio?.pause();
    };
  }, []);

  const start = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    const request = ++playRequest.current;
    if (audio.ended || audio.currentTime >= INTRO_AUDIO_SECONDS) {
      audio.currentTime = 0;
      setElapsed(0);
    }
    audio.muted = false;
    setError("");
    setSoundOn(true);
    setPlaying(true);
    try {
      await audio.play();
    } catch {
      if (request !== playRequest.current) return;
      setPlaying(false);
      setSoundOn(false);
      setError("Não foi possível tocar o áudio. Tente novamente.");
    }
  };

  const pause = () => {
    playRequest.current += 1;
    audioRef.current?.pause();
    setPlaying(false);
  };

  const disableSound = () => {
    pause();
    const audio = audioRef.current;
    if (audio) {
      audio.muted = true;
      audio.currentTime = 0;
    }
    setElapsed(0);
    setSoundOn(false);
  };

  const finish = () => {
    pause();
    setElapsed(INTRO_AUDIO_SECONDS);
    setSoundOn(false);
  };

  const updateTime = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.currentTime >= INTRO_AUDIO_SECONDS) finish();
    else setElapsed(audio.currentTime);
  };

  return (
    <section aria-label="THTC: mensagem em áudio" className="mt-5">
      <div className="max-w-lg">
        <div className="overflow-hidden rounded-lg border border-border bg-card shadow-soft">
          <div className="relative aspect-video">
            <img
              src={correctedImage}
              width={1366}
              height={768}
              alt={`Imagem ilustrativa de uma mulher sorrindo com a frase: “${INTRO_AUDIO_TRANSCRIPT}”`}
              className="h-full w-full object-contain"
              fetchPriority="high"
            />
            <Button
              variant="ghost"
              aria-label={playing ? "Pausar narração" : "Reproduzir narração"}
              title={playing ? "Pausar narração" : "Reproduzir narração"}
              onClick={playing ? pause : () => void start()}
              className="absolute inset-0 h-full w-full rounded-none hover:bg-foreground/5"
            >
              {playing && <span className="grid h-16 w-16 place-items-center rounded-full bg-deep/90 text-deep-foreground md:h-24 md:w-24"><Pause className="!size-8" /></span>}
            </Button>
          </div>
          <div className="flex min-h-16 items-center gap-3 border-t border-border px-3 sm:px-5">
            <Button variant="ghost" size="icon" aria-label={playing ? "Pausar áudio" : "Reproduzir áudio"} title={playing ? "Pausar áudio" : "Reproduzir áudio"} onClick={playing ? pause : () => void start()} className="shrink-0 text-primary">
              {playing ? <Pause /> : <Play />}
            </Button>
            <span className="shrink-0 text-xs tabular-nums text-muted-foreground">0:0{Math.min(Math.floor(elapsed), 3)} / 0:03</span>
            <progress value={elapsed} max={INTRO_AUDIO_SECONDS} aria-label="Progresso do áudio" className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-muted accent-primary [&::-webkit-progress-bar]:bg-muted [&::-webkit-progress-value]:bg-primary [&::-moz-progress-bar]:bg-primary" />
            <Button variant={soundOn ? "default" : "outline"} aria-label={soundOn ? "Desligar áudio" : "Ligar áudio"} title={soundOn ? "Desligar áudio" : "Ligar áudio"} aria-pressed={soundOn} onClick={soundOn ? disableSound : () => void start()} className="shrink-0 px-3">
              {soundOn ? <Volume2 /> : <VolumeX />}
              <span className="hidden sm:inline">{soundOn ? "Desligar áudio" : "Ligar áudio"}</span>
            </Button>
          </div>
          <audio ref={audioRef} src={audioAsset.url} preload="metadata" muted={!soundOn} onTimeUpdate={updateTime} onEnded={finish} onError={() => { disableSound(); setError("Áudio indisponível no momento. Tente novamente."); }} />
        </div>
        {error && <p role="alert" className="mt-3 text-sm text-destructive">{error}</p>}
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">Imagem ilustrativa e voz gerada por IA; não é um depoimento real. Resultados variam de pessoa para pessoa.</p>
      </div>
    </section>
  );
}