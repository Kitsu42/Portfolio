import type { Article } from './types';

export const articles: Article[] = [
  {
    id: 'type-safe-apis-typescript-zod',
    title: 'Building Type-Safe APIs with TypeScript and Zod',
    summary: 'Learn how to combine TypeScript\'s static type system with Zod\'s runtime validation to build robust, end-to-end type-safe APIs that catch errors at every boundary.',
    date: '2026-08-14',
    category: 'TypeScript',
    tags: ['TypeScript', 'Zod', 'API Design', 'Node.js'],
    readTime: 9,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=500&fit=crop&auto=format',
    content: [
      {
        type: 'paragraph',
        text: 'TypeScript gives us compile-time type safety, but types are erased at runtime. This means that data entering your system from external sources—HTTP requests, database queries, environment variables—is fundamentally untyped at the boundary. Zod bridges this gap by letting you define schemas that validate data at runtime while automatically inferring TypeScript types.',
      },
      {
        type: 'heading', level: 2,
        text: 'Why Runtime Validation Matters',
      },
      {
        type: 'paragraph',
        text: 'Consider a typical Express route that accepts a JSON body. Even with TypeScript, if you cast `req.body as CreateUserDto`, you\'re lying to the compiler—there\'s no guarantee the data matches your type at runtime. A malicious client, a schema change, or a serialization bug can all send unexpected data that TypeScript\'s types won\'t catch.',
      },
      {
        type: 'code',
        language: 'typescript',
        filename: 'user.schema.ts',
        code: `import { z } from 'zod';

export const CreateUserSchema = z.object({
  name: z.string().min(2).max(64),
  email: z.string().email(),
  age: z.number().int().min(18).max(120).optional(),
  role: z.enum(['admin', 'user', 'moderator']).default('user'),
});

// Automatically infer the TypeScript type
export type CreateUserDto = z.infer<typeof CreateUserSchema>;`,
      },
      {
        type: 'heading', level: 2,
        text: 'Integrating Zod with Express',
      },
      {
        type: 'paragraph',
        text: 'The most effective pattern is a middleware factory that validates request bodies against a schema before your route handler runs. This keeps validation logic out of your handlers and ensures the type is always correct when it reaches your business logic.',
      },
      {
        type: 'code',
        language: 'typescript',
        filename: 'validate.middleware.ts',
        code: `import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

export function validate<T>(schema: ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: 'Validation failed',
        issues: result.error.issues.map(issue => ({
          path: issue.path.join('.'),
          message: issue.message,
        })),
      });
    }

    req.body = result.data; // fully typed and validated
    next();
  };
}`,
      },
      {
        type: 'heading', level: 2,
        text: 'End-to-End Type Safety with tRPC',
      },
      {
        type: 'paragraph',
        text: 'If you control both the client and server, consider tRPC, which uses Zod schemas to define procedure inputs and outputs, giving you full type inference across the network boundary without any code generation.',
      },
      {
        type: 'code',
        language: 'typescript',
        filename: 'router.ts',
        code: `import { initTRPC } from '@trpc/server';
import { CreateUserSchema } from './user.schema';

const t = initTRPC.create();

export const appRouter = t.router({
  createUser: t.procedure
    .input(CreateUserSchema)
    .mutation(async ({ input }) => {
      // input is fully typed as CreateUserDto
      const user = await db.user.create({ data: input });
      return user;
    }),
});

export type AppRouter = typeof appRouter;`,
      },
      {
        type: 'heading', level: 2,
        text: 'Schema Composition and Reuse',
      },
      {
        type: 'paragraph',
        text: 'One of Zod\'s great strengths is composability. You can build complex schemas from simpler ones, add refinements for custom validation logic, and transform data as part of the parsing step.',
      },
      {
        type: 'list',
        items: [
          'Use `z.merge()` to combine object schemas without nesting',
          'Use `.refine()` for cross-field validation (e.g., password confirmation)',
          'Use `.transform()` to coerce or reshape data during parsing',
          'Use `z.discriminatedUnion()` for type-narrowed union types',
        ],
      },
      {
        type: 'paragraph',
        text: 'Adopting this pattern across your codebase means every piece of external data is validated and typed the moment it enters your system, eliminating an entire class of runtime errors.',
      },
    ],
  },
  {
    id: 'react-performance-beyond-memo',
    title: 'React Performance: Beyond memo and useCallback',
    summary: 'Most React performance guides stop at memoization. This article explores the deeper patterns—structural optimization, state colocation, and algorithmic improvements—that make the real difference.',
    date: '2026-07-28',
    category: 'React',
    tags: ['React', 'Performance', 'JavaScript', 'Optimization'],
    readTime: 11,
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=500&fit=crop&auto=format',
    content: [
      {
        type: 'paragraph',
        text: 'Wrapping everything in `React.memo` and `useCallback` is cargo-cult optimization. In many cases it makes performance worse—memo has overhead, and useCallback\'s dependency array causes bugs when maintained incorrectly. Real performance optimization requires understanding how React works and applying structural solutions first.',
      },
      {
        type: 'heading', level: 2,
        text: 'The Real Cause of Most Performance Issues',
      },
      {
        type: 'paragraph',
        text: 'Most React performance problems stem from one of three causes: state placed too high in the tree, rendering work that exceeds the 16ms frame budget, or algorithmic complexity in rendering logic. Memoization is a band-aid for the first two—structural fixes are almost always better.',
      },
      {
        type: 'heading', level: 2,
        text: 'State Colocation',
      },
      {
        type: 'paragraph',
        text: 'When state lives higher than it needs to, every state update re-renders a large subtree. Moving state as close as possible to where it\'s consumed is the highest-ROI optimization.',
      },
      {
        type: 'code',
        language: 'tsx',
        filename: 'SearchInput.tsx',
        code: `// Bad: query state in parent re-renders entire list
function Parent() {
  const [query, setQuery] = useState('');
  return (
    <>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <HeavyList />   {/* re-renders on every keystroke */}
    </>
  );
}

// Good: extract the input to colocate state
function SearchInput() {
  const [query, setQuery] = useState('');
  return <input value={query} onChange={e => setQuery(e.target.value)} />;
}

function Parent() {
  return (
    <>
      <SearchInput />
      <HeavyList />   {/* never re-renders from typing */}
    </>
  );
}`,
      },
      {
        type: 'heading', level: 2,
        text: 'Component Composition with children',
      },
      {
        type: 'paragraph',
        text: 'Passing components as `children` or render props is another structural technique that isolates re-renders without any memoization overhead.',
      },
      {
        type: 'code',
        language: 'tsx',
        filename: 'ColorPicker.tsx',
        code: `// The heavy children are created in Parent's scope—
// they won't re-render when color changes.
function ColorPicker({ children }: { children: React.ReactNode }) {
  const [color, setColor] = useState('#00D8FF');
  return (
    <div style={{ backgroundColor: color }}>
      <input type="color" value={color} onChange={e => setColor(e.target.value)} />
      {children}
    </div>
  );
}

function App() {
  return (
    <ColorPicker>
      <ExpensiveComponent />  {/* won't re-render on color change */}
    </ColorPicker>
  );
}`,
      },
      {
        type: 'heading', level: 2,
        text: 'When Memo Actually Helps',
      },
      {
        type: 'list',
        items: [
          'Stable reference-equal props: memo is effective when most props are primitives or stable references',
          'Pure list items: memo on list item components when the list is large and updates are frequent',
          'Context consumers: use memo + useMemo on context values to prevent all consumers re-rendering',
          'Expensive pure computations: useMemo for CPU-bound derivations with large inputs',
        ],
      },
      {
        type: 'paragraph',
        text: 'Before reaching for memo, use the React DevTools profiler to identify actual bottlenecks. Profile with CPU throttling (4-6x) to simulate real devices. Fix structural issues first, then measure again before adding memoization.',
      },
    ],
  },
  {
    id: 'css-grid-mastery',
    title: 'CSS Grid Mastery: From Basics to Subgrid',
    summary: 'A comprehensive walkthrough of CSS Grid\'s most powerful features, including named lines, auto-placement algorithms, and the newly supported subgrid for aligning nested content.',
    date: '2026-07-10',
    category: 'CSS',
    tags: ['CSS', 'CSS Grid', 'Layout', 'Frontend'],
    readTime: 8,
    image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=1200&h=500&fit=crop&auto=format',
    content: [
      {
        type: 'paragraph',
        text: 'CSS Grid has fundamentally changed how we think about layout. Unlike Flexbox, which is one-dimensional, Grid gives us control over both axes simultaneously. But most developers only scratch the surface with `display: grid` and `grid-template-columns`.',
      },
      {
        type: 'heading', level: 2,
        text: 'Named Grid Lines and Areas',
      },
      {
        type: 'code',
        language: 'css',
        filename: 'layout.css',
        code: `.layout {
  display: grid;
  grid-template-columns: [sidebar-start] 280px [sidebar-end content-start] 1fr [content-end];
  grid-template-rows: [header-start] 64px [header-end main-start] 1fr [main-end];
  min-height: 100vh;
}

.sidebar { grid-column: sidebar; }
.header  { grid-column: 1 / -1; grid-row: header; }
.content { grid-column: content; grid-row: main; }`,
      },
      {
        type: 'heading', level: 2,
        text: 'Subgrid: Aligning Nested Content',
      },
      {
        type: 'paragraph',
        text: 'Subgrid allows nested elements to participate in the parent grid\'s track sizing. This solves the classic problem of aligning content inside cards when each card has a different amount of content.',
      },
      {
        type: 'code',
        language: 'css',
        code: `.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto 1fr auto; /* header, body, footer */
}

.card {
  display: grid;
  grid-row: span 3;
  grid-template-rows: subgrid; /* inherit parent row tracks */
}`,
      },
      { type: 'paragraph', text: 'With subgrid, all card titles align to the same row, all card bodies stretch to the same height, and all footers land at the bottom—without any JavaScript height synchronization.' },
    ],
  },
  {
    id: 'postgresql-query-optimization',
    title: 'PostgreSQL Query Optimization at Scale',
    summary: 'Practical techniques for diagnosing slow queries, using EXPLAIN ANALYZE effectively, building the right indexes, and restructuring queries for maximum throughput.',
    date: '2026-06-18',
    category: 'Database',
    tags: ['PostgreSQL', 'SQL', 'Performance', 'Backend'],
    readTime: 13,
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=1200&h=500&fit=crop&auto=format',
    content: [
      { type: 'paragraph', text: 'Query performance is one of the most impactful areas to optimize in a production application. A single slow query can cascade into timeout errors, lock contention, and degraded user experience for everyone.' },
      { type: 'heading', level: 2, text: 'Reading EXPLAIN ANALYZE Output' },
      { type: 'code', language: 'sql', code: `EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT u.name, COUNT(o.id) AS order_count
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE u.created_at > NOW() - INTERVAL '30 days'
GROUP BY u.id, u.name
ORDER BY order_count DESC
LIMIT 20;` },
      { type: 'paragraph', text: 'Focus on nodes with high "actual rows" vs "rows" estimates—large discrepancies indicate stale statistics. Look for Sequential Scans on large tables and Hash Joins that spill to disk (indicated by "Batches > 1").' },
      { type: 'heading', level: 2, text: 'Partial and Covering Indexes' },
      { type: 'code', language: 'sql', code: `-- Partial index: only index the rows you actually query
CREATE INDEX idx_orders_pending
  ON orders (user_id, created_at)
  WHERE status = 'pending';

-- Covering index: include columns to avoid heap fetches
CREATE INDEX idx_users_email_covering
  ON users (email)
  INCLUDE (id, name, created_at);` },
      { type: 'paragraph', text: 'Covering indexes eliminate the need for "heap fetches"—when PostgreSQL has to follow a pointer from the index to the actual table row. For read-heavy, high-frequency queries this can halve query time.' },
    ],
  },
  {
    id: 'rust-for-javascript-developers',
    title: 'Rust for JavaScript Developers: A Practical Introduction',
    summary: 'Bridge the mental model gap between JavaScript and Rust. Learn ownership, borrowing, and lifetimes through examples that map directly to familiar JS patterns.',
    date: '2026-05-30',
    category: 'Rust',
    tags: ['Rust', 'JavaScript', 'Systems Programming', 'Learning'],
    readTime: 15,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=500&fit=crop&auto=format',
    content: [
      { type: 'paragraph', text: 'Rust\'s learning curve is often described as steep, but for JavaScript developers, many of the core concepts have analogues you already know. The biggest mental model shift is moving from garbage collection to ownership.' },
      { type: 'heading', level: 2, text: 'Ownership is Just Scope + Move Semantics' },
      { type: 'code', language: 'rust', code: `// In Rust, every value has exactly one owner
let s1 = String::from("hello");
let s2 = s1; // s1 is MOVED to s2

// println!("{}", s1); // ERROR: s1 no longer valid

// To keep s1, clone it:
let s3 = s2.clone();
println!("{} and {}", s2, s3); // both valid` },
      { type: 'paragraph', text: 'Think of Rust\'s String as JavaScript\'s string, but with explicit tracking of which variable "owns" the data. When you assign or pass it, the original variable becomes invalid unless you clone.' },
      { type: 'heading', level: 2, text: 'Borrowing as Temporary References' },
      { type: 'code', language: 'rust', code: `fn print_length(s: &str) {  // &str = borrowed reference
    println!("Length: {}", s.len());
}

let my_string = String::from("hello world");
print_length(&my_string);     // borrow it
println!("{}", my_string);    // still valid, we only borrowed` },
    ],
  },
  {
    id: 'docker-development-workflow',
    title: 'Streamlining Your Dev Workflow with Docker Compose',
    summary: 'Build a reproducible local development environment that mirrors production using Docker Compose, with hot-reload, shared volumes, and integrated service health checks.',
    date: '2026-05-12',
    category: 'DevOps',
    tags: ['Docker', 'DevOps', 'Node.js', 'Workflow'],
    readTime: 7,
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&h=500&fit=crop&auto=format',
    content: [
      { type: 'paragraph', text: 'One of the biggest productivity drains in software development is environment inconsistency. "Works on my machine" is a genuine problem, and Docker Compose is one of the most effective solutions available.' },
      { type: 'heading', level: 2, text: 'A Practical docker-compose.yml' },
      { type: 'code', language: 'yaml', filename: 'docker-compose.yml', code: `version: '3.9'
services:
  api:
    build: { context: ., dockerfile: Dockerfile.dev }
    volumes:
      - .:/app
      - /app/node_modules  # anonymous volume to prevent overwrite
    ports: ['3000:3000']
    environment:
      - DATABASE_URL=postgres://dev:dev@db:5432/myapp
    depends_on:
      db: { condition: service_healthy }

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: dev
      POSTGRES_PASSWORD: dev
      POSTGRES_DB: myapp
    volumes: ['pgdata:/var/lib/postgresql/data']
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready -U dev']
      interval: 5s
      timeout: 5s
      retries: 5

volumes:
  pgdata:` },
      { type: 'paragraph', text: 'The key details: the anonymous volume for node_modules prevents your local node_modules (which may have native binaries compiled for your OS) from overwriting the container\'s version. The healthcheck ensures the API never starts before the database is ready.' },
    ],
  },
];
