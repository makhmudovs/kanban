# kb3 — Kanban Board App

A full-stack Kanban board application built with Next.js 16, Drizzle ORM, and PostgreSQL. Supports multiple boards, columns, tasks, and subtasks with real-time UI updates, authentication, and dark mode.

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16.2 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | PostgreSQL (via Docker) |
| ORM | Drizzle ORM |
| Auth | Better Auth |
| State | Zustand |
| UI | Headless UI, Framer Motion, Lucide React |
| Theme | next-themes |

---

## Project Structure

```
app/
├── api/                        # API routes (Better Auth)
├── components/                 # Shared UI components
├── dashboard/
│   ├── (overview)/             # Overview page (all boards summary)
│   ├── [id]/                   # Board detail page
│   │   ├── not-found.tsx
│   │   └── page.tsx
│   └── @modal/                 # Parallel route modals
│       ├── (.)board/
│       │   ├── edit/           # Edit board modal
│       │   └── new/            # New board modal
│       ├── (.)task/
│       │   ├── [id]/           # Task detail modal
│       │   └── add-new/        # Add task modal
│       └── [...catchAll]/      # Catch-all modal fallback
├── db/                         # Drizzle schema & client
│   └── schema/
│       ├── boards.ts
│       ├── columns.ts
│       ├── tasks.ts
│       ├── subtasks.ts
│       └── user.ts
└── lib/
    └── actions/
        ├── auth.ts             # Auth helpers (validateUser)
        └── board.ts            # Server actions (CRUD)
```

---

## Database Schema

### boards
| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| name | text | Board name |
| user_id | text | FK → user.id (cascade) |
| created_at | timestamp | Auto |

### columns
| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| name | text | Column label (e.g. Todo) |
| color | text | Dot color hex |
| order | integer | Left-to-right position |
| board_id | uuid | FK → boards.id (cascade) |

### tasks
| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| title | text | Task title |
| description | text | Optional |
| order | integer | Position within column |
| column_id | uuid | FK → columns.id (cascade) |
| board_id | uuid | FK → boards.id (cascade) |
| created_at | timestamp | Auto |

### subtasks
| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| title | text | Subtask label |
| completed | boolean | Default false |
| order | integer | Display order |
| task_id | uuid | FK → tasks.id (cascade) |

> All foreign keys use `ON DELETE CASCADE` — deleting a board removes its columns, tasks, and subtasks automatically.

---

## Getting Started

### 1. Start the database

```bash
docker compose up -d
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment

Create a `.env` file in the root:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/mydb
BETTER_AUTH_SECRET=your_secret_here
BETTER_AUTH_URL=http://localhost:3000
```

### 4. Push the schema

```bash
pnpm db:push
```

### 5. Start the dev server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Database Commands

| Command | Description |
|---|---|
| `pnpm db:push` | Apply schema changes directly (dev only) |
| `pnpm db:generate` | Generate migration files |
| `pnpm db:migrate` | Apply generated migrations |

**For local development**, `db:push` is the fastest way to iterate on schema changes without managing migration files.

**For production**, use `db:generate` + `db:migrate` to keep a full migration history.

---

## Features

- Multiple boards per user
- Customizable columns with color coding
- Tasks with descriptions and subtasks
- Subtask completion tracking with progress bar
- Drag-friendly column ordering
- Dark / light mode toggle
- Modal-based task and board management (parallel routes)
- Server actions for all mutations with `revalidatePath`
- Confirmation dialogs and toast alerts via Zustand stores