# Guide de demo - Cypress avec Angular

## Avant la formation

### Preparer l'environnement

```bash
cd cypress-app
npm install
```

L'application utilise une **API REST** sur `http://localhost:3001/todos` (json-server ou equivalent).
Verifier qu'elle tourne avant de commencer.

Verifier que tout fonctionne :

```bash
# Terminal 1 : API REST (si pas deja lancee)
# npx json-server db.json --port 3001

# Terminal 2 : app Angular
npm start

# Terminal 3 : tests Cypress
npm run cy:run
```

Les 39 tests doivent passer. Arreter les terminaux.

### Ce qu'il faut avoir ouvert pendant la demo

- **Terminal 1** : API REST sur `http://localhost:3001/todos`
- **Terminal 2** : `npm start` (serveur Angular sur `http://localhost:4200`)
- **Terminal 3** : `npm run cy:open` (Cypress Test Runner)
- **IDE** : le dossier `cypress-app` ouvert, avec `cypress/e2e/` visible
- **Navigateur** : `http://localhost:4200` pour montrer l'app avant les tests

---

## Deroulement de la demo (~55 min)

### Introduction (5 min)

1. **Ouvrir le navigateur** sur `http://localhost:4200` et montrer l'app :
   - Un formulaire pour ajouter des taches
   - Les todos sont chargees depuis l'API REST
   - Ajouter 2-3 taches manuellement, cocher, supprimer
   - "On va automatiser tout ca avec Cypress"

2. **Montrer rapidement les appels API** dans l'onglet Network du navigateur :
   - GET `/todos` au chargement
   - POST `/todos` a l'ajout
   - PATCH `/todos/:id` au toggle
   - DELETE `/todos/:id` a la suppression
   - "Nos tests vont pouvoir intercepter ces appels"

3. **Montrer la structure du projet** dans l'IDE :
   ```
   cypress/
   ├── e2e/               # Les fichiers de test (7 modules)
   ├── fixtures/           # Donnees de test (JSON)
   └── support/
   │   ├── commands.ts     # Commandes personnalisees
   │   └── e2e.ts          # Fichier charge avant chaque test
   cypress.config.ts       # Configuration
   ```

4. **Montrer `cypress.config.ts`** et expliquer :
   - `baseUrl` : l'URL de l'app Angular
   - `specPattern` : ou trouver les tests
   - `supportFile` : fichier charge automatiquement

---

### Module 01 - Premiers pas (7 min)

**Fichier** : `cypress/e2e/01-navigation.cy.ts`

1. **Ouvrir le fichier dans l'IDE** et parcourir le code avec les stagiaires
2. **Dans Cypress Test Runner**, cliquer sur `01-navigation.cy.ts` pour le lancer
3. **Points cles a montrer** pendant l'execution :
   - Le navigateur integre a Cypress qui s'ouvre
   - Le panneau de gauche avec chaque etape cliquable
   - Le "time travel" : cliquer sur une etape pour voir l'etat du DOM a ce moment

4. **Expliquer chaque concept au fur et a mesure** :

   | Code | Explication |
   |------|-------------|
   | `cy.visit('/')` | Navigue vers l'URL (relative a `baseUrl`) |
   | `cy.get('h1')` | Selectionne un element du DOM par selecteur CSS |
   | `cy.get('[data-cy=dashboard]')` | Selection par attribut `data-cy` **(bonne pratique !)** |
   | `cy.contains('texte')` | Cherche un element contenant ce texte |
   | `.should('be.visible')` | Assertion : l'element est visible |
   | `.should('contain.text', '...')` | Assertion : contient ce texte |
   | `.and('have.attr', 'placeholder', '...')` | Chaine : verifie un attribut HTML |

5. **Montrer le `beforeEach`** - noter le `cy.mockEmptyTodos()` :
   ```typescript
   beforeEach(() => {
     cy.mockEmptyTodos();  // Intercepte GET /todos et retourne []
     cy.visit('/');
     cy.wait('@getTodos');
   });
   ```
   > "On mock l'API pour que les tests soient deterministes. Pas de dependance au serveur."

6. **Ouvrir le template** `todo-dashboard.html` et montrer les attributs `data-cy` :
   ```html
   <section data-cy="dashboard">
     <h2>Mes Taches <span data-cy="todo-count">({{ store.totalCount() }})</span></h2>
   ```
   > "On met des `data-cy` sur les elements qu'on veut tester. C'est plus stable que des classes CSS ou des selecteurs HTML qui peuvent changer."

