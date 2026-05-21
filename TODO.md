# Запоминашки — TODO на завтра (21.05.2026)

## ✅ Сделано сегодня (20.05.2026)

### 1. Починили гироскоп и акселерометр
- **Проблема:** старый код проверял `ay < -1.8` для прыжков, но на Android `accelerationIncludingGravity.y` в покое = -9.8 — условие никогда не срабатывало.
- **Решение:** вычисляем magnitude (общую силу в G): `gForce = sqrt(ax²+ay²+az²) / 9.8`. При встряске > 2G фигурки подпрыгивают. Анти-спам 500мс.
- **Наклон:** gamma/beta нормализуются к -1..1 (деление на 90°), гравитация меняется сильнее: `x: ±0.8`, `y: 0.6 ± 0.4`.
- **iOS:** корректный запрос `DeviceOrientationEvent.requestPermission()` по первому тачу.
- **Отладка:** добавлены console.log для всех событий.

### 2. PWA
- `manifest.json` — standalone, portrait, theme_color #a855f7
- `sw.js` — Cache First, все 35 файлов кешируются, офлайн-работа
- Мета-теги в `<head>`: apple-mobile-web-app-capable, theme-color, mobile-web-app-capable
- Регистрация SW в конце скрипта

### 3. GitHub Pages
- Репозиторий: olegwinh/zapominki
- Ветка: main
- Папка: docs/ (содержит publish/)
- Сайт доступен по HTTPS: https://olegwinh.github.io/zapominki/

### 4. 404.html
- Создан `404.html` в publish/ для корректной работы PWA при установке на GitHub Pages
- Перенаправляет на /zapominki/ через JS и содержит красивую страницу с ссылкой

## 📋 План на завтра

- [ ] Проверить установку PWA на телефоне через HTTPS
- [ ] Проверить гироскоп/акселерометр на телефоне через HTTPS
- [ ] Если 404 не помогает — добавить `.nojekyll` в корень docs/
- [ ] Запушить изменения на GitHub
