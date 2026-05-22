import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputPath = path.join(__dirname, 'rapport-taskflow.pdf');

const pageWidth = 595.28;
const pageHeight = 841.89;
const marginX = 58;
const contentWidth = pageWidth - marginX * 2;

const pages = [
  {
    label: 'Introduction',
    title: 'Rapport de projet: TaskFlow',
    subtitle: 'Application de gestion des taches CRUD',
    sections: [
      {
        heading: 'Contexte du projet',
        body: [
          'TaskFlow est une application web locale concue pour gerer des taches de maniere simple et rapide. Le projet utilise React pour l interface, Vite pour le developpement, Axios pour les appels HTTP et json-server pour simuler une API REST.',
          'La demande principale consiste a garder le meme objectif fonctionnel tout en refaisant completement la presentation visuelle, l organisation des ecrans et le placement des boutons.',
        ],
      },
      {
        heading: 'Objectif general',
        body: [
          'L objectif est de permettre a un utilisateur de creer, consulter, modifier, filtrer et supprimer des taches. Chaque tache possede un titre obligatoire, une description optionnelle et un statut de suivi.',
          'Le nouveau design met l accent sur un tableau de bord plus clair, une navigation laterale et des actions placees pres du contexte d utilisation.',
        ],
      },
    ],
  },
  {
    label: 'Fonctionnalites',
    title: 'Objectif fonctionnel conserve',
    subtitle: 'Les usages principaux restent identiques',
    sections: [
      {
        heading: 'Gestion complete des taches',
        body: [
          'L application permet de lister toutes les taches enregistrees dans la base db.json. Les informations affichees sont le titre, la description et le statut courant.',
          'La creation d une tache se fait depuis une page dediee. Le formulaire valide le titre afin d eviter l ajout d elements vides.',
        ],
      },
      {
        heading: 'Modification et suppression',
        body: [
          'La modification charge la tache selectionnee, pre-remplit le formulaire et enregistre les nouvelles valeurs via une requete PUT vers l API locale.',
          'La suppression utilise une confirmation avant d envoyer une requete DELETE. Cela reduit le risque d effacer une tache par erreur.',
        ],
      },
      {
        heading: 'Filtrage par statut',
        body: [
          'Les statuts disponibles sont A faire, En cours et Termine. Le tableau de bord propose un filtre pour afficher toutes les taches ou seulement un statut precis.',
          'Le statut peut aussi etre change directement depuis une carte de tache, ce qui rend le suivi quotidien plus rapide.',
        ],
      },
    ],
  },
  {
    label: 'Architecture',
    title: 'Architecture technique',
    subtitle: 'Organisation simple et maintenable',
    sections: [
      {
        heading: 'Stack utilisee',
        body: [
          'Le front-end repose sur React 18 avec Vite. React Router gere les routes principales: tableau de bord, ajout d une tache et modification d une tache existante.',
          'Axios centralise les appels vers json-server. L API locale expose les endpoints GET, POST, PUT et DELETE sur la ressource /tasks.',
        ],
      },
      {
        heading: 'Structure des fichiers',
        body: [
          'Le fichier App.jsx declare la structure principale et les routes. La page Dashboard.jsx affiche les taches, les statistiques, les filtres et les cartes.',
          'La page TaskEditor.jsx gere a la fois la creation et la modification. Les composants TaskForm.jsx et TaskCard.jsx isolent les parties reutilisables.',
        ],
      },
      {
        heading: 'Donnees',
        body: [
          'La base de donnees locale est db.json. Chaque tache contient au minimum un identifiant, un titre, une description, un statut et des dates de creation ou de mise a jour.',
          'Une fonction de normalisation rend le statut compatible avec plusieurs anciennes valeurs possibles afin d eviter les erreurs d affichage.',
        ],
      },
    ],
  },
  {
    label: 'Design',
    title: 'Nouvelle interface',
    subtitle: 'Refonte complete de la presentation',
    sections: [
      {
        heading: 'Nouvelle disposition',
        body: [
          'L interface adopte une navigation laterale sombre avec le nom TaskFlow et deux entrees principales: Tableau et Nouvelle tache.',
          'Le tableau de bord commence par une zone de titre et un bouton principal pour creer une tache. Les compteurs donnent une vue immediate sur le total et les statuts.',
        ],
      },
      {
        heading: 'Cartes et boutons',
        body: [
          'Les taches sont presentees sous forme de cartes lisibles. Le statut est visible en haut de chaque carte et peut etre modifie avec une liste deroulante.',
          'Les boutons Modifier et Supprimer sont places en bas de la carte, pres de l element concerne. Le bouton de creation est place dans l en-tete du tableau de bord.',
        ],
      },
      {
        heading: 'Responsive design',
        body: [
          'La mise en page s adapte aux ecrans plus petits. La barre laterale devient une zone superieure, les cartes passent sur une colonne et les boutons prennent toute la largeur si necessaire.',
          'Les couleurs restent sobres et orientees productivite: fond clair, surfaces blanches, accent vert, jaune pour les taches en cours et vert pour les taches terminees.',
        ],
      },
    ],
  },
  {
    label: 'Execution',
    title: 'Execution et validation',
    subtitle: 'Lancement local du projet',
    sections: [
      {
        heading: 'Commandes de lancement',
        body: [
          'Pour lancer l API locale, il faut executer npm run server. json-server demarre sur http://localhost:3001 et expose la ressource /tasks.',
          'Pour lancer l application React, il faut executer npm run dev. Vite demarre ensuite l interface sur http://127.0.0.1:5173.',
        ],
      },
      {
        heading: 'Verification effectuee',
        body: [
          'La commande npm run build a ete executee avec succes. Le build de production confirme que les composants React, les routes et le CSS sont valides.',
          'Les deux services locaux ont aussi ete verifies: la page Vite repond correctement et l endpoint /tasks renvoie les donnees de la base locale.',
        ],
      },
      {
        heading: 'Conclusion',
        body: [
          'Le projet conserve son objectif initial: gerer des taches avec les operations CRUD et un filtrage par statut.',
          'La nouvelle version propose une presentation plus moderne, plus organisee et plus facile a utiliser, sans changer la logique principale du mini-projet.',
        ],
      },
    ],
  },
];