---

### Module 02 - Interactions (7 min)

**Fichier** : `cypress/e2e/02-interactions.cy.ts`

1. **Lancer le test** dans le runner Cypress
2. **Montrer le time-travel** : cliquer sur l'etape `type` pour voir le texte se taper lettre par lettre
3. **Points cles** :

   | Code | Explication |
   |------|-------------|
   | `.type('Mon texte')` | Tape du texte dans un champ (caractere par caractere) |
   | `.click()` | Clique sur un element |
   | `.should('have.value', '')` | Verifie la valeur d'un input |
   | `.should('not.be.disabled')` | Verifie qu'un bouton est actif |
   | `.type('texte{enter}')` | `{enter}` simule la touche Entree |
   | `cy.wait('@postTodo')` | Attend que le POST soit termine avant de verifier |

4. **Montrer le test "devrait ajouter plusieurs todos"** :
   ```typescript
   const todos = ['Faire les courses', 'Reviser Angular', 'Preparer la demo'];
   todos.forEach((todo) => {
     cy.get('[data-cy=todo-input]').type(todo);
     cy.get('[data-cy=todo-submit]').click();
     cy.wait('@postTodo');
   });
   ```
   > "On peut utiliser du JavaScript classique dans les tests. Le `cy.wait('@postTodo')` attend que chaque requete POST soit terminee."

---

### Module 03 - Actions sur les todos (7 min)

**Fichier** : `cypress/e2e/03-todo-actions.cy.ts`

1. **Montrer le `beforeEach`** qui utilise la custom command + attend les reponses API :
   ```typescript
   beforeEach(() => {
     cy.mockAllTodoApi();
     cy.visit('/');
     cy.wait('@getTodos');
     cy.addTodo('Tache 1');
     cy.wait('@postTodo');
     cy.addTodo('Tache 2');
     cy.wait('@postTodo');
     cy.addTodo('Tache 3');
     cy.wait('@postTodo');
   });
   ```
   > "Chaque test demarre avec un etat propre. Le mock API garantit que les donnees sont toujours les memes."

2. **Lancer les tests** et commenter les resultats
3. **Points cles** :

   | Code | Explication |
   |------|-------------|
   | `.first()` | Prend le 1er element de la selection |
   | `.eq(1)` | Prend le 2eme element (index 0-based) |
   | `.check()` / `.uncheck()` | Coche / decoche une checkbox |
   | `.find('[data-cy=todo-delete]')` | Cherche un enfant dans l'element courant |
   | `.should('have.class', 'completed')` | Verifie qu'une classe CSS est presente |
   | `cy.wait('@patchTodo')` | Attend la reponse PATCH avant de verifier |

4. **Insister sur `.within()`** - test "devrait utiliser .within()" :
   ```typescript
   cy.get('[data-cy=todo-item]').eq(2).within(() => {
     cy.get('[data-cy=todo-title]').should('contain.text', 'Tache 3');
     cy.get('[data-cy=todo-checkbox]').should('not.be.checked');
   });
   ```
   > "`.within()` restreint la portee : tous les `cy.get()` a l'interieur ne cherchent que dans cet element. Tres utile pour les listes."

---

### Module 04 - Assertions avancees (5 min)

**Fichier** : `cypress/e2e/04-assertions.cy.ts`

1. **Lancer les tests** et parcourir rapidement
2. **Presenter les 4 methodes utilitaires** :

   | Methode | Usage | Exemple |
   |---------|-------|---------|
   | `.each()` | Iterer sur chaque element | Verifier le texte de chaque todo |
   | `.its('length')` | Acceder a une propriete | Verifier le nombre d'elements |
   | `.invoke('text')` | Appeler une methode jQuery | Extraire le texte brut |
   | `.then()` | Code libre avec l'objet jQuery | Assertions complexes avec `expect()` |

3. **Montrer le test CSS** :
   ```typescript
   cy.get('[data-cy=todo-item]').first().find('[data-cy=todo-title]')
     .should('have.css', 'text-decoration-line', 'line-through');
   ```
   > "On peut verifier n'importe quelle propriete CSS calculee."

---

