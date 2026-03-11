// Permite importar arquivos .md como string
declare module "*.md?raw" {
  const content: string;
  export default content;
}

// Opcional: se quiser importar só .md sem ?raw
declare module "*.md" {
  const content: string;
  export default content;
}