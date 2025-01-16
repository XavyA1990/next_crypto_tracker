# Next Crypto Tracker — Trabajo de titulación

¡Bienvenido(a) a la aplicación **Next Crypto Tracker**! Este proyecto forma parte de mi tesis de maestría y tiene como objetivo mostrar cómo crear una plataforma de seguimiento de criptomonedas utilizando **Next.js**, **Supabase**, **Tailwind CSS** y otras herramientas de vanguardia.  

A continuación, encontrarás toda la información necesaria para comprender, configurar y ejecutar este proyecto.

---

## Tabla de Contenidos
1. [Descripción General](#descripción-general)  
2. [Requisitos Previos](#requisitos-previos)  
3. [Instalación](#instalación)  
4. [Configuración](#configuración)  
5. [Scripts Disponibles](#scripts-disponibles)  
6. [Uso de Docker con LibreTranslate](#uso-de-docker-con-libretranslate)  
7. [Licencia](#licencia)  

---

## Descripción General
**Next Crypto Tracker** es una aplicación de ejemplo para la visualización y monitoreo de datos sobre criptomonedas, aprovechando diferentes APIs, gráficos interactivos e integración con servicios en la nube. Además, se incorpora un sistema de traducción automatizado a través de **LibreTranslate** para soportar español e ingles, pero es adaptable para soportar mas idiomas.

El proyecto se ha desarrollado con fines académicos como parte de mi **trabajo de titulación**, demostrando el uso de las siguientes tecnologías principales:
- **[Next.js](https://nextjs.org/)**  
- **[React](https://reactjs.org/)**  
- **[Supabase](https://supabase.com/)**  
- **[Tailwind CSS](https://tailwindcss.com/)**  
- **[Lightweight Charts](https://github.com/tradingview/lightweight-charts)**  
- **[LibreTranslate](https://github.com/LibreTranslate/LibreTranslate)** (contenedor Docker)  

---

## Requisitos Previos
Asegúrate de tener instaladas las siguientes herramientas en tu entorno de desarrollo:
1. **Node.js** (versión 16 o superior)  
2. **npm** (versión 8 o superior)  
3. **Docker** (para correr LibreTranslate)  

---

## Instalación
1. **Clona este repositorio** en tu máquina local:
   ```bash
   git clone https://github.com/XavyA1990/next_crypto_tracker.git
   ```
2. **Instala las dependencias**:
   ```bash
   cd next_crypto_tracker
   npm install
   ```

---

## Configuración
El proyecto hace uso de variables de entorno para conectarse a los servicios de Supabase, APIs externas y OpenAI.  
Debes definirlas en un archivo llamado **`.env.local`** en la raíz del proyecto:

```bash
SUPABASE_ANON_KEY=TU_SUPABASE_ANON_KEY
SUPABASE_URL=TU_SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY=TU_SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_BASE_URL=TU_URL_PUBLICA

CRYPTO_NEWS_API_KEY=TU_CRYPTO_NEWS_API_KEY
CMC_API_KEY=TU_CMC_API_KEY

OPENAI_API_KEY=TU_OPENAI_API_KEY
```

> **Nota**: Asegúrate de **nunca** exponer tus llaves privadas en repositorios públicos. El archivo `.env.local` está incluido en `.gitignore` para mantener tus credenciales seguras.

---

## Scripts Disponibles
En el archivo `package.json` se encuentran los siguientes _scripts_ útiles:

- **`npm run dev`**  
  Inicia la aplicación en modo desarrollo (hot-reloading, errores detallados, etc.).
  
- **`npm run build`**  
  Compila la aplicación para producción optimizada.
  
- **`npm run start`**  
  Inicia el servidor Next.js con la versión compilada.
  
- **`npm run lint`**  
  Ejecuta _linter_ para mantener un estilo de código consistente y detectar posibles errores.

---

## Uso de Docker con LibreTranslate
Este proyecto utiliza la imagen de Docker de **LibreTranslate** en el puerto **5000**. Para levantar el servicio de traducción:

1. Asegúrate de tener instalado Docker en tu máquina.  
2. Ejecuta el siguiente comando en tu terminal para iniciar el contenedor de LibreTranslate:
   ```bash
   docker run -it -p 5000:5000 libretranslate/libretranslate
   ```
3. Verifica que el servicio está corriendo en la dirección [http://localhost:5000](http://localhost:5000).  

La aplicación Next Crypto Tracker se conecta a este servicio para realizar traducciones en tiempo real.

## Licencia
Este proyecto se publica con fines académicos y de investigación. Para cualquier uso adicional, revisa los términos de los frameworks y librerías utilizadas.

---

¡Gracias por tu interés en **Next Crypto Tracker**!
