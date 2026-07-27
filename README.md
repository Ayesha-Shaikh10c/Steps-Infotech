# IT Company Website

This repository contains the source code for our college Software Development project. The project is built using React and follows a Git workflow where each team member works on their own feature branch.

---

 Project Setup

 1. Clone the repository

```bash
git clone <repository-url>
```

Replace `<repository-url>` with the GitHub repository link.

---

 2. Open the project

Open the project folder in VS Code.

---

 3. Install dependencies

```bash
npm install
```

This will install all required packages, including `node_modules`.

---

 4. Run the project

If using Vite:

```bash
npm run dev
```

If using Create React App:

```bash
npm start
```

---

 Project Structure

```
src
│
├── assets
├── components
├── pages
├── styles
├── App.jsx
└── main.jsx
```

Each member should work only inside their assigned page/module unless instructed otherwise.

---

 Git Workflow

 Step 1: Update your local repository

Before starting work every day:

```bash
git checkout main
git pull origin main
```

---

 Step 2: Switch to your feature branch

If your branch already exists:

```bash
git checkout feature-yourmodule
```

Example:

```bash
git checkout feature-home
```

If you have not created your branch yet:

```bash
git checkout -b feature-yourmodule
```

Example:

```bash
git checkout -b feature-home
```

---

 Step 3: Work on your assigned module

Only modify files related to your assigned page.

Example:

- Home → `src/pages/Home`
- About → `src/pages/About`
- Services → `src/pages/Services`

Avoid modifying other members' files.

---

 Step 4: Save your progress

After completing a meaningful feature:

```bash
git add .
git commit -m "Describe your changes"
```

Example:

```bash
git commit -m "Added Home hero section"
```

---

 Step 5: Push your branch

First push:

```bash
git push -u origin feature-yourmodule
```

Future pushes:

```bash
git push
```

---

 Step 6: Keep your branch updated

Whenever changes are merged into `main`:

```bash
git checkout main
git pull origin main

git checkout feature-yourmodule
git merge main
```

Resolve conflicts if Git asks you to.

---

 Step 7: Create a Pull Request

After completing your assigned module:

- Push your branch to GitHub.
- Create a Pull Request from your feature branch to `main`.
- Wait for review before merging.

---

 Git Rules

 Create one feature branch per module.

 Pull the latest changes before starting work.

 Commit frequently with meaningful commit messages.

 Push your own branch only.

 Do NOT push directly to `main`.

 Do NOT modify another member's assigned page.

 Do NOT commit the `node_modules` folder.

---

 Branch Naming

Use the following format:

```
feature-home
feature-about
feature-services
feature-solutions
feature-technologies
feature-portfolio
feature-partners
feature-testimonials
feature-careers
feature-blog
feature-contact
```

---

 Commit Message Examples

Good:

```
Added About page layout
Created Services cards
Styled Navbar
Made Home page responsive
Fixed footer alignment
```

Avoid:

```
update
done
changes
final
abc
```

---

 Team Responsibilities

Each team member is responsible for:

- Developing their assigned module.
- Testing their changes before pushing.
- Keeping their branch up to date.
- Following the Git workflow.

The team leader is responsible for:

- Reviewing Pull Requests.
- Merging completed features into `main`.
- Resolving merge conflicts if required.
- Maintaining the overall project structure.

---

Happy Codingg
