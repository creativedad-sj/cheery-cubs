import { useMemo, useState } from 'react';
import { useSpeech } from '../useSpeech';

const faces = [
  { id: 'smile', title: 'Smile', emoji: '😊', helper: 'Try a big smile together' },
  { id: 'surprised', title: 'Surprised', emoji: '😮', helper: 'Open your mouth wide' },
  { id: 'sleepy', title: 'Sleepy', emoji: '😴', helper: 'Blink slowly together' },
  { id: 'silly', title: 'Silly', emoji: '😜', helper: 'Make a playful face' }
];

export function useBabyMirrorPlay() {
  const speak = useSpeech();
  const [faceIndex, setFaceIndex] = useState(0);

  const face = useMemo(() => faces[faceIndex % faces.length], [faceIndex]);

  const nextFace = () => {
    speak(`${face.title} face.`, 'question');
    setFaceIndex((prev) => prev + 1);
  };

  return {
    face,
    nextFace,
    speak
  };
}
