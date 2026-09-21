import type { Article } from './types';

export const articles: Article[] = [
  {
    id: 'Exemple Article',
    title: 'Exemple Article',
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
];
