import React from 'react';
import Spline from '@splinetool/react-spline';

export default function HeroSpline({ overlay }) {
  return (
    <section className="relative h-[280px] sm:h-[360px] md:h-[420px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/cEecEwR6Ehj4iT8T/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      {/* Gradient overlay to improve contrast; pointer-events-none so Spline remains interactive */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-white/0 dark:from-black/60 dark:via-black/40" />
      {overlay}
    </section>
  );
}
