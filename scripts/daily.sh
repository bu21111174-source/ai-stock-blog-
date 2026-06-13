#!/bin/bash
set -e

export PATH="/Users/bugyu/.nvm/versions/node/v24.15.0/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$PATH"

cd "$(dirname "$0")/.."

LOG_FILE="$HOME/ai-stock-blog/logs/daily-$(date +%Y%m%d-%H%M%S).log"
mkdir -p logs

{
  echo "=== $(date) ==="
  npm run generate

  if [ -n "$(git status --porcelain content/)" ]; then
    git add content/
    git -c user.name="bugyu" -c user.email="bu21111174@gmail.com" \
      commit -m "Daily post $(date +%Y-%m-%d)"
    git push
    echo "푸시 완료"
  else
    echo "새로운 변경사항 없음"
  fi
} >> "$LOG_FILE" 2>&1