### Module 05 - Custom commands (5 min)

**Fichier** : `cypress/e2e/05-custom-commands.cy.ts`

1. **Ouvrir `cypress/support/commands.ts`** et montrer les 4 commandes :
   ```typescript
   // Ajouter un todo via le formulaire
   Cypress.Commands.add('addTodo', (title: string) => { ... });

   // Mock API : retourne une liste vide
   Cypress.Commands.add('mockEmptyTodos', () => { ... });

   // Mock API : retourne les donnees d'une fixture
   Cypress.Commands.add('mockTodosFromFixture', (fixture) => { ... });

   // Mock API complet : GET, POST, DELETE, PATCH
   Cypress.Commands.add('mockAllTodoApi', () => { ... });
   ```
   > "On encapsule les actions repetitives ET les mocks d'API. Tous les tests peuvent les reutiliser."

2. **Montrer la declaration TypeScript** pour l'autocompletion :
   ```typescript
   declare global {
     namespace Cypress {
       interface Chainable {
         addTodo(title: string): Chainable<void>;
         mockEmptyTodos(): Chainable<void>;
         mockTodosFromFixture(fixture?: string): Chainable<void>;
         mockAllTodoApi(): Chainable<void>;
       }
     }
   }
   ```

3. **Lancer les tests** et insister sur :
   - **Aliases** (`.as()` / `@alias`) : nommer un element pour le reutiliser
   - **Chainage fluide** : enchainer selections, filtres et assertions
   - **`cy.log()`** : visible dans le panneau de commandes du runner

---

### Module 06 - Viewport et scenario complet (5 min)

**Fichier** : `cypress/e2e/06-viewport-et-attentes.cy.ts`

1. **Lancer le test mobile** et montrer le navigateur Cypress qui se redimensionne :
   ```typescript
   cy.viewport('iphone-x');
   ```
   > "On peut tester le responsive directement. Les presets incluent `iphone-x`, `ipad-2`, `macbook-15`..."

2. **Lancer le scenario complet** (dernier test) et le suivre etape par etape dans le runner :
   - Etat initial vide (API mockee)
   - Ajout de 3 taches (POST mocke)
   - Cocher une tache (PATCH mocke)
   - Supprimer une tache (DELETE mocke)
   - Supprimer les terminees
   - Capture d'ecran

   > "C'est un vrai scenario utilisateur de bout en bout. Meme si l'API est mockee, on teste tout le comportement de l'app."

3. **Montrer les screenshots** generees dans `cypress/screenshots/`

---

### Module 07 - Intercepter les appels API (10 min)

**Fichier** : `cypress/e2e/07-intercept-api.cy.ts`

> C'est le module le plus important pour les apps Angular qui consomment des API.

1. **Mocker avec une fixture** :
   ```typescript
   cy.intercept('GET', API_URL, { fixture: 'todos.json' }).as('getTodos');
   ```
   > "On remplace la vraie reponse API par un fichier JSON. L'app ne sait pas que c'est faux."

   Ouvrir `cypress/fixtures/todos.json` pour montrer les donnees.

2. **Mocker avec des donnees inline** :
   ```typescript
   cy.intercept('GET', API_URL, [
     { id: 1, title: 'Todo mockee A', completed: false },
     { id: 2, title: 'Todo mockee B', completed: true },
   ]).as('getTodos');
   ```
   > "On peut aussi passer les donnees directement dans le test. Pratique pour des cas specifiques."

3. **Espionner les requetes (verifier le body)** :
   ```typescript
   cy.addTodo('Verifier le body');
   cy.wait('@postTodo').its('request.body').should('deep.include', {
     title: 'Verifier le body',
     completed: false,
   });
   ```
   > "`cy.wait('@postTodo')` retourne l'interception. On peut inspecter `request.body`, `request.url`, `response.body`, etc."

4. **Simuler des erreurs** :
   ```typescript
   // Erreur 500
   cy.intercept('GET', API_URL, { statusCode: 500, body: { error: 'Server Error' } });

   // Latence reseau (2 secondes)
   cy.intercept('GET', API_URL, { delay: 2000, body: [...] });

   // Coupure reseau
   cy.intercept('GET', API_URL, { forceNetworkError: true });
   ```
   > "On peut tester tous les cas d'erreur sans toucher au serveur. Latence, erreurs 500, coupure reseau..."

   Montrer le `cy.on('uncaught:exception')` pour les erreurs non gerees :
   ```typescript
   cy.on('uncaught:exception', (err) => {
     if (err.message.includes('500')) return false; // Ignorer cette erreur
   });
   ```

