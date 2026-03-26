# Portifolio
This is a simple portfolio project that I am redoing.

## Folder structure
    Portfolio
    │
    ├── Frontend
    │   │
    │   ├── index.html                # HTML base usado pelo Vite
    │   ├── package.json              # Dependências e scripts do projeto
    │   ├── package-lock.json         # Lock das dependências
    │   ├── tsconfig.json             # Configuração do TypeScript
    │   ├── vite.config.ts            # Configuração do bundler Vite
    │   │
    │   ├── public                    # Arquivos estáticos públicos
    │   │
    │   └── src
    │       │
    │       ├── main.tsx              # Ponto de entrada da aplicação React
    │       ├── App.tsx               # Estrutura principal de rotas
    │       │
    │       ├── assets                # Arquivos estáticos usados no projeto
    │       │   └── images
    │       │       └── Test.png      # Imagem de perfil usada no Hero
    │       │
    │       ├── components            # Componentes reutilizáveis da interface
    │       │
    │       │   ├── hero
    │       │   │   └── Hero.tsx              # Seção principal de apresentação
    │       │
    │       │   ├── stacks
    │       │   │   └── TechStack.tsx         # Ícones das tecnologias utilizadas
    │       │
    │       │   ├── articles
    │       │   │   └── FeaturedArticles.tsx  # Lista de artigos em destaque
    │       │
    │       │   ├── projects
    │       │   │   └── FeaturedProjects.tsx  # Projetos em destaque
    │       │
    │       │   ├── layout
    │       │   │   ├── Layout.tsx            # Estrutura base da página
    │       │   │   ├── Navbar.tsx            # Barra de navegação
    │       │   │   └── Footer.tsx            # Rodapé com redes sociais
    │       │
    │       │   └── ui
    │       │       ├── NeonDivider.tsx       # Linha neon para separar seções
    │       │       └── SectionTitle.tsx      # Títulos reutilizáveis de seções
    │       │
    │       ├── pages                # Páginas principais do site
    │       │
    │       │   ├── Home
    │       │   │   └── Home.tsx            # Página inicial do portfólio
    │       │
    │       │   ├── Projects
    │       │   │   └── Projects.tsx        # Página com todos os projetos
    │       │
    │       │   ├── articles
    │       │   │   ├── Articles.tsx        # Página listando todos os artigos
    │       │   │   └── Texts               # Conteúdo dos artigos em Markdown
    │       │   │       └── ExempleArticle.md # Um arquivo para simular um artigo
    │       │
    │       │   └── Games
    │       │       ├── Games.tsx           # Página de jogos/projetos interativos
    │       │       └── games               # Jogos implementados
    │       │
    │       ├── data
    │       │   └── stacks.ts              # Lista das tecnologias exibidas no site
    │       │
    │       ├── routes
    │       │   └── router.tsx             # Configuração das rotas do site
    │       │
    │       ├── styles
    │       │   └── global.css             # Estilos globais e variáveis de cor
    │       │
    │       └── types
    │           ├── index.ts               # Tipagens globais do projeto
    │           ├── markdown.d.ts          # Tipagem para importação de markdown
    │           └── vite-env.d.ts          # Tipagens do ambiente Vite
    │
    └── README.md
