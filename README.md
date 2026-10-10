<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>3D GitHub Banner</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;600;800&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            background: #0d1117;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            font-family: 'Poppins', sans-serif;
            perspective: 1200px;
        }
        .card {
            width: 800px;
            height: 400px;
            background: linear-gradient(145deg, #1a1f2b, #0d1117);
            border-radius: 30px;
            box-shadow: 
                20px 20px 60px #05070a,
                -20px -20px 60px #151b26,
                inset 2px 2px 4px rgba(255,255,255,0.05),
                inset -2px -2px 4px rgba(0,0,0,0.5);
            transform: rotateY(-8deg) rotateX(5deg);
            transition: transform 0.5s ease;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 40px;
            position: relative;
            overflow: hidden;
        }
        .card:hover {
            transform: rotateY(0deg) rotateX(0deg) scale(1.02);
        }
        .card::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle at 30% 30%, rgba(54, 188, 247, 0.15), transparent 60%);
            pointer-events: none;
        }
        .name {
            font-size: 3.5rem;
            font-weight: 800;
            background: linear-gradient(135deg, #36BCF7, #a855f7);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 4px 4px 8px rgba(0,0,0,0.6);
            margin-bottom: 10px;
            letter-spacing: 1px;
        }
        .title {
            font-size: 1.4rem;
            font-weight: 300;
            color: #c9d1d9;
            margin-bottom: 30px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }
        .tech-stack {
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
            justify-content: center;
            margin-top: 20px;
        }
        .tech-item {
            background: linear-gradient(145deg, #1f2633, #0d1117);
            padding: 12px 24px;
            border-radius: 50px;
            color: #36BCF7;
            font-weight: 600;
            font-size: 1rem;
            box-shadow: 
                6px 6px 12px #05070a,
                -6px -6px 12px #151b26;
            transition: all 0.3s ease;
            border: 1px solid rgba(54, 188, 247, 0.2);
        }
        .tech-item:hover {
            transform: translateY(-5px);
            box-shadow: 
                8px 8px 16px #05070a,
                -8px -8px 16px #151b26,
                0 0 20px rgba(54, 188, 247, 0.4);
            color: #a855f7;
            border-color: rgba(168, 85, 247, 0.4);
        }
        .glow {
            position: absolute;
            width: 300px;
            height: 300px;
            background: radial-gradient(circle, rgba(54, 188, 247, 0.2), transparent 70%);
            border-radius: 50%;
            top: -100px;
            right: -100px;
            pointer-events: none;
        }
        .glow2 {
            position: absolute;
            width: 250px;
            height: 250px;
            background: radial-gradient(circle, rgba(168, 85, 247, 0.15), transparent 70%);
            border-radius: 50%;
            bottom: -80px;
            left: -80px;
            pointer-events: none;
        }
    </style>
</head>
<body>
    <div class="card">
        <div class="glow"></div>
        <div class="glow2"></div>
        <div class="name">MOJUMDER KAWSER</div>
        <div class="title">Data Science & ML Enthusiast</div>
        <div class="tech-stack">
            <div class="tech-item">Python</div>
            <div class="tech-item">TensorFlow</div>
            <div class="tech-item">PyTorch</div>
            <div class="tech-item">scikit-learn</div>
            <div class="tech-item">Pandas</div>
            <div class="tech-item">NumPy</div>
        </div>
    </div>
</body>
</html>
