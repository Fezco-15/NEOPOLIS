# Подключение AI-провайдеров к НЕОПОЛИС

В проект уже добавлен серверный endpoint:

`POST /api/ai/career-analysis`

Он работает так:

1. Собирает ответы пользователя, выбранный аватар и профориентационные сигналы.
2. Передает модели методический контекст НЕОПОЛИС.
3. Если выбран `AI_PROVIDER=gemini`, отправляет запрос в Gemini.
4. Если выбран `AI_PROVIDER=gigachat`, отправляет запрос в GigaChat.
5. Если ключа нет или API недоступен, возвращает локальный экспертный fallback, чтобы демо не ломалось.

## Переменные окружения

Создай `.env.local` на основе `.env.example`:

```bash
AI_PROVIDER=local
GIGACHAT_AUTH_KEY=твой_authorization_key
GIGACHAT_SCOPE=GIGACHAT_API_PERS
GIGACHAT_MODEL=GigaChat
GEMINI_API_KEY=твой_gemini_key
GEMINI_MODEL=gemini-2.5-flash
```

Ключи нельзя хранить во frontend-коде. Только `.env.local` или серверное окружение.

## Gemini

Для Gemini поставь:

```bash
AI_PROVIDER=gemini
GEMINI_API_KEY=...
GEMINI_MODEL=gemini-2.5-flash
```

Endpoint использует Google Gemini REST `generateContent`. Ключ передается сервером через заголовок `x-goog-api-key`, поэтому пользователь браузера его не видит.

## GigaChat

Для GigaChat поставь:

```bash
AI_PROVIDER=gigachat
GIGACHAT_AUTH_KEY=...
GIGACHAT_SCOPE=GIGACHAT_API_PERS
GIGACHAT_MODEL=GigaChat
```

## Как мы “обучаем” AI методикам

Мы не дообучаем модель внутри проекта. Вместо этого используем knowledge base + prompt:

- `src/data/career-ai-knowledge.ts` содержит методики и правила анализа.
- `docs/proforientation-methodologies.md` содержит человекочитаемое описание методик.
- `src/lib/ai/career-analysis.ts` собирает поведенческий профиль.
- `src/app/api/ai/career-analysis/route.ts` передает профиль и методики в GigaChat.

Это подход RAG/prompt grounding: модель получает нужную базу знаний в контексте запроса и отвечает по нашим правилам.

## Что важно

- AI не ставит диагноз.
- AI формулирует предварительные карьерные гипотезы.
- Полный отчет должен открываться только после прохождения всех beta-миссий и оплаты полной версии.
- Зарплатные прогнозы показываются как ориентиры, а не гарантия.