function escapeText(value) {
  return value.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

function wrapText(text, fontSize, maxWidth) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = '';
  const averageCharWidth = fontSize * 0.52;
  const maxChars = Math.max(24, Math.floor(maxWidth / averageCharWidth));

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }

  if (line) {
    lines.push(line);
  }

  return lines;
}

function textLine(x, y, text, font = 'F1', size = 11, color = '0.09 0.13 0.15') {
  return [
    'BT',
    `/${font} ${size} Tf`,
    `${color} rg`,
    `${x.toFixed(2)} ${y.toFixed(2)} Td`,
    `(${escapeText(text)}) Tj`,
    'ET',
  ].join('\n');
}

function pageStream(page, index) {
  const commands = [
    '0.93 0.95 0.95 rg',
    `0 0 ${pageWidth.toFixed(2)} ${pageHeight.toFixed(2)} re f`,
    '1 1 1 rg',
    `42 42 ${(pageWidth - 84).toFixed(2)} ${(pageHeight - 84).toFixed(2)} re f`,
    '0.06 0.46 0.43 rg',
    `42 ${(pageHeight - 118).toFixed(2)} ${(pageWidth - 84).toFixed(2)} 76 re f`,
    '0.96 0.79 0.36 rg',
    `58 ${(pageHeight - 92).toFixed(2)} 42 10 re f`,
  ];

  commands.push(textLine(marginX, pageHeight - 92, page.label.toUpperCase(), 'F2', 9, '1 1 1'));
  commands.push(textLine(marginX, pageHeight - 142, page.title, 'F2', 22, '0.09 0.13 0.15'));
  commands.push(textLine(marginX, pageHeight - 165, page.subtitle, 'F1', 12, '0.39 0.44 0.48'));

  let y = pageHeight - 215;
  for (const section of page.sections) {
    commands.push(textLine(marginX, y, section.heading, 'F2', 14, '0.06 0.46 0.43'));
    y -= 22;

    for (const paragraph of section.body) {
      const lines = wrapText(paragraph, 11, contentWidth);
      for (const line of lines) {
        commands.push(textLine(marginX, y, line, 'F1', 11, '0.09 0.13 0.15'));
        y -= 15;
      }
      y -= 9;
    }

    y -= 8;
  }

  commands.push('0.85 0.89 0.89 RG');
  commands.push(`58 72 ${(pageWidth - 116).toFixed(2)} 0.5 w 0 0 m S`);
  commands.push(textLine(marginX, 52, `TaskFlow - Rapport de projet`, 'F1', 9, '0.39 0.44 0.48'));
  commands.push(textLine(pageWidth - 110, 52, `Page ${index + 1} / ${pages.length}`, 'F1', 9, '0.39 0.44 0.48'));

  return commands.join('\n');
}

