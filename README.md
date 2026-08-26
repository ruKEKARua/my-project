Status: Work in Progress / On Hold

# Creature Fight

Creature Fight is a small browser strategy prototype built around a collection of creature cards and an automated battle between two teams. The project is currently frozen: the repository preserves the working direction and the main technical decisions, while production hardening and content expansion remain out of scope.

## What Is Implemented

- A main screen with user and enemy card collections.
- Loading card arrays from Firebase Firestore into Redux Toolkit.
- A separate `/fight` route for an automated battle.
- Random target selection for the enemy side.
- Health updates, death resolution, battle logs, and win/lose/draw result.
- A rendered attack arrow, paced with a short delay so battle steps are visible.
- GitHub Pages deployment through GitHub Actions.

## Architecture

The UI is split into a collection screen and a fight screen. React components dispatch actions to Redux; Firestore is used for the card source and for a lightweight fight snapshot. The battle coordinator lives in `src/components/StartFight.jsx`, keeping the turn sequence in one place.

![Component architecture](docs/architecture/component-architecture.svg)

### Data flow

Seed arrays from `public/arrayCreaturesUser.js` and `public/arrayCreaturesEnemy.js` are written to Firestore when the application loads. `GetDataFromDB` reads the documents back and dispatches one card at a time into the user and enemy collections. Starting a fight creates cloned working arrays, so combat mutations do not alter the original collection state.

![Data flow](docs/architecture/data-flow.svg)

### Battle cycle

Each iteration selects the first user creature and a random enemy, displays the attack relationship, applies reciprocal damage, waits for the visual state to be readable, and removes defeated creatures. The loop ends when one or both arrays are empty.

![Battle loop](docs/architecture/battle-loop.svg)

## State Model

The Redux store in `src/store/store.js` contains seven focused slices:

| Slice | Responsibility |
| --- | --- |
| `userCards` | User collection loaded from Firestore |
| `enemyCards` | Enemy collection loaded from Firestore |
| `fightUserCards` | Mutable user team for the active battle |
| `fightEnemyCards` | Mutable enemy team for the active battle |
| `isFightGoing` | Prevents starting a second battle while one is running |
| `log` | Ordered combat messages shown on the fight screen |
| `attackArrow` | Attacker/defender IDs and screen coordinates for the overlay |

The Firestore documents currently follow this shape:

```text
creaturesUser/creaturesUser
	arrayOfCreatures: Creature[]

creaturesEnemy/creaturesEnemy
	arrayOfCreatures: Creature[]

creaturesFight/creaturesFight
	userCardsArray: Creature[]
	enemyCardsArray: Creature[]

creaturesFight/isFightAreGoing
	isFightAreGoing: boolean
```

Each creature contains `id`, `title`, `image`, `damage`, `health`, `content`, and `script`. The current prototype uses placeholder image URLs and randomly generated damage and health for the JavaScript seed arrays.

## Project Structure

```text
src/
	components/
		card/                 Card presentation
		firestore/            Firestore write helper
		GetDataFromDB.jsx     Firestore read and Redux dispatch
		StartFight.jsx        Async battle coordinator
		AttackArrow.jsx       SVG attack overlay
		logs/                 Battle log presentation
	routes/
		App.jsx               Collection screen
		FightPage.jsx         Active battle screen
	store/                  Redux slices and store setup
	firebase.js             Firebase app and Firestore initialization
public/
	arrayCreaturesUser.js   User seed cards
	arrayCreaturesEnemy.js  Enemy seed cards
docs/architecture/        README diagrams
```

## Run Locally

Requirements: Node.js 20 or newer and access to the configured Firebase project.

```bash
npm install
npm run dev
```

Useful commands:

```bash
npm run build    # production build
npm run preview  # serve the production build locally
npm run lint     # ESLint
```

The app uses `HashRouter`, so it can be hosted on GitHub Pages without server-side route fallback configuration.

## Deployment

Every push to the `master` branch triggers `.github/workflows/deploy.yml`. The workflow installs dependencies with `npm ci`, builds the Vite app, uploads `dist/` as a Pages artifact, and deploys it to GitHub Pages. It can also be started manually with `workflow_dispatch`.

## С какими сложностями столкнулся и как решал

### Асинхронный боевой цикл

Бой должен менять состояние постепенно, иначе React успевает показать только финальный результат: карты исчезают сразу, а стрелка атаки не видна. Цикл в `StartFight` сделан асинхронным, а `sleep(500)` разделяет показ атаки и обработку смерти. Перед стартом используются `structuredClone`, чтобы рабочие health-значения не мутировали коллекции, из которых построен экран.

Отдельно хранятся боевые массивы и исходные коллекции. Это позволяет удалять погибших существ только из текущего боя, а Redux-экшены `update*Health` синхронизируют промежуточное здоровье с отрисовкой карточек.

### Маппинг данных из Firestore

Firestore хранит массив карт внутри документа, а интерфейсу нужен Redux-массив. `GetDataFromDB` нормализует отсутствующее поле в `[]`, проверяет существование документа и отправляет каждую карту через `addUserCard` или `addEnemyCard`. Проверка `id` и защита от дублей находятся в самих slice, поэтому загрузка остается идемпотентной даже при повторном вызове эффекта в React Strict Mode.

### Геометрия attack arrow

Координаты стрелки зависят от DOM, а не только от данных боя. `FightPage` сохраняет refs карточек, вычисляет их центры относительно контейнера и кладет координаты в `attackArrow`. `AttackArrow` остается презентационным слоем и просто рисует SVG-линию поверх поля боя.

## Known Limitations

- Firebase configuration is currently initialized directly in `src/firebase.js`; environment variables and stricter deployment secrets should be introduced before public production use.
- Firestore writes are intentionally simple `setDoc` operations and do not yet include authentication, validation rules, or conflict handling.
- The battle coordinator is coupled to the component layer and is a good candidate for extraction into a domain service if the rules grow.
- Creature abilities are stored as text/script fields but are not executed by the current battle engine.
- There are no automated unit or end-to-end tests yet.

## Next Logical Steps

1. Move Firebase settings to environment variables and document Firestore security rules.
2. Extract battle rules into a deterministic, testable function with injectable randomness.
3. Add tests for simultaneous deaths, empty teams, repeated loading, and navigation during a fight.
4. Replace placeholder images and implement creature abilities.