5. **Espionner la vraie API (spy sans mock)** :
   ```typescript
   // Sans body ni fixture = simple espion
   cy.intercept('GET', API_URL).as('realGetTodos');
   cy.visit('/');
   cy.wait('@realGetTodos').then((interception) => {
     expect(interception.response.statusCode).to.equal(200);
     expect(interception.response.body).to.be.an('array');
   });
   ```
   > "Sans body ni fixture, `cy.intercept()` laisse passer la vraie requete mais permet de l'inspecter. Utile pour verifier que l'app appelle bien l'API."

---

### Conclusion et bonnes pratiques (4 min)

Afficher ces points cles :

**Les regles d'or** :
1. **Selecteurs `data-cy`** : ne jamais dependre des classes CSS ou de la structure HTML
2. **Pas de `cy.wait(2000)`** : Cypress a la retry-ability integree, utiliser `.should()` a la place
3. **`cy.wait('@alias')`** : pour attendre les reponses API, pas des durees fixes
4. **Tests independants** : chaque `it()` doit fonctionner seul, d'ou le `beforeEach`
5. **Custom commands** : factoriser les actions repetitives et les mocks d'API
6. **`cy.intercept()`** : mocker l'API pour des tests deterministes et rapides

**Cypress vs tests unitaires** :
- Tests unitaires (Vitest) : testent la logique isolee (services, fonctions)
- Tests E2E (Cypress) : testent le comportement reel vu par l'utilisateur
- Les deux sont complementaires

**Mock vs vraie API** :
- Tests avec mock : rapides, deterministes, pas de dependance serveur
- Tests avec vraie API : verifient l'integration reelle (a faire en complement)

---

## Mode headless (pour la CI)

Montrer rapidement :

```bash
npm run cy:run
```

> "En CI (GitHub Actions, GitLab CI...), on lance Cypress en mode headless. Pas de navigateur visible, juste les resultats dans le terminal."

---

## Commandes disponibles

| Commande | Usage |
|----------|-------|
| `npm start` | Lancer l'app Angular |
| `npm run cy:open` | Ouvrir Cypress en mode interactif |
| `npm run cy:run` | Lancer les tests en headless |

---

## Structure des fichiers de test

```
cypress/e2e/
├── 01-navigation.cy.ts         5 tests  - visit, get, contains, should
├── 02-interactions.cy.ts       5 tests  - type, click, enter, disabled
├── 03-todo-actions.cy.ts       5 tests  - check, find, eq, within
├── 04-assertions.cy.ts         6 tests  - each, its, invoke, then, CSS
├── 05-custom-commands.cy.ts    4 tests  - commands, as, chainage, log
├── 06-viewport-et-attentes.cy.ts  4 tests  - viewport, screenshot, workflow
└── 07-intercept-api.cy.ts     10 tests  - intercept, fixture, spy, erreurs
                               ──────
                               39 tests
```

---

## Architecture de l'app Angular

```
src/app/
├── app.config.ts                  # provideHttpClient()
├── features/todo/
│   ├── entities/todo.ts           # Interface Todo
│   ├── services/todo.store.ts     # Store avec Signals + HttpClient
│   └── components/
│       ├── todo-dashboard/        # Charge les todos au ngOnInit
│       ├── todo-form/             # POST /todos a l'ajout
│       └── todo-list/             # PATCH/DELETE sur actions
```

**API REST** (`http://localhost:3001/todos`) :
| Methode | URL | Action |
|---------|-----|--------|
| GET | `/todos` | Charger tous les todos |
| POST | `/todos` | Ajouter un todo |
| PATCH | `/todos/:id` | Modifier un todo (toggle) |
| DELETE | `/todos/:id` | Supprimer un todo |

---

## Ressources a partager aux stagiaires

- [Documentation Cypress](https://docs.cypress.io/)
- [cy.intercept() Guide](https://docs.cypress.io/api/commands/intercept)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Cypress Cheat Sheet](https://docs.cypress.io/api/table-of-contents)
- [Angular Testing Guide](https://angular.dev/guide/testing)
