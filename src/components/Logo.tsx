/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'custom';
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  const dimensions = {
    xs: 'w-7 h-7',
    sm: 'w-9 h-9',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
    custom: '',
  };

  return (
    <div id="afaq-brand-logo-container" className={`${dimensions[size]} ${className} relative flex items-center justify-center`} style={{ direction: 'ltr' }}>
      <svg
        viewBox="0 0 1000 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full select-none transform scale-105"
      >
        {/* Dynamic Stylized Handwriting Font 'AN' matching the uploaded brand asset */}
        
        {/* Elegant cursive 'N' (Lighter Steel Blue: #5C8BC3) */}
        <path
          id="logo-letter-n"
          d="M 388 565 
             C 388 510, 420 400, 470 330
             C 520 260, 560 215, 595 215
             C 615 215, 625 240, 615 295
             C 595 390, 550 514, 550 540
             C 550 565, 560 575, 575 575
             C 595 575, 642 505, 695 425
             C 748 345, 845 200, 915 130
             C 930 115, 942 110, 945 118
             C 948 126, 932 152, 905 195
             C 830 315, 715 485, 648 575
             C 635 592, 620 598, 610 598
             C 585 598, 570 568, 570 528
             C 570 490, 602 360, 618 290
             C 622 272, 620 265, 612 265
             C 592 265, 542 340, 492 440
             C 442 540, 395 620, 372 620
             C 355 620, 342 595, 345 550
             C 348 505, 362 410, 370 350
             C 375 315, 380 295, 380 280
             C 380 265, 372 255, 358 255
             C 342 255, 320 285, 290 325"
          fill="#5C8BC3"
        />

        {/* Elegant cursive 'A' (Deep Corporate Blue: #072F67) */}
        {/* Main stem / right leg of 'A' */}
        <path
          id="logo-letter-a-main"
          d="M 120 488
             C 120 480, 132 440, 160 365
             C 188 290, 245 140, 285 70
             C 302 40, 320 20, 335 20
             C 350 20, 355 38, 345 80
             C 330 185, 310 330, 305 425
             C 298 535, 292 575, 295 585
             C 300 595, 315 585, 328 560
             C 340 535, 348 500, 350 455
             C 352 420, 362 415, 370 422
             C 372 432, 365 470, 358 505
             C 345 565, 325 615, 300 615
             C 275 615, 265 570, 270 480
             C 272 430, 292 275, 310 155
             C 292 205, 255 310, 218 405
             C 180 500, 142 585, 122 585
             C 118 585, 120 540, 120 488 Z"
          fill="#072F67"
        />

        {/* Left leg swooping entry of 'A' */}
        <path
          id="logo-letter-a-left-entry"
          d="M 60 575
             C 50 590, 42 595, 36 600
             C 25 605, 18 600, 22 572
             C 28 528, 65 410, 110 295
             C 155 180, 218 75, 275 30
             C 285 22, 292 25, 292 35
             C 292 45, 275 75, 250 115
             C 192 205, 138 322, 98 425
             C 58 528, 65 565, 60 575 Z"
          fill="#072F67"
        />

        {/* Dynamic Sweep Crossbar of 'A' overlaying the elements with razor-sharp ends */}
        <path
          id="logo-letter-a-crossbar"
          d="M 95 440
             C 140 415, 220 370, 305 325
             C 390 280, 480 238, 520 220
             C 525 218, 528 222, 522 228
             C 490 255, 380 328, 290 388
             C 200 448, 120 495, 100 495
             C 92 495, 90 475, 95 440 Z"
          fill="#072F67"
        />
      </svg>
    </div>
  );
}
