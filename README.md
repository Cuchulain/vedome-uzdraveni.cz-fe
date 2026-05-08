# vedome-uzdraveni.cz – Frontend

Statický web postavený na [Astro](https://astro.build) s Tailwind CSS a MDX. Produkce nasazena na GitHub Pages, staging jako Docker kontejner přes Caddy.

## Požadavky

- Node.js ≥ 22.12.0
- pnpm

## Konfigurace

Zkopírujte `.env.example` jako `.env` a doplňte hodnoty:

```bash
cp .env.example .env
```

| Proměnná | Popis |
|---|---|
| `SITE_URL` | Veřejná URL webu (výchozí: `https://vedome-uzdraveni.cz`) |
| `PUBLIC_API_URL` | URL Go API backendu |
| `PUBLIC_API_KEY` | API klíč tenanta (viditelný v prohlížeči — viz poznámka níže) |

> ⚠️ `PUBLIC_API_KEY` je součástí vygenerovaného JS bundle a viditelný v prohlížeči. Ochrana před zneužitím je řešena rate limitingem na backendu.

## Příkazy

| Příkaz | Akce |
|---|---|
| `pnpm install` | Instalace závislostí |
| `pnpm dev` | Dev server na `http://localhost:4321` |
| `pnpm build` | Produkční build do `./dist/` |
| `pnpm preview` | Náhled buildu lokálně |
| `pnpm astro ...` | Astro CLI příkazy |

## Nasazení

### Produkce – GitHub Pages

Push na branch `main` spustí workflow `.github/workflows/deploy.yml`, který sestaví web a nasadí ho na GitHub Pages.

### Staging – Docker

Push na branch `staging` spustí `.github/workflows/docker-staging.yml`:

1. Sestaví Docker image (`busybox:musl` httpd) s proměnnými z GH environment `staging`
2. Pushne image na `ghcr.io`
3. Zavolá Portainer webhook → automatický deploy na `test.vedome-uzdraveni.cz`

Lokální spuštění staging obrazu:

```bash
docker compose -f docker-compose.staging.yml up
```

### GH Environments

| Environment | Branch | URL |
|---|---|---|
| `github-pages` | `main` | `https://vedome-uzdraveni.cz` |
| `staging` | `staging` | `https://test.vedome-uzdraveni.cz` |

Každé prostředí má vlastní `SITE_URL`, `PUBLIC_API_URL`, `PUBLIC_API_KEY` a `PORTAINER_WEBHOOK_URL`.
