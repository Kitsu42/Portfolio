## Por que a validação em runtime importa?
>Eu não escrevi nada disso, é só um artigo de IA que coloquei para testar.

O TypeScript oferece segurança durante a compilação, mas os tipos são removidos quando o código é executado. Qualquer dado vindo de uma API, banco de dados ou variável de ambiente precisa ser validado antes de entrar na aplicação.

O Zod resolve esse problema permitindo definir schemas que validam os dados em runtime e também geram tipos TypeScript automaticamente.

```ts
import { z } from 'zod';

export const CreateUserSchema = z.object({
  name: z.string().min(2).max(64),
  email: z.string().email(),
  age: z.number().int().min(18).max(120).optional(),
  role: z.enum(['admin', 'user', 'moderator']).default('user'),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
```

## Integrando Zod com Express

Um padrão útil é validar o corpo da requisição em um middleware antes que ele chegue ao handler. Assim, a lógica de validação fica centralizada e o restante da aplicação recebe dados confiáveis.

```ts
import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export function validate<T>(schema: ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: 'Validation failed',
        issues: result.error.issues,
      });
    }

    req.body = result.data;
    next();
  };
}
```

## Boas práticas

- Valide dados assim que eles entram no sistema.
- Reutilize schemas entre endpoints relacionados.
- Use `refine` para regras que dependem de mais de um campo.
- Use `transform` quando a entrada precisar ser convertida.

Com esse padrão, cada fronteira externa da aplicação passa a ter uma validação explícita e previsível.
