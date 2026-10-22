#!/bin/zsh
cd "$(dirname "$0")"
if ! curl -fsS http://127.0.0.1:8765/ >/dev/null 2>&1; then
  python3 -m http.server 8765 --bind 127.0.0.1 >/tmp/buen-camino-server.log 2>&1 &
  sleep 1
fi
editor_url=$(/usr/bin/python3 -c 'from pathlib import Path; from urllib.parse import quote; print("http://localhost:8765/editor.html#editar=" + quote(Path(".editor-key").read_text().strip(), safe=""))')
open "$editor_url"
