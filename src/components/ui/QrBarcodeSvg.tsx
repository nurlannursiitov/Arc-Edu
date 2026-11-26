import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Rect, Path, Line } from 'react-native-svg';
import { RADIUS } from '../../theme/tokens';

interface RealQrSvgProps {
  size?: number;
  seed?: string;
}

function hashSeed(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function isFinderZone(row: number, col: number, grid: number): boolean {
  const inTopLeft = row < 7 && col < 7;
  const inTopRight = row < 7 && col >= grid - 7;
  const inBottomLeft = row >= grid - 7 && col < 7;
  return inTopLeft || inTopRight || inBottomLeft;
}

export const RealQrSvg: React.FC<RealQrSvgProps> = ({ size = 108, seed = '230107042' }) => {
  const grid = 21;
  const modules = useMemo(() => {
    const rects: Array<{ x: number; y: number }> = [];
    const base = hashSeed(seed);
    for (let r = 0; r < grid; r++) {
      for (let c = 0; c < grid; c++) {
        if (isFinderZone(r, c, grid)) continue;
        if (r === 6 || c === 6) {
          if ((r + c) % 2 === 0) rects.push({ x: c, y: r });
          continue;
        }
        const v = (base ^ ((r * 31 + c * 17) * 2654435761)) >>> 0;
        if (v % 11 < 5) {
          rects.push({ x: c, y: r });
        }
      }
    }
    return rects;
  }, [seed]);

  const cell = 1;
  const renderFinder = (x: number, y: number) => (
    <>
      <Rect x={x} y={y} width={7} height={7} rx={1.1} fill="#090A0D" />
      <Rect x={x + 1} y={y + 1} width={5} height={5} rx={0.6} fill="#FFFFFF" />
      <Rect x={x + 2} y={y + 2} width={3} height={3} rx={0.5} fill="#090A0D" />
    </>
  );

  return (
    <View style={[styles.qrWrap, { padding: Math.round(size * 0.09) }]}>
      <Svg width={size} height={size} viewBox={`0 0 ${grid} ${grid}`}>
        {renderFinder(0, 0)}
        {renderFinder(grid - 7, 0)}
        {renderFinder(0, grid - 7)}
        {modules.map((m, idx) => (
          <Rect
            key={idx}
            x={m.x}
            y={m.y}
            width={cell}
            height={cell}
            rx={0.22}
            fill="#090A0D"
          />
        ))}
      </Svg>
    </View>
  );
};

interface RealBarcodeSvgProps {
  width?: number;
  height?: number;
  value?: string;
  color?: string;
}

export const RealBarcodeSvg: React.FC<RealBarcodeSvgProps> = ({
  width = 210,
  height = 30,
  value = '230107042',
  color = '#F4F4F6',
}) => {
  const bars = useMemo(() => {
    const out: Array<{ x: number; w: number }> = [];
    const base = hashSeed(value);
    let cursor = 0;
    let i = 0;
    while (cursor < 200) {
      const bit = ((base >> (i % 24)) ^ (i * 7)) & 3;
      const barW = bit === 0 ? 1.5 : bit === 1 ? 3.2 : bit === 2 ? 2.2 : 4.2;
      const gap = ((base >> ((i + 5) % 24)) & 1) === 0 ? 2 : 3.2;
      if (cursor + barW <= 200) {
        out.push({ x: cursor, w: barW });
      }
      cursor += barW + gap;
      i++;
    }
    return out;
  }, [value]);

  return (
    <Svg width={width} height={height} viewBox="0 0 200 30">
      {bars.map((b, idx) => (
        <Rect key={idx} x={b.x} y={0} width={b.w} height={30} rx={0.4} fill={color} />
      ))}
    </Svg>
  );
};

export const EmvChipSvg: React.FC = () => {
  return (
    <Svg width={40} height={28} viewBox="0 0 40 28">
      <Rect
        x={0.5}
        y={0.5}
        width={39}
        height={27}
        rx={5.5}
        fill="#C8A96A"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth={1}
      />
      <Line x1={0.5} y1={10} x2={13} y2={10} stroke="rgba(18,20,26,0.45)" strokeWidth={1} />
      <Line x1={0.5} y1={18} x2={13} y2={18} stroke="rgba(18,20,26,0.45)" strokeWidth={1} />
      <Line x1={27} y1={10} x2={39.5} y2={10} stroke="rgba(18,20,26,0.45)" strokeWidth={1} />
      <Line x1={27} y1={18} x2={39.5} y2={18} stroke="rgba(18,20,26,0.45)" strokeWidth={1} />
      <Line x1={13} y1={0.5} x2={13} y2={27.5} stroke="rgba(18,20,26,0.45)" strokeWidth={1} />
      <Line x1={27} y1={0.5} x2={27} y2={27.5} stroke="rgba(18,20,26,0.45)" strokeWidth={1} />
      <Path
        d="M13 10.5H27V17.5H13V10.5Z"
        fill="rgba(255,255,255,0.16)"
        stroke="rgba(18,20,26,0.45)"
        strokeWidth={1}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  qrWrap: {
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