function objectBuffer(id, content) {
  const body = Buffer.isBuffer(content) ? content : Buffer.from(String(content), 'latin1');
  return Buffer.concat([
    Buffer.from(`${id} 0 obj\n`, 'latin1'),
    body,
    Buffer.from('\nendobj\n', 'latin1'),
  ]);
}

const objects = [];
const pageObjectIds = pages.map((_, index) => 3 + index * 2);
const contentObjectIds = pages.map((_, index) => 4 + index * 2);
const fontRegularId = 13;
const fontBoldId = 14;

objects.push(objectBuffer(1, '<< /Type /Catalog /Pages 2 0 R >>'));
objects.push(
  objectBuffer(
    2,
    `<< /Type /Pages /Kids [${pageObjectIds.map((id) => `${id} 0 R`).join(' ')}] /Count ${pages.length} >>`,
  ),
);

pages.forEach((page, index) => {
  const pageId = pageObjectIds[index];
  const contentId = contentObjectIds[index];
  const stream = Buffer.from(pageStream(page, index), 'latin1');

  objects.push(
    objectBuffer(
      pageId,
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth.toFixed(2)} ${pageHeight.toFixed(2)}] /Resources << /Font << /F1 ${fontRegularId} 0 R /F2 ${fontBoldId} 0 R >> >> /Contents ${contentId} 0 R >>`,
    ),
  );
  objects.push(
    objectBuffer(
      contentId,
      Buffer.concat([
        Buffer.from(`<< /Length ${stream.length} >>\nstream\n`, 'latin1'),
        stream,
        Buffer.from('\nendstream', 'latin1'),
      ]),
    ),
  );
});

objects.push(objectBuffer(fontRegularId, '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>'));
objects.push(objectBuffer(fontBoldId, '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>'));

objects.sort((first, second) => {
  const firstId = Number(first.toString('latin1', 0, 8).match(/^(\d+)/)?.[1] || 0);
  const secondId = Number(second.toString('latin1', 0, 8).match(/^(\d+)/)?.[1] || 0);
  return firstId - secondId;
});

const header = Buffer.from('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n', 'binary');
const chunks = [header];
const offsets = [0];
let position = header.length;

for (const object of objects) {
  const id = Number(object.toString('latin1', 0, 8).match(/^(\d+)/)?.[1] || 0);
  offsets[id] = position;
  chunks.push(object);
  position += object.length;
}

const xrefOffset = position;
const maxObjectId = 14;
const xrefLines = ['xref', `0 ${maxObjectId + 1}`, '0000000000 65535 f '];
for (let id = 1; id <= maxObjectId; id += 1) {
  xrefLines.push(`${String(offsets[id]).padStart(10, '0')} 00000 n `);
}

const trailer = [
  ...xrefLines,
  'trailer',
  `<< /Size ${maxObjectId + 1} /Root 1 0 R >>`,
  'startxref',
  String(xrefOffset),
  '%%EOF',
].join('\n');

chunks.push(Buffer.from(trailer, 'latin1'));
fs.writeFileSync(outputPath, Buffer.concat(chunks));

console.log(outputPath);
