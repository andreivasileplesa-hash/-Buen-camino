# Buen Camino

Aplicación web pública para el tramo Sarria–Santiago. Incluye etapas, reflexiones y lecturas por fecha, con un modo de edición privado por enlace y un modo público de solo lectura.

## Publicación en GitHub Pages

El flujo de GitHub Actions de `.github/workflows/pages.yml` publica la carpeta raíz cuando hay cambios en `main`. En GitHub, abre **Settings → Pages** y selecciona **GitHub Actions**.

## Guardado compartido (Supabase)

GitHub Pages publica archivos estáticos; para compartir cambios entre visitantes hace falta una base de datos.

1. Crea un proyecto en Supabase y ejecuta `supabase.sql` en **SQL Editor**. Antes, establece `secret_hash` con el SHA-256 hexadecimal de una clave aleatoria que usarás solo en el enlace de edición. No publiques el enlace de edición.
2. Copia la **Project URL** y la **anon/public key** de Supabase a `config.js`. La clave anon está pensada para usarse desde la web; las reglas de `supabase.sql` limitan la escritura a la función protegida.
3. Sube los cambios a GitHub. La página pública es de solo lectura. El enlace de edición añade `#editar=CLAVE_ALEATORIA`; esa clave debe corresponder al hash guardado en Supabase.

Los textos y reflexiones se guardan en Supabase y se muestran a todos los visitantes. No uses la `service_role` key en `config.js` ni la incluyas en la web.
