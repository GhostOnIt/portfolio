import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

interface TypewriterProps {
  text: string;
  texts?: string[];
  delay?: number;
  deleteDelay?: number;
  pauseDelay?: number;
  loop?: boolean;
  className?: string;
  cursorClassName?: string;
}

export const Typewriter = ({
  text,
  texts,
  delay = 50,
  deleteDelay = 30,
  pauseDelay = 900,
  loop = false,
  className = '',
  cursorClassName = 'w-0.5 h-5 bg-primary-500 ml-1',
}: TypewriterProps) => {
  const sequenceKey = (texts && texts.length > 0 ? texts : [text]).join('\u0000');
  const sequence = useMemo(() => sequenceKey.split('\u0000'), [sequenceKey]);
  const [displayText, setDisplayText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [mode, setMode] = useState<'typing' | 'deleting' | 'done'>('typing');

  useEffect(() => {
    setDisplayText('');
    setPhraseIndex(0);
    setMode('typing');
  }, [sequenceKey]);

  useEffect(() => {
    const currentPhrase = sequence[phraseIndex] ?? '';
    const hasNextPhrase = phraseIndex < sequence.length - 1;

    if (mode === 'typing' && displayText.length < currentPhrase.length) {
      const timeout = setTimeout(() => {
        setDisplayText(currentPhrase.slice(0, displayText.length + 1));
      }, delay);

      return () => clearTimeout(timeout);
    }

    if (mode === 'typing' && displayText.length === currentPhrase.length) {
      if (hasNextPhrase || loop) {
        const timeout = setTimeout(() => setMode('deleting'), pauseDelay);
        return () => clearTimeout(timeout);
      }

      setMode('done');
    }

    if (mode === 'deleting' && displayText.length > 0) {
      const timeout = setTimeout(() => {
        setDisplayText(currentPhrase.slice(0, displayText.length - 1));
      }, deleteDelay);

      return () => clearTimeout(timeout);
    }

    if (mode === 'deleting' && displayText.length === 0) {
      setPhraseIndex(hasNextPhrase ? phraseIndex + 1 : 0);
      setMode('typing');
    }
  }, [deleteDelay, delay, displayText, loop, mode, pauseDelay, phraseIndex, sequence]);

  return (
    <span className={className}>
      {displayText}
      {mode !== 'done' && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className={`inline-block ${cursorClassName}`}
        />
      )}
    </span>
  );
};
