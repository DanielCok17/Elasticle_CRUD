# 📝 Webová aplikace s CRUD funkcemi a autentizací

Tento projekt implementuje webovou aplikaci pre správu užívateľských profilov (CRUD operace: Create, Read, Update, Delete) s autentifikáciou a autorizací. 

## 🚀 Funkcionalita

### Správa profilů uživatelů:
- **Jméno**
- **Příjmení**
- **Datum narození**
- **Fotografie**
- **Rich Text** (bohatý textový editor pro detailní popis profilu)

### Autentizace a autorizace:
- Registrace nových uživatelů.
- Přihlášení uživatelů s ověřením přístupu pomocí JWT tokenů.
- Ochrana API a stránek pomocí middleware.
- Každý přihlášený uživatel má plný CRUD přístup k profilům.

---

## 🛠 Technologie

### Frontend:
- **Next.js**: Framework pro React.js s podporou server-side rendering (SSR) a API routes.
- **Tailwind CSS**: Styling framework pro rychlé a efektivní návrhy uživatelského rozhraní.

### Backend:
- **Prisma ORM**: Na správu a manipulaci s daty v MySQL databázi.
- **JWT (JSON Web Token)**: Stateless autentifikace uživatelů.

### Další knihovny a nástroje:
- **bcrypt.js**: Hashování hesel pro bezpečnost.
- **react-hook-form**: Pro jednoduchou validaci formulářů.
- **react-quill**: Rich Text editor.
- **multer**: Na nahrávání souborů (např. fotografie).

---

## 📚 Návod k instalaci a spuštění

### 1. Klonování repozitáře
```bash
git [clone <URL_REPOZITÁŘE>](https://github.com/DanielCok17/Elasticle_CRUD)
cd Elasticle_CRUD
```

### 2. Instalace závislostí
```bash
npm install
```

### 3. Konfigurace prostředí
Vytvořte soubor .env v kořenovém adresáři a nastavte následující proměnné prostředí:

.env
DATABASE_URL=mysql://<username>:<password>@<host>:<port>/<database>
ACCESS_TOKEN_SECRET=<tajny_klic_pro_access_token>
REFRESH_TOKEN_SECRET=<tajny_klic_pro_refresh_token>


### 4. Inicializace databáze
```bash
    npx prisma migrate dev --name init
```

### 5. Spuštění aplikace
```bash
npm run dev
```

---


