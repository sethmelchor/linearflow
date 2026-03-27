# Contributing to Linearflow

This project uses [Linear](https://linear.app) for issue tracking and follows a branch-based workflow with code review.

## Branch Model

| Branch | Purpose |
|--------|---------|
| `main` | Production — always deployable |
| `develop` | Integration — features merge here first |
| `{LIN-ID}-description` | Feature/fix branches created from `develop` |

## Workflow

### 1. Create a ticket in Linear

- New work starts as a ticket in **Triage** status
- Add a clear title and description of the change
- Assign yourself and move to **In Progress**

### 2. Branch from develop

Linear can auto-create branches when a ticket moves to In Progress. The branch name follows the pattern:

```
{team-prefix}-{ticket-number}-short-description
```

Example: `LIN-42-add-dark-mode`

Check out the branch locally:

```bash
git fetch origin
git checkout LIN-42-add-dark-mode
```

### 3. Implement the change

- Make your changes on the feature branch
- Commit with clear messages referencing the ticket: `LIN-42: Add dark mode toggle`
- Push to the remote:

```bash
git push origin LIN-42-add-dark-mode
```

### 4. Open a Pull Request

- Open a PR targeting the `develop` branch
- Link the Linear ticket in the PR description
- Request code review

### 5. Review and QA

- Code review happens on the PR
- QA approval happens in Linear (move ticket to **In Review**)
- Once both pass, merge the PR

### 6. Merge to develop

- Squash-merge or merge commit into `develop`
- Linear automatically moves the ticket to **Done** when the PR merges

### 7. Release to production

- Periodically merge `develop` into `main` for production releases
- Tag releases as needed

## Local Development

Open `index.html` in your browser — no build step or server required.

For a local server (optional):

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Example: Adding Dark Mode

This is the first planned ticket to walk through the full workflow:

1. Create Linear ticket: **"Add dark mode toggle"**
2. Move to In Progress → branch auto-created
3. The CSS already uses custom properties (`--bg-primary`, `--text-primary`, etc.) — add a `.dark-mode` class that overrides these values
4. Add a toggle button in the header
5. Open PR → review → merge to `develop` → done
