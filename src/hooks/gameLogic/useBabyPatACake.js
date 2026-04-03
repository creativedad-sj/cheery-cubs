import { useMemo, useState } from 'react';
import { useSpeech } from '../useSpeech';

const steps = [
  { id: 'pat', label: 'Pat-a-cake', helper: 'Tap to clap together' },
  { id: 'roll', label: 'Roll it', helper: 'Tap to roll the cake' },
  { id: 'mark', label: 'Mark it', helper: 'Tap to mark it with a B' },
  { id: 'bake', label: 'Bake it', helper: 'Tap to bake it for baby' }
];

export function useBabyPatACake() {
  const speak = useSpeech();
  const [stepIndex, setStepIndex] = useState(0);
  const [sparkleCount, setSparkleCount] = useState(0);

  const step = useMemo(() => steps[stepIndex], [stepIndex]);

  const handleTap = () => {
    speak(step.label, 'question');
    setSparkleCount((prev) => prev + 1);
    setStepIndex((prev) => (prev + 1) % steps.length);
  };

  return {
    step,
    sparkleCount,
    handleTap,
    speak
  };
}
