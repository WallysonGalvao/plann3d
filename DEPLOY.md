# Plann3D - Deploy Guide

## 📦 Build para Produção

### Desenvolvimento

```bash
npm run dev:all      # Frontend (3000) + Backend (3001)
```

### Build de Produção

```bash
npm run build:full   # Gera dist/ com frontend
npm start            # Roda servidor em produção (porta 3001)
```

## 🚀 Deploy Options

### Opção 1: VPS/Servidor próprio (Railway, Render, DigitalOcean)

1. **Build local:**

   ```bash
   npm run build:full
   ```

2. **Estrutura de deploy:**

   ```
   seu-projeto/
   ├── dist/          # Build do frontend (gerado)
   ├── server.js      # Servidor Node.js
   ├── package.json   # Dependências
   └── .env          # Variáveis de ambiente
   ```

3. **No servidor:**

   ```bash
   npm install --production
   NODE_ENV=production node server.js
   ```

4. **Configurar variáveis de ambiente (.env):**
   ```
   EMAIL_USER=plan3ds@gmail.com
   EMAIL_PASS=sua_senha_de_app_gmail
   EMAIL_TO=plan3ds@gmail.com
   PORT=3001
   NODE_ENV=production
   ```

### Opção 2: Vercel (Frontend) + Backend separado

**Frontend (Vercel):**

```bash
vite build
vercel --prod
```

**Backend (Railway/Render):**

```bash
# Deploy apenas o server.js
git push railway main
```

Atualizar URL da API no código:

```typescript
const apiUrl = 'https://seu-backend.railway.app/api/contact'
```

### Opção 3: Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm install --production

# Copy application files
COPY dist ./dist
COPY server.js ./
COPY .env ./

EXPOSE 3001
ENV NODE_ENV=production

CMD ["node", "server.js"]
```

**Build e run:**

```bash
docker build -t plann3d .
docker run -p 3001:3001 --env-file .env plann3d
```

## ⚙️ Configuração Gmail para Produção

1. Acesse [Google Account Security](https://myaccount.google.com/security)
2. Ative **Verificação em 2 etapas**
3. Vá em **Senhas de app**
4. Gere uma senha para "Mail"
5. Use essa senha no `.env`:
   ```
   EMAIL_PASS=xxxx xxxx xxxx xxxx
   ```

## 📝 Checklist de Deploy

- [ ] `.env` configurado com senha de app do Gmail
- [ ] `npm run build:full` executado com sucesso
- [ ] Variáveis de ambiente configuradas no servidor
- [ ] Porta 3001 aberta (ou configurar `PORT` no .env)
- [ ] SSL/HTTPS configurado (Nginx, Caddy ou CloudFlare)
- [ ] Testar endpoint: `https://seu-dominio.com/api/health`

## 🔒 Segurança em Produção

- ✅ Nunca commite o arquivo `.env`
- ✅ Use senha de app do Gmail, não a senha principal
- ✅ Configure CORS apenas para seu domínio em produção
- ✅ Ative rate limiting (ex: express-rate-limit)
- ✅ Use HTTPS sempre

## 🐛 Debug em Produção

Verificar logs:

```bash
# Ver último erro
tail -f logs/app.log

# Testar API manualmente
curl -X POST https://seu-dominio.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","projectType":"test","details":"test"}'
```
