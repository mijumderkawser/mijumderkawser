<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Data Science 3D Banner</title>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: radial-gradient(circle at 50% 50%, #0a0e1a 0%, #05070d 100%);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Space Grotesk', sans-serif;
    perspective: 1400px;
    overflow: hidden;
    position: relative;
  }

  /* ============ BACKGROUND GRID ============ */
  body::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(rgba(54, 188, 247, 0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(54, 188, 247, 0.06) 1px, transparent 1px);
    background-size: 40px 40px;
    mask-image: radial-gradient(circle at center, black 30%, transparent 75%);
    -webkit-mask-image: radial-gradient(circle at center, black 30%, transparent 75%);
  }

  /* ============ FLOATING PARTICLES ============ */
  .particles {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
  }
  .particle {
    position: absolute;
    width: 3px;
    height: 3px;
    background: #36BCF7;
    border-radius: 50%;
    box-shadow: 0 0 10px #36BCF7, 0 0 20px #36BCF7;
    animation: floatUp linear infinite;
  }
  @keyframes floatUp {
    0%   { transform: translateY(100vh) scale(0); opacity: 0; }
    10%  { opacity: 1; }
    90%  { opacity: 1; }
    100% { transform: translateY(-10vh) scale(1); opacity: 0; }
  }

  /* ============ MAIN 3D CARD ============ */
  .scene {
    transform-style: preserve-3d;
    animation: sceneRotate 20s ease-in-out infinite;
  }
  @keyframes sceneRotate {
    0%, 100% { transform: rotateY(-12deg) rotateX(4deg); }
    50%      { transform: rotateY(12deg) rotateX(-2deg); }
  }

  .card {
    width: 900px;
    height: 480px;
    background: linear-gradient(135deg, rgba(20, 27, 45, 0.95), rgba(10, 14, 26, 0.98));
    border-radius: 24px;
    position: relative;
    transform-style: preserve-3d;
    padding: 40px 50px;
    box-shadow:
      0 40px 80px rgba(0, 0, 0, 0.8),
      0 0 0 1px rgba(54, 188, 247, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.05);
    overflow: hidden;
  }

  /* Glowing border effect */
  .card::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 24px;
    background: linear-gradient(135deg, #36BCF7, #a855f7, #ec4899, #36BCF7);
    background-size: 300% 300%;
    z-index: -1;
    animation: borderGlow 6s linear infinite;
    filter: blur(8px);
    opacity: 0.6;
  }
  @keyframes borderGlow {
    0%   { background-position: 0% 50%; }
    100% { background-position: 300% 50%; }
  }

  /* ============ NEURAL NETWORK (Right side) ============ */
  .neural-net {
    position: absolute;
    right: -20px;
    top: 50%;
    transform: translateY(-50%) translateZ(60px);
    width: 380px;
    height: 380px;
    opacity: 0.85;
  }
  .neural-net svg {
    width: 100%;
    height: 100%;
    filter: drop-shadow(0 0 8px rgba(54, 188, 247, 0.6));
  }
  .node {
    fill: #36BCF7;
    animation: nodePulse 2s ease-in-out infinite;
  }
  .node.purple { fill: #a855f7; }
  .node.pink   { fill: #ec4899; }
  @keyframes nodePulse {
    0%, 100% { r: 5; opacity: 0.8; }
    50%      { r: 7; opacity: 1; }
  }
  .connection {
    stroke: url(#lineGrad);
    stroke-width: 1.5;
    fill: none;
    stroke-dasharray: 4 6;
    animation: dash 2s linear infinite;
  }
  @keyframes dash {
    to { stroke-dashoffset: -20; }
  }

  /* ============ TEXT CONTENT ============ */
  .content {
    position: relative;
    z-index: 2;
    transform: translateZ(40px);
    max-width: 520px;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 14px;
    background: rgba(54, 188, 247, 0.1);
    border: 1px solid rgba(54, 188, 247, 0.3);
    border-radius: 100px;
    font-size: 12px;
    color: #36BCF7;
    font-family: 'JetBrains Mono', monospace;
    margin-bottom: 20px;
    letter-spacing: 1px;
  }
  .badge .dot {
    width: 6px; height: 6px;
    background: #22c55e;
    border-radius: 50%;
    box-shadow: 0 0 8px #22c55e;
    animation: blink 1.5s ease-in-out infinite;
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50%      { opacity: 0.3; }
  }

  .name {
    font-size: 3.2rem;
    font-weight: 700;
    line-height: 1.05;
    background: linear-gradient(135deg, #ffffff 0%, #36BCF7 50%, #a855f7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -1px;
    margin-bottom: 14px;
    text-shadow: 0 0 60px rgba(54, 188, 247, 0.5);
  }

  .title {
    font-size: 1.05rem;
    color: #94a3b8;
    margin-bottom: 32px;
    font-family: 'JetBrains Mono', monospace;
    letter-spacing: 0.5px;
  }
  .title .accent { color: #36BCF7; }
  .title .accent2 { color: #a855f7; }

  /* ============ STATS ROW ============ */
  .stats {
    display: flex;
    gap: 14px;
    margin-bottom: 28px;
  }
  .stat {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(54, 188, 247, 0.15);
    padding: 10px 16px;
    border-radius: 12px;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
  }
  .stat:hover {
    transform: translateY(-3px) translateZ(20px);
    border-color: rgba(54, 188, 247, 0.5);
    box-shadow: 0 10px 30px rgba(54, 188, 247, 0.2);
  }
  .stat-value {
    font-size: 1.4rem;
    font-weight: 700;
    color: #fff;
    font-family: 'JetBrains Mono', monospace;
  }
  .stat-value.blue   { color: #36BCF7; }
  .stat-value.purple { color: #a855f7; }
  .stat-value.pink   { color: #ec4899; }
  .stat-label {
    font-size: 10px;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-top: 2px;
    font-family: 'JetBrains Mono', monospace;
  }

  /* ============ TECH TAGS ============ */
  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    padding: 6px 12px;
    border-radius: 8px;
    background: rgba(54, 188, 247, 0.08);
    border: 1px solid rgba(54, 188, 247, 0.2);
    color: #36BCF7;
    transition: all 0.3s ease;
    cursor: default;
  }
  .tag:hover {
    background: rgba(54, 188, 247, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(54, 188, 247, 0.3);
  }
  .tag.purple {
    background: rgba(168, 85, 247, 0.08);
    border-color: rgba(168, 85, 247, 0.2);
    color: #a855f7;
  }
  .tag.purple:hover {
    background: rgba(168, 85, 247, 0.2);
    box-shadow: 0 5px 15px rgba(168, 85, 247, 0.3);
  }

  /* ============ 3D BAR CHART (Bottom Right) ============ */
  .chart {
    position: absolute;
    bottom: 30px;
    right: 40px;
    display: flex;
    align-items: flex-end;
    gap: 10px;
    height: 100px;
    transform: translateZ(80px) rotateY(-25deg);
    transform-style: preserve-3d;
  }
  .bar {
    width: 18px;
    border-radius: 4px;
    background: linear-gradient(to top, #36BCF7, #a855f7);
    position: relative;
    box-shadow: 
      4px 4px 12px rgba(0, 0, 0, 0.5),
      0 0 20px rgba(54, 188, 247, 0.4);
    animation: barGrow 2s ease-out infinite alternate;
  }
  .bar::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: #fff;
    border-radius: 4px 4px 0 0;
    opacity: 0.6;
  }
  .bar:nth-child(1) { height: 40%; animation-delay: 0s; }
  .bar:nth-child(2) { height: 75%; animation-delay: 0.2s; }
  .bar:nth-child(3) { height: 55%; animation-delay: 0.4s; }
  .bar:nth-child(4) { height: 95%; animation-delay: 0.6s; }
  .bar:nth-child(5) { height: 65%; animation-delay: 0.8s; }
  .bar:nth-child(6) { height: 85%; animation-delay: 1s; }
  @keyframes barGrow {
    0%   { transform: scaleY(0.7); }
    100% { transform: scaleY(1); }
  }

  /* ============ CORNER DECORATIONS ============ */
  .corner {
    position: absolute;
    width: 60px;
    height: 60px;
    border-color: #36BCF7;
    opacity: 0.4;
  }
  .corner.tl { top: 15px; left: 15px; border-top: 2px solid; border-left: 2px solid; border-radius: 12px 0 0 0; }
  .corner.br { bottom: 15px; right: 15px; border-bottom: 2px solid; border-right: 2px solid; border-radius: 0 0 12px 0; }
</style>
</head>
<body>

  <!-- Floating particles -->
  <div class="particles" id="particles"></div>

  <div class="scene">
    <div class="card">

      <!-- Corner decorations -->
      <div class="corner tl"></div>
      <div class="corner br"></div>

      <!-- Neural Network SVG -->
      <div class="neural-net">
        <svg viewBox="0 0 400 400">
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#36BCF7" stop-opacity="0.8"/>
              <stop offset="100%" stop-color="#a855f7" stop-opacity="0.2"/>
            </linearGradient>
          </defs>

          <!-- Layer 1 → Layer 2 connections -->
          <line class="connection" x1="80" y1="80"  x2="200" y2="120"/>
          <line class="connection" x1="80" y1="80"  x2="200" y2="200"/>
          <line class="connection" x1="80" y1="200" x2="200" y2="120"/>
          <line class="connection" x1="80" y1="200" x2="200" y2="200"/>
          <line class="connection" x1="80" y1="200" x2="200" y2="280"/>
          <line class="connection" x1="80" y1="320" x2="200" y2="200"/>
          <line class="connection" x1="80" y1="320" x2="200" y2="280"/>

          <!-- Layer 2 → Layer 3 connections -->
          <line class="connection" x1="200" y1="120" x2="320" y2="160"/>
          <line class="connection" x1="200" y1="120" x2="320" y2="240"/>
          <line class="connection" x1="200" y1="200" x2="320" y2="160"/>
          <line class="connection" x1="200" y1="200" x2="320" y2="240"/>
          <line class="connection" x1="200" y1="280" x2="320" y2="160"/>
          <line class="connection" x1="200" y1="280" x2="320" y2="240"/>

          <!-- Nodes: Layer 1 (inputs) -->
          <circle class="node" cx="80" cy="80"  r="5"/>
          <circle class="node" cx="80" cy="200" r="5"/>
          <circle class="node" cx="80" cy="320" r="5"/>

          <!-- Nodes: Layer 2 (hidden) -->
          <circle class="node purple" cx="200" cy="120" r="5"/>
          <circle class="node purple" cx="200" cy="200" r="5"/>
          <circle class="node purple" cx="200" cy="280" r="5"/>

          <!-- Nodes: Layer 3 (output) -->
          <circle class="node pink" cx="320" cy="160" r="5"/>
          <circle class="node pink" cx="320" cy="240" r="5"/>
        </svg>
      </div>

      <!-- Main content -->
      <div class="content">
        <div class="badge">
          <span class="dot"></span>
          DATA SCIENTIST
        </div>

        <h1 class="name">MOJUMDER<br>KAWSER</h1>

        <p class="title">
          <span class="accent">&lt;/&gt;</span> Turning data into <span class="accent2">intelligence</span>
        </p>

        <div class="stats">
          <div class="stat">
            <div class="stat-value blue">500+</div>
            <div class="stat-label">Commits</div>
          </div>
          <div class="stat">
            <div class="stat-value purple">15+</div>
            <div class="stat-label">Projects</div>
          </div>
          <div class="stat">
            <div class="stat-value pink">∞</div>
            <div class="stat-label">Curiosity</div>
          </div>
        </div>

        <div class="tags">
          <span class="tag">Python</span>
          <span class="tag">TensorFlow</span>
          <span class="tag purple">PyTorch</span>
          <span class="tag">scikit-learn</span>
          <span class="tag purple">Pandas</span>
          <span class="tag">NumPy</span>
          <span class="tag purple">ML</span>
        </div>
      </div>

      <!-- 3D Bar Chart -->
      <div class="chart">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
      </div>

    </div>
  </div>

  <script>
    // Generate floating particles
    const container = document.getElementById('particles');
    const colors = ['#36BCF7', '#a855f7', '#ec4899', '#22c55e'];
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.animationDuration = (8 + Math.random() * 12) + 's';
      p.style.animationDelay = (Math.random() * 10) + 's';
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      p.style.boxShadow = `0 0 10px ${p.style.background}, 0 0 20px ${p.style.background}`;
      container.appendChild(p);
    }
  </script>
</body>
</html>
