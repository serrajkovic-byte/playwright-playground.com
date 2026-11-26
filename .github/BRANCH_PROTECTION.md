# Branch and pull request policy

## Feature branches

Use `feature/{SHOP|API}-NNN-short-description`, for example:

- `feature/SHOP-001-product-search`
- `feature/SHOP-002-shopping-cart`
- `feature/API-001-user-crud`
- `feature/API-002-authentication`

The `Branch policy` workflow checks this format on every pull request. A branch
with another name must be renamed before its pull request can pass that check.

## Required GitHub repository rules

A repository administrator must apply these rules to `main` in GitHub under
**Settings > Branches > Add branch protection rule** (or an equivalent
repository ruleset):

1. Require a pull request before merging.
2. Require at least one approving review; dismiss stale approvals when new
   commits are pushed.
3. Require the `test` job from `Playwright CI` and the
   `Validate feature branch name` job from `Branch policy` to pass. The checks
   must have run before they can be selected in GitHub.
4. Require the branch to be up to date before merging.
5. Block force pushes and branch deletion.

These settings are enforced by GitHub, not by the workflow files themselves.
The `test` job includes lint, formatting, type checking and Playwright tests.
