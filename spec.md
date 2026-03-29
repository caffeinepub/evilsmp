# EVILSMP Server Website

## Current State
New project with empty backend and default frontend scaffold.

## Requested Changes (Diff)

### Add
- Hero section with server name EVILSMP, dark fantasy branding
- Server connection info: IP `EVILSMPPLAY.aternos.me`, Port `28694` with copy-to-clipboard
- Server rules section (discipline-focused rules)
- Owner profile section featuring Anik as owner
- Staff/admin panel (owner-only) via authorization
- Dark Minecraft fantasy theme throughout

### Modify
- Backend: add role-based access (owner role for Anik), store server rules, announcements
- Frontend: full dark minecraft fantasy redesign

### Remove
- Default scaffold UI

## Implementation Plan
1. Backend: authorization with roles (owner, moderator, player), store announcements/rules
2. Frontend: dark fantasy Minecraft themed single-page site with hero, server info, rules, owner section, and admin panel for owner
