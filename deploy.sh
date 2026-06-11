#!/usr/bin/env bash
# ============================================================================
# Сільпо PWA — deploy to the droplet.
#
#   SSHPASS='<server-password>' ./deploy.sh
#
# What it does:
#   1. Builds the app (npm run build).
#   2. Mirrors dist/ to the web root — but NEVER touches the server's media/
#      folder (product videos live there and must survive every deploy).
#   3. Syncs the local media/ folder up to the server ADDITIVELY (no --delete),
#      so product videos are uploaded once and stay available forever.
#
# To add a future product video: drop the file into ./media/, reference it in
# the app as  http://<HOST>/media/<filename>  (see src/data/gallery.js), and
# run ./deploy.sh again. It will be uploaded and will never be deleted by a
# later app deploy.
# ============================================================================
set -euo pipefail
cd "$(dirname "$0")"

HOST="${SILPO_HOST:-104.248.132.130}"
USER="${SILPO_USER:-root}"
REMOTE_ROOT="/var/www/silpo"
SSH_OPTS="-o StrictHostKeyChecking=accept-new -o PreferredAuthentications=password -o PubkeyAuthentication=no"
REMOTE_SHELL="sshpass -e ssh $SSH_OPTS"

if [[ -z "${SSHPASS:-}" ]]; then
  echo "✗ Set the server password first, e.g.:  SSHPASS='…' ./deploy.sh" >&2
  exit 1
fi

echo "▸ Building…"
npm run build

echo "▸ Deploying app  (dist → $HOST, server media/ preserved)…"
rsync -az --delete --exclude='media/' -e "$REMOTE_SHELL" dist/ "$USER@$HOST:$REMOTE_ROOT/"

if [[ -d media ]] && [[ -n "$(ls -A media 2>/dev/null)" ]]; then
  echo "▸ Syncing media (videos → $HOST/media, additive — nothing is deleted)…"
  $REMOTE_SHELL "$USER@$HOST" "mkdir -p $REMOTE_ROOT/media"
  # No --delete here: server media is a superset, so videos are never removed.
  rsync -az -e "$REMOTE_SHELL" media/ "$USER@$HOST:$REMOTE_ROOT/media/"
fi

echo "▸ Verifying…"
curl -s -o /dev/null -w "  index:               %{http_code}\n" "http://$HOST/"
if [[ -d media ]]; then
  for f in media/*; do
    [[ -e "$f" ]] || continue
    name="$(basename "$f")"
    curl -s -o /dev/null -w "  media/$name:  %{http_code} %{content_type}\n" "http://$HOST/media/$name"
  done
fi
echo "✓ Deployed → http://$HOST"
