#!/bin/sh
set -e
# 沒有提供憑證時，自動產生自簽憑證給 443 用（前面的閘道／Cloudflare 才是對外的正式憑證）
if [ -n "$HTTPS_PORT" ] && [ ! -f "$TLS_CERT" ]; then
  mkdir -p "$(dirname "$TLS_CERT")" "$(dirname "$TLS_KEY")"
  openssl req -x509 -newkey rsa:2048 -nodes -days 3650 \
    -keyout "$TLS_KEY" -out "$TLS_CERT" \
    -subj "/CN=ek21.com" \
    -addext "subjectAltName=DNS:ek21.com,DNS:www.ek21.com,DNS:ek21.com.tw,DNS:www.ek21.com.tw,DNS:ek21.tw,DNS:www.ek21.tw" \
    >/dev/null 2>&1
  echo "generated self-signed certificate at $TLS_CERT"
fi
exec "$@"
