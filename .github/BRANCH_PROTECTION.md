# Branch and pull request policy

## Feature branches

Use `feature/{SHOP|API}-NNN-short-description`, for example:

- `feature/SHOP-001-product-search`
- `feature/SHOP-002-shopping-cart`
- `feature/API-001-user-crud`
- `feature/API-002-authentication`

The `Branch policy` workflow checks this format on every pull request.

## Required GitHub repository rules

Apply these rules to the default branch in GitHub repository settings (or an
organization ruleset):

1. Require a pull request before merging.
2. Require at least one approving review; dismiss stale approvals when new
   commits are pushed.
3. Require the `Playwright CI / test` and
   `Branch policy / Validate feature branch name` checks to pass.
4. Require the branch to be up to date before merging.
5. Block force pushes and branch deletion.

These settings are enforced by GitHub, not by the workflow files themselves.
