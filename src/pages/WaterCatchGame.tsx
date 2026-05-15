import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSettings } from '../context/SettingsContext';
import { Button } from '@/components/ui/button';
import { X, Play, Volume2, VolumeX } from 'lucide-react';

type ItemType = 'droplet' | 'bomb' | 'dirty' | 'cold';

interface GameItem {
  id: number;
  type: ItemType;
  x: number;
  y: number;
  speed: number;
}

export default function WaterCatchGame({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const { t } = useSettings();
  const [gameState, setGameState] = useState<'selection' | 'playing' | 'gameover'>('selection');
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();
  const plumberX = useRef(200);
  const items = useRef<GameItem[]>([]);
  const floatingTexts = useRef<{ id: number; text: string; x: number; y: number; opacity: number }[]>([]);
  const lastSpawn = useRef(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const freezeTimer = useRef<NodeJS.Timeout>();

  const scoreRef = useRef(0);
  const heartsRef = useRef(3);
  const frozenRef = useRef(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard' | 'hardcore'>('easy');
  const [environment, setEnvironment] = useState<'city' | 'tunnel' | 'house'>('city');
  const [_, setTick] = useState(0); 
  const [soundOn, setSoundOn] = useState(true);
  const [highScore, setHighScore] = useState(0);

  const difficultyConfig = {
    easy: { speed: 4, bomb: 0, dirty: 0, cold: 0, penalty: 0 },
    medium: { speed: 6, bomb: 0, dirty: 0, cold: 0, penalty: 0 },
    hard: { speed: 9, bomb: 0.1, dirty: 0.15, cold: 0, penalty: 0 },
    hardcore: { speed: 10, bomb: 0.15, dirty: 0.2, cold: 0.05, penalty: 1 },
  };

  useEffect(() => {
    setHighScore(Number(localStorage.getItem('waterCatchHighScore') || 0));
    audioRef.current = new Audio('https://actions.google.com/sounds/v1/editorial/happy_tune.ogg');
    audioRef.current.loop = true;
    return () => {
      audioRef.current?.pause();
      if (freezeTimer.current) clearTimeout(freezeTimer.current);
    };
  }, []);

  const addFloatingText = (text: string, x: number, y: number) => {
      const id = Date.now();
      floatingTexts.current.push({ id, text, x, y, opacity: 1 });
      setTimeout(() => floatingTexts.current = floatingTexts.current.filter(f => f.id !== id), 1000);
  };

  const gameLoop = useCallback((time: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    const config = difficultyConfig[difficulty];

    // Draw Map (Background based on environment)
    ctx.fillStyle = environment === 'city' ? '#1e293b' : environment === 'tunnel' ? '#334155' : '#475569';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw Horizontal Pipe
    ctx.fillStyle = '#0ea5e9'; 
    ctx.fillRect(0, 0, canvas.width, 50);
    // Cracks
    ctx.strokeStyle = '#0369a1';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(20, 10);
    ctx.lineTo(50, 40);
    ctx.moveTo(canvas.width - 50, 10);
    ctx.lineTo(canvas.width - 20, 40);
    ctx.stroke();

    // Spawn items
    if (time - lastSpawn.current > 800) {
      const rand = Math.random();
      let type: ItemType = 'droplet';
      
      if (rand < config.bomb) type = 'bomb';
      else if (rand < config.bomb + config.dirty) type = 'dirty';
      else if (rand < config.bomb + config.dirty + config.cold) type = 'cold';

      items.current.push({
        id: Date.now(),
        type,
        x: Math.random() * (canvas.width - 40),
        y: 100,
        speed: config.speed * (0.6 + Math.random() * 0.4)
      });
      lastSpawn.current = time;
    }

    // Items
    items.current.forEach((item, index) => {
      item.y += item.speed;
      
      ctx.beginPath();
      if (item.type === 'bomb') {
        ctx.fillStyle = '#333';
        ctx.arc(item.x + 20, item.y + 20, 18, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'white';
        ctx.font = '20px serif';
        ctx.fillText('☠', item.x + 10, item.y + 27);
      } else if (item.type === 'dirty') {
        ctx.fillStyle = '#4d7c0f'; // Green sludge
        ctx.arc(item.x + 20, item.y + 20, 15, 0, Math.PI * 2);
        ctx.fill();
      } else if (item.type === 'cold') {
        ctx.fillStyle = '#7dd3fc'; // Light blue
        ctx.arc(item.x + 20, item.y + 20, 15, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = '#0ea5e9'; // Blue water
        ctx.arc(item.x + 20, item.y + 20, 15, 0, Math.PI * 2);
        ctx.fill();
      }

      // Catch Collision
      if (item.y > canvas.height - 135 && item.y < canvas.height - 110 && item.x > plumberX.current - 50 && item.x < plumberX.current + 50) {
        if (item.type === 'bomb') {
            heartsRef.current = Math.max(0, heartsRef.current - 1);
            addFloatingText('-1 Heart', item.x, item.y);
        }
        else if (item.type === 'dirty') {
            heartsRef.current = Math.max(0, heartsRef.current - 1);
            addFloatingText('-1 Heart', item.x, item.y);
        }
        else if (item.type === 'cold') {
            frozenRef.current = true;
            addFloatingText('FROZEN', item.x, item.y);
            if (freezeTimer.current) clearTimeout(freezeTimer.current);
            freezeTimer.current = setTimeout(() => { frozenRef.current = false; }, 500);
        }
        else {
            scoreRef.current = Math.min(999, scoreRef.current + 1);
             addFloatingText('+1', item.x, item.y);
        }
        items.current.splice(index, 1);
      }
      
      if (item.y > canvas.height) {
          items.current.splice(index, 1);
          if (difficulty === 'hardcore' && item.type === 'droplet') {
              heartsRef.current = Math.max(0, heartsRef.current - 1);
              addFloatingText('-1 Heart', item.x, item.y);
          }
      }
    });

    // Draw Floating Texts
    ctx.font = 'bold 20px Arial';
    floatingTexts.current.forEach(f => {
        ctx.fillStyle = `rgba(255, 255, 255, ${f.opacity})`;
        ctx.fillText(f.text, f.x, f.y);
        f.y -= 1;
        f.opacity -= 0.05;
    });

    // Draw Plumber
    ctx.fillStyle = '#16a34a'; // Green uniform
    ctx.fillRect(plumberX.current - 30, canvas.height - 120, 60, 70); 
    
    // Bucket (silver, small)
    ctx.fillStyle = '#cbd5e1'; 
    ctx.fillRect(plumberX.current - 20, canvas.height - 135, 40, 20);
    ctx.fillStyle = '#94a3b8'; // Rim
    ctx.fillRect(plumberX.current - 22, canvas.height - 138, 44, 5);

    setTick(t => t + 1); 

    if (heartsRef.current <= 0) {
        setGameState('gameover');
    } else {
        requestRef.current = requestAnimationFrame(gameLoop);
    }
  }, []);

  useEffect(() => {
    if (gameState === 'playing') {
        scoreRef.current = 0;
        heartsRef.current = 3;
        items.current = [];
        frozenRef.current = false;
        requestRef.current = requestAnimationFrame(gameLoop);
        if (soundOn) audioRef.current?.play().catch(e => console.log('Audio autoplay blocked'));
    } else {
        cancelAnimationFrame(requestRef.current!);
        audioRef.current?.pause();
    }
    return () => cancelAnimationFrame(requestRef.current!);
  }, [gameState, gameLoop, soundOn]);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (frozenRef.current) return;
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      plumberX.current = Math.max(20, Math.min(canvas.width - 20, e.clientX - rect.left));
    }
  };

  if (gameState === 'selection') {
    return (
      <div className="p-8 flex flex-col items-center justify-center h-full space-y-8 text-center text-white border rounded-3xl bg-slate-800 shadow-2xl">
        <h2 className="text-4xl font-extrabold tracking-in-expand">CNWD WATER CATCH</h2>
        <div className="space-y-4 w-full">
            <h3 className="text-xl font-bold">{t('difficulty')}</h3>
            <div className="grid grid-cols-2 gap-4">
                {(['easy', 'medium', 'hard', 'hardcore'] as const).map(d => (
                    <Button key={d} onClick={() => setDifficulty(d)} variant={difficulty === d ? 'default' : 'secondary'} className="uppercase">{t(d)}</Button>
                ))}
            </div>
            <h3 className="text-xl font-bold">{t('environment')}</h3>
            <div className="grid grid-cols-3 gap-2">
                {(['city', 'tunnel', 'house'] as const).map(env => (
                    <Button key={env} onClick={() => setEnvironment(env)} variant={environment === env ? 'default' : 'secondary'} className="capitalize">{t(env)}</Button>
                ))}
            </div>
        </div>
        <Button onClick={() => setGameState('playing')} className="w-full h-16 text-2xl font-bold bg-green-600 hover:bg-green-500 transition-all transform hover:scale-105">
           <Play className="w-8 h-8 mr-2" /> {t('play')}
        </Button>
        <Button onClick={() => setActiveTab('minigames')} variant="outline" className="w-full text-lg">
          {t('exit')}
        </Button>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full bg-slate-900 overflow-hidden touch-none" onPointerMove={handlePointerMove}>
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute top-2 left-4 text-white font-mono text-xl">{t('score')}: {scoreRef.current}</div>
      <div className="absolute top-2 right-12 text-white font-mono text-xl">{t('hearts')}: {heartsRef.current}</div>
      <Button onClick={() => setSoundOn(!soundOn)} className="absolute top-12 right-4" variant="ghost">
        {soundOn ? <Volume2 className="w-6 h-6 text-white"/> : <VolumeX className="w-6 h-6 text-white"/>}
      </Button>
      <Button 
        onClick={() => { setGameState('selection'); }}
        className="absolute top-4 right-4"
        variant="destructive"
      >
        <X className="w-4 h-4" />
      </Button>
      {gameState === 'playing' && difficulty === 'hardcore' && (
          <div className="absolute top-16 left-4 bg-red-900/80 p-4 text-white rounded-lg text-sm">
              ⚠️ {t('warnBomb')} ⚠️ {t('warnDirty')} ⚠️ {t('warnCold')} ⚠️ {t('warnMiss')}
          </div>
      )}
      {gameState === 'gameover' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-white gap-4">
              <h2 className="text-4xl font-bold">{t('gameOver')}</h2>
              <p className="text-2xl">{t('finalScore')}: {scoreRef.current}</p>
              <Button onClick={() => {
                  const high = localStorage.getItem('waterCatchHighScore') || 0;
                  if (scoreRef.current > Number(high)) localStorage.setItem('waterCatchHighScore', scoreRef.current.toString());
                  setGameState('selection');
              }}>{t('exit')}</Button>
          </div>
      )}
    </div>
  );
}
