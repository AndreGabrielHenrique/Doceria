const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const outPath = path.join(__dirname, '..', 'Documentacao_Projeto_Doceria.pdf');
const doc = new PDFDocument({autoFirstPage: false});

doc.pipe(fs.createWriteStream(outPath));

// First page
doc.addPage({margin: 50});
doc.fontSize(20).text('Documentação do Projeto Doceria', {align: 'center'});
doc.moveDown();

doc.fontSize(12).text('Descrição do Projeto', {underline: true});
doc.moveDown(0.5);
doc.fontSize(10).text('O projeto Doceria é uma aplicação web em React que apresenta uma interface interativa com várias seções como Banner, Bem-Vindo, Sobre, Variação, Visual, Festa e Contato. É organizado de forma modular para facilitar manutenção e extensibilidade.');

doc.moveDown();
doc.fontSize(12).text('Estrutura do Projeto', {underline: true});
doc.moveDown(0.5);
doc.fontSize(10).list([
  'src/: código-fonte da aplicação',
  'src/components/: componentes reutilizáveis (Header, Banner, Sobre, Contato, etc.)',
  'src/hooks/: hooks personalizados (ex: useFormulario)',
  'src/styles/: estilos globais e específicos (global.sass e arquivos .sass por componente)',
  'public/: assets públicos e HTML principal',
  'legacy/: código legado e recursos antigos'
]);

doc.addPage({margin: 50});
doc.fontSize(12).text('Principais Tecnologias', {underline: true});

doc.moveDown(0.5);
doc.fontSize(10).text('• React (biblioteca para UI)');
doc.text('• Vite (ferramenta de build e dev server)');
doc.text('• ESLint (análise de código)');

doc.moveDown();
doc.fontSize(12).text('Dependências e Scripts', {underline: true});

doc.moveDown(0.5);
doc.fontSize(10).text('Scripts disponíveis no package.json:');
doc.list([
  '`npm run dev`: inicia servidor de desenvolvimento',
  '`npm run build`: gera build de produção',
  '`npm run preview`: pré-visualiza build',
  '`npm run lint`: executa ESLint'
]);

doc.moveDown();
doc.fontSize(12).text('Componentes Principais', {underline: true});

doc.moveDown(0.5);
doc.fontSize(10).text('O projeto contém componentes em `src/components/` tais como:');
doc.list([
  'Header: cabeçalho e navegação',
  'Banner: imagem/intro principal',
  'BemVindo: seção de boas-vindas',
  'Sobre: informações sobre o projeto/empresa',
  'Variacao: variações de produtos/itens',
  'Visual: recursos visuais e imagens',
  'Festa: seção focada em eventos',
  'Contato: formulário de contato (usa `useFormulario` no hooks)'
]);

doc.addPage({margin: 50});
doc.fontSize(12).text('Como executar localmente', {underline: true});

doc.moveDown(0.5);
doc.fontSize(10).text('1. Instalar dependências: `npm install`');
doc.text('2. Iniciar servidor de desenvolvimento: `npm run dev`');

doc.moveDown();
doc.fontSize(12).text('Observações', {underline: true});

doc.moveDown(0.5);
doc.fontSize(10).text('Este PDF foi gerado automaticamente por um script Node usando a biblioteca pdfkit para substituir um arquivo que estava corrompido. Se precisar de versões adicionais (HTML, DOCX) ou mais detalhes, posso gerar.');

// Footer with generated date
const date = new Date().toLocaleString('pt-BR');
doc.moveDown(2);
doc.fontSize(9).text(`Gerado em: ${date}`, {align: 'right'});

doc.end();
console.log('PDF gerado em:', outPath);
