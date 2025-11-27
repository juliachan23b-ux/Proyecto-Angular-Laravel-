<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Angular App</title>
  <base href="/angular/"> <!-- base para Angular -->
  <link rel="stylesheet" href="{{ asset('angular/styles.css') }}">
</head>
<body>
  <app-root></app-root>
  <script src="{{ asset('angular/main.js') }}"></script>
  <script src="{{ asset('angular/polyfills.js') }}"></script>
  <script src="{{ asset('angular/runtime.js') }}"></script>
</body>
</html>
