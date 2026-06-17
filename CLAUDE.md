# CLAUDE.md — Airalo QA Automation UI

## Context
This is a QA automation challenge for Cleverbit.
Stack: Playwright + TypeScript.
Target: https://www.airalo.com


## Architecture
- Use Page Object Model. One page class per distinct UI area.
- Keep test logic in test files. Keep selectors and actions in page objects.
- No magic strings in tests — use constants or config for currencies, URLs, values.

## Test Writing Rules
- Readable first, clever second. A junior QA must understand every test.
- One assertion per test where possible. If multiple, they must be cohesive.
- Explicit waits only. No Thread.Sleep(). No arbitrary timeouts.
- If a selector is fragile, flag it with a comment — do not silently accept it.

## What You Must Not Do
- Do not "fix" ambiguous ACs — flag them instead.
- Do not add tests outside the defined scope without asking first.
- Do not use Thread.Sleep() or arbitrary waits.
- Do not hardcode credentials, tokens, or environment-specific URLs.

## My Role
I will review every test before it's considered done.
When in doubt, stop and ask. I will make the judgement call.