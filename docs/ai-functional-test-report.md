# AI Functional Test Report

Date: 2026-05-27

## Goal

Проверить, что AI-модуль НЕОПОЛИС:

- реально обращается к Gemini, а не только к локальному fallback;
- возвращает структурированный профориентационный отчет;
- меняет выводы относительно разных ответов участника;
- привязывает доказательства к фактическим выборам пользователя;
- не ломает сборку проекта.

## Environment

- Page: `http://localhost:3000/game`
- Endpoint: `POST /api/ai/career-analysis`
- Provider: `gemini`
- Model: `gemini-2.5-flash`
- Key storage: `.env.local`, server-side only
- Frontend key exposure: not used

## Tests

### 1. Gemini API Availability

Direct Gemini API checks were performed:

- `GET /v1beta/models` returned `200`
- `models/gemini-2.5-flash:generateContent` returned `200`
- Model available: `gemini-2.5-flash`

Result: passed.

### 2. Career Analysis Endpoint

Endpoint:

`POST http://localhost:3000/api/ai/career-analysis`

Three different behavioral profiles were sent:

1. Analytical profile
2. Creative/UX profile
3. Leadership/business profile

Assertions:

- all responses returned `200`;
- all responses returned `provider: gemini`;
- all responses contained structured fields: `archetype`, `summary`, `strengths`, `recommendedCareers`, `evidence`;
- all evidence rows exactly matched submitted mission choices;
- archetypes differed between profiles;
- career recommendations differed between profiles.

Result: passed.

## Results

### Analytical Profile

Input signals:

- analysis
- systems thinking
- data
- critical thinking
- hypothesis checking

Gemini output:

- Archetype: `Цифровой Аналитик`
- Careers:
  - `Аналитик данных (Data Analyst)`
  - `Системный аналитик`
  - `Исследователь (Research Scientist / Data Scientist)`
  - `UX-исследователь (UX Researcher)`

Exact evidence:

- `Станции замерли: выбран вариант «Сначала разобрать данные и найти закономерность». Сигнал: Вы начинаете с причин, а не с внешних симптомов.`
- `Ложный след: выбран вариант «Сравнить датчики с реальными событиями». Сигнал: Вы ищете расхождение между метриками и жизнью.`
- `Финальная проверка: выбран вариант «Проверить гипотезу через данные». Сигнал: Вы подтверждаете выводы фактами.`

### Creative Profile

Input signals:

- creativity
- UX
- storytelling
- communication
- media
- empathy
- visual thinking

Gemini output:

- Archetype: `Креативный Экспериментатор`
- Careers:
  - `UX/UI-дизайнер`
  - `Медиадизайнер / Графический дизайнер`
  - `Контент-стратег / Специалист по коммуникациям`

Exact evidence:

- `Информационная паника: выбран вариант «Создать понятный визуальный формат сообщения». Сигнал: Вы превращаете сложную ситуацию в понятный образ.`
- `Город спорит: выбран вариант «Собрать концепт коммуникационной кампании». Сигнал: Вы думаете о реакции аудитории.`
- `Финальная публикация: выбран вариант «Протестировать разные форматы подачи». Сигнал: Вы ищете лучший формат через пробу.`

### Leadership Profile

Input signals:

- leadership
- management
- strategy
- communication
- prioritization
- negotiation
- responsibility

Gemini output:

- Archetype: `Стратег-Лидер`
- Careers:
  - `Менеджер проектов (Project Manager)`
  - `Продакт-менеджер (Product Manager)`
  - `Бизнес-аналитик / Системный аналитик`
  - `Предприниматель / Основатель стартапа`

Exact evidence:

- `Конфликт команды: выбран вариант «Разделить команду на диагностику, запуск и связь». Сигнал: Вы снижаете хаос через роли.`
- `Ресурсов не хватает: выбран вариант «Расставить приоритеты и объяснить решение команде». Сигнал: Вы берете ответственность и удерживаете фокус команды.`
- `Кризис доверия: выбран вариант «Согласовать позицию с несколькими группами жителей». Сигнал: Вы ищете баланс интересов.`

## Functional Conclusion

Gemini is connected and working.

The neural network is not returning a static report. It changes archetypes, strengths, and career recommendations based on the submitted answers and behavior tags.

Evidence is now protected from hallucination: the endpoint normalizes `evidence` from actual submitted answers, so the report can show exactly which choices influenced the analysis.

## Build Verification

Commands:

- `npm run lint`
- `npm run build`

Result:

- lint passed;
- production build passed;
- `/api/ai/career-analysis` is included as a dynamic server route.
