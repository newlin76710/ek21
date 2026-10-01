# 尋夢園聊天室（ek21.com 首頁）

純靜態網站（Next.js `output: 'export'`），跑在 **Cloudflare Workers Static Assets**，與姊妹站 `dating`、`ek21news`、`eros`、`shesay` 架構一致。
唯一的後端是 `worker/index.js`，提供聊天室即時人數。

## 結構

| 檔案 | 說明 |
|---|---|
| `lib/rooms.json` | 聊天室清單（新版／舊版、網址、站長、縮圖）——前端與 Worker 共用，新增聊天室只改這裡 |
| `lib/site.ts` | 姊妹站、舊版會員中心／頭像商城、LINE 等連結 |
| `lib/plans.ts` | 承租方案：50 人 NT$500、100 人 NT$1,000、150 人 NT$1,500（每月） |
| `lib/use-live-rooms.ts` | 前端共用的人數輪詢（每 60 秒，分頁隱藏或閒置 15 分鐘時暫停，失敗時拉長重試間隔） |
| `worker/index.js` | `/api/rooms`、舊網址轉址、舊路徑轉給舊主機、404 |

## 聊天室人數來源（`/api/rooms`，Worker 快取 60 秒）

- **舊版**：抓 `http://ipXX.ek21.com/<房號>/?ot=1` 登入頁上的「目前人數 N 人」
- **新版**：`https://chatroom-backend.ek21.com/getRoomUsers?room=<slug>` 的 `users.length`
- **總在線人數**：上面各間加總（舊站 `/api/online_chat.js` 被 CDN 快取 4 小時，不即時，所以不用）

## 連結規則

- 新版聊天室 → 直接開 `https://<slug>.ek21.com/`
- 舊版聊天室 → 開舊版登入頁 `http://ipXX.ek21.com/<房號>/?ot=1`
- 會員中心 `http://member.ek21.com/`、頭像商城 `http://avatar.ek21.com/` 標示為「舊版」
- 尋夢新聞 → `https://news.ek21.com/`、戀愛小秘書娜米 → `https://dating.ek21.com/`（`lib/site.ts` 的 `LINKS`），一律用 `<a>` 整頁跳轉；本站不再有 `/news`、`/dating` 頁面

## 開發與部署

```bash
npm install
npm run dev        # 只看畫面（沒有 /api/rooms，人數會顯示讀取中）
npm run preview    # build + wrangler dev，含 Worker，人數會是真的
npm run deploy     # build + wrangler deploy
```

## 網域路由（Cloudflare → ek21.com → Workers Routes）

| 路由 | Worker |
|---|---|
| `ek21.com/*`、`www.ek21.com/*` | `ek21`（本專案） |
| `ek21.com/dating*`、`*.ek21.com/dating*` | `dating` |
| `ek21.com/news*`、`*.ek21.com/news*` | `ek21news` |

路由較長者優先。本站沒有的路徑（例如舊版登入頁引用的 `/login/*.css`、`/blog/*`）會由 Worker 轉給原本的舊主機，舊頁面不會壞掉。

## Docker 部署（125.228.199.166，主機 vm45／192.168.1.45）

不用 Cloudflare Workers 時，改用 Docker 跑 `server/index.mjs`（只用 Node 內建模組），提供靜態網站、`/api/rooms`（記憶體快取 60 秒）與舊網址轉址，聽 80 與 443。

```bash
# 部署（在本機打包上傳，於伺服器 /opt/ek21 建置）
docker compose build
docker compose up -d
docker logs -f ek21
```

- 443 預設使用自動產生的自簽憑證（`./certs`）；對外 HTTPS 由前面的閘道（192.168.1.15）／Cloudflare 處理。要換正式憑證，把 `cert.pem`、`key.pem` 放進 `./certs` 後重啟。
- `LEGACY_ORIGIN`（選填）：本站沒有的路徑轉給舊站主機。舊站主機 114.32.94.166 對 `ek21.com` 目前回 502，所以預設不開。
- 原本佔用 80/443 的 `hello-nginx` 已停止（未刪除），要退回：`docker compose down && docker start hello-nginx`。
- 閘道目前只把 `chatroom.ek21.com` 轉到這台；`ek21.com` 等網域要在閘道加上轉發到 192.168.1.45:80，並把 Cloudflare DNS 從 Worker 自訂網域改指向 125.228.199.166（維持橘色雲朵，`/dating`、`/news` 的 Worker 路由才會繼續生效）。
