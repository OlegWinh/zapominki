# Контекст проекта «Запоминашки» (zapominki)
## Сохранён 21.05.2026

### О проекте
PWA-игра-напоминалка с физикой Matter.js. 24 иконки-задачи (icon1.png-icon24.png), кастомные фигурки, список дел, статистика, календарь, настройки, гироскоп/акселерометр.

### Расположение
- **Актуальная версия:** `I:\xampp\htdocs\publish\`
- **Корень `I:\xampp\htdocs\`** — очищен от старых файлов, НЕ ИСПОЛЬЗОВАТЬ
- **GitHub Pages:** https://olegwinh.github.io/zapominki/
- **Ветка:** main
- **Папка на GitHub:** docs/ (содержит publish/)

### Что было сделано 21.05.2026

#### 1. Исправлена ошибка 404 при установке PWA
**Причина:** manifest.json и sw.js использовали пути от корня (`/`), но на GitHub Pages сайт расположен по пути `/zapominki/`. При установке PWA браузер пытался открыть `https://olegwinh.github.io/index.html` вместо `https://olegwinh.github.io/zapominki/index.html`.

#### 2. manifest.json — исправлены пути
- `start_url`: `"/index.html"` → `"/zapominki/index.html"`
- `scope`: `"/"` → `"/zapominki/"`
- Иконки PWA: `logo.png` → `icon.png` (512×512) для всех 4 записей

#### 3. sw.js — исправлены все пути
- Все пути кешируемых ресурсов: `/` → `/zapominki/`
- Fallback в fetch: `/index.html` → `/zapominki/index.html`
- Кешируемые файлы: index.html, manifest.json, matter.min.js, logo.png, logo2.png, screen.png, swipe.mp3, plastic.mp3, wall.mp3, icon1.png-icon24.png

#### 4. Иконка PWA
- Добавлен `icon.png` (512×512) в publish/
- manifest.json ссылается на `icon.png` вместо `logo.png`
- `logo.png` НЕ тронут — используется в index.html для favicon и шапки

#### 5. Проверка файлов
Все 38 файлов в publish/ присутствуют. Ни один не отсутствует.

### Файлы в publish/
.gitignore, 404.html, CONTEXT.md, icon.png, icon1.png-icon24.png, index.html, logo.png, logo2.png, manifest.json, matter.min.js, plastic.mp3, screen.png, sw.js, swipe.mp3, TODO.md, wall.mp3, _redirects

### Важно для будущих задач
- Все пути в manifest.json и sw.js должны быть с префиксом `/zapominki/`
- 404.html корректно перенаправляет на `/zapominki/`
- _redirects: `/* /index.html 200` — работает для GitHub Pages
