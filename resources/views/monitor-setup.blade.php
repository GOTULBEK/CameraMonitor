<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Camera Monitor Setup</title>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
</head>
<body>
<div class="container">
    <button id="createMonitor">Create New Monitor</button>
    <button id="saveMonitor">Save Monitor</button>
    <div class="cameras">
        @foreach ($cameras as $camera)
            <div class="camera-box" data-camera-source="{{ $camera->video_source }}">
                <video class="camera-video" src="{{ $camera->video_source }}" autoplay playsinline loop muted></video>
            </div>
        @endforeach
    </div>
    <div class="monitor-container"></div>
</div>
<script src="{{ asset('js/app.js') }}"></script>
</body>
</html>
