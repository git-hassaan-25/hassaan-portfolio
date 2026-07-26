import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import type { PreviewProps } from './types';

const NODES = [
  { x: 18, y: 30, label: 'Trigger' },
  { x: 96, y: 82, label: 'Filter' },
  { x: 174, y: 30, label: 'Enrich' },
  { x: 174, y: 128, label: 'Action' },
];

const NODE_W = 56;
const NODE_H = 22;

const EDGES = [
  { from: 0, to: 1 },
  { from: 1, to: 2 },
  { from: 1, to: 3 },
];

function edgePath(from: (typeof NODES)[number], to: (typeof NODES)[number]) {
  const x1 = from.x + NODE_W;
  const y1 = from.y + NODE_H / 2;
  const x2 = to.x;
  const y2 = to.y + NODE_H / 2;
  const mid = (x1 + x2) / 2;
  return `M ${x1} ${y1} C ${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}`;
}

/**
 * Visual workflow builder: nodes wired by animated bezier edges.
 * Colors come from Tailwind fill-/stroke- utilities rather than literals so the
 * graph follows the active theme — CSS variables don't resolve inside raw SVG
 * presentation attributes.
 */
export function TrueLeadsPreview({ active }: PreviewProps) {
  const reduced = usePrefersReducedMotion();
  const animating = active && !reduced;

  return (
    <div className="absolute inset-0 bg-bg">
      <div
        className="absolute inset-0 bg-grid-faint opacity-30"
        style={{ backgroundSize: '20px 20px' }}
      />
      <svg viewBox="0 0 248 186" className="absolute inset-0 h-full w-full">
        {EDGES.map((edge, index) => {
          const d = edgePath(NODES[edge.from], NODES[edge.to]);
          return (
            <g key={index}>
              <path d={d} fill="none" strokeWidth="1.5" className="stroke-line-bright" />
              <motion.path
                d={d}
                fill="none"
                strokeWidth="1.5"
                strokeDasharray="4 6"
                animate={animating ? { strokeDashoffset: [0, -20] } : { strokeDashoffset: 0 }}
                transition={{ duration: 1.1, repeat: animating ? Infinity : 0, ease: 'linear' }}
                className="stroke-teal opacity-75"
              />
            </g>
          );
        })}

        {NODES.map((node, index) => {
          const isActive = index === 0;
          return (
            <motion.g
              key={node.label}
              animate={animating && index === 1 ? { y: [0, -3, 0, 2, 0] } : { y: 0 }}
              transition={{ duration: 2.4, repeat: animating ? Infinity : 0, ease: 'easeInOut' }}
            >
              <rect
                x={node.x}
                y={node.y}
                width={NODE_W}
                height={NODE_H}
                rx="5"
                strokeWidth="1"
                className={isActive ? 'fill-surface stroke-gold' : 'fill-surface stroke-line-bright'}
              />
              <circle
                cx={node.x + 8}
                cy={node.y + NODE_H / 2}
                r="2.5"
                className={isActive ? 'fill-gold' : 'fill-teal'}
              />
              <text
                x={node.x + 16}
                y={node.y + NODE_H / 2 + 3}
                fontSize="7"
                fontFamily="monospace"
                className="fill-muted"
              >
                {node.label}
              </text>
            </motion.g>
          );
        })}

        {animating && (
          <motion.circle
            r="2.5"
            className="fill-gold"
            animate={{ offsetDistance: ['0%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              offsetPath: `path("${edgePath(NODES[0], NODES[1])}")`,
              offsetRotate: '0deg',
            }}
          />
        )}
      </svg>
    </div>
  );
}
