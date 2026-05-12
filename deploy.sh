#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════
#  deploy.sh  —  RPIT auto-commit & push
#  Usage :  ./deploy.sh
#       ou  ./deploy.sh "message personnalisé"
# ═══════════════════════════════════════════════════════════════

set -euo pipefail   # stop on any error

# ── Colours ────────────────────────────────────────────────────
BOLD='\033[1m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
RESET='\033[0m'

log()  { echo -e "${CYAN}▶ $*${RESET}"; }
ok()   { echo -e "${GREEN}✓ $*${RESET}"; }
warn() { echo -e "${YELLOW}⚠ $*${RESET}"; }
die()  { echo -e "${RED}✗ $*${RESET}"; exit 1; }

# ── Guard: must be run from the project root ───────────────────
[ -f "package.json" ] || die "Lancez le script depuis la racine du projet (là où se trouve package.json)."

# ── Guard: must have git ───────────────────────────────────────
git rev-parse --git-dir > /dev/null 2>&1 || die "Ce dossier n'est pas un dépôt git."

# ── Check for changes ─────────────────────────────────────────
if git diff --quiet && git diff --cached --quiet && [ -z "$(git ls-files --others --exclude-standard)" ]; then
  warn "Aucun changement à committer. Le dépôt est propre."
  exit 0
fi

# ── Stage everything ──────────────────────────────────────────
log "Staging de tous les fichiers modifiés…"
git add .
ok "git add ."

# ── Build the commit message ──────────────────────────────────
# Priority: argument passed to the script > auto-generated from changed files
if [ -n "${1:-}" ]; then
  MSG="$1"
else
  # Count changed files by category
  CHANGED=$(git diff --cached --name-only)

  N_SRC=$(echo "$CHANGED"      | grep -c "^src/"         || true)
  N_PUB=$(echo "$CHANGED"      | grep -c "^public/"      || true)
  N_I18N=$(echo "$CHANGED"     | grep -c "^src/i18n/"    || true)
  N_HTML=$(echo "$CHANGED"     | grep -c "index\.html"   || true)
  N_CONF=$(echo "$CHANGED"     | grep -cE "(vite|tailwind|postcss|vercel|package).*\.(js|json)$" || true)
  TOTAL=$(echo "$CHANGED"      | grep -c "."             || true)

  # Build a human-readable prefix
  PARTS=()
  [ "$N_I18N"  -gt 0 ] && PARTS+=("i18n")
  [ "$N_SRC"   -gt 0 ] && PARTS+=("src")
  [ "$N_PUB"   -gt 0 ] && PARTS+=("assets")
  [ "$N_HTML"  -gt 0 ] && PARTS+=("html")
  [ "$N_CONF"  -gt 0 ] && PARTS+=("config")

  SCOPE=$(IFS=", "; echo "${PARTS[*]}")
  DATE=$(date "+%Y-%m-%d %H:%M")

  if [ -n "$SCOPE" ]; then
    MSG="update(${SCOPE}): ${TOTAL} file(s) — ${DATE}"
  else
    MSG="chore: update ${TOTAL} file(s) — ${DATE}"
  fi
fi

# ── Commit ────────────────────────────────────────────────────
log "Commit : \"${BOLD}${MSG}${RESET}${CYAN}\""
git commit -m "$MSG"
ok "Commit créé."

# ── Push ──────────────────────────────────────────────────────
BRANCH=$(git rev-parse --abbrev-ref HEAD)
log "Push vers origin/${BRANCH}…"

# If the branch has no upstream yet, set it automatically
if ! git rev-parse --abbrev-ref "@{upstream}" > /dev/null 2>&1; then
  warn "Pas d'upstream configuré — configuration de origin/${BRANCH}…"
  git push --set-upstream origin "$BRANCH"
else
  git push
fi

echo ""
ok "Déploiement terminé → ${BOLD}origin/${BRANCH}${RESET}"
echo ""
