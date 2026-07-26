import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/cn';
import { EASE } from '@/lib/motion';

interface ExpandableListProps {
  items: string[];
  /** How many items are visible before the expander. */
  initial?: number;
  /** Unique id for aria-controls. */
  id: string;
  className?: string;
}

function Bullet({ text }: { text: string }) {
  return (
    <li className="flex gap-3 text-sm leading-relaxed text-muted">
      <span aria-hidden className="mt-0.5 select-none text-gold">
        ▸
      </span>
      {text}
    </li>
  );
}

export function ExpandableList({ items, initial = 3, id, className }: ExpandableListProps) {
  const [expanded, setExpanded] = useState(false);
  const visible = items.slice(0, initial);
  const rest = items.slice(initial);

  return (
    <div className={className}>
      <ul className="space-y-2.5">
        {visible.map((item) => (
          <Bullet key={item} text={item} />
        ))}
      </ul>
      {rest.length > 0 && (
        <>
          <motion.div
            id={id}
            initial={false}
            animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="overflow-hidden"
          >
            <ul className="space-y-2.5 pt-2.5">
              {rest.map((item) => (
                <Bullet key={item} text={item} />
              ))}
            </ul>
          </motion.div>
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls={id}
            onClick={() => setExpanded((value) => !value)}
            className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs text-gold/80 transition-colors hover:text-gold"
          >
            <ChevronDown
              aria-hidden
              className={cn('h-3.5 w-3.5 transition-transform duration-300', expanded && 'rotate-180')}
            />
            {expanded ? 'Show less' : `+ ${rest.length} more`}
          </button>
        </>
      )}
    </div>
  );
}
