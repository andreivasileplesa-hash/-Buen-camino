# Buen Camino

Aplicación web estática e instalable para el tramo Sarria–Santiago. Incluye cinco etapas con reflexiones editables y un editor de lecturas por fecha.

## Publicar en GitHub Pages

1. Crea un repositorio público en GitHub y sube el contenido de esta carpeta a la rama `main`.
2. En el repositorio, abre **Settings → Pages** y selecciona **GitHub Actions** en «Build and deployment».
3. Al terminar el flujo de publicación, GitHub muestra el enlace público en **Settings → Pages**. Los siguientes cambios en `main` se publicarán automáticamente.

GitHub Pages sirve la aplicación, pero no sincroniza los cambios que cada persona guarda en su navegador. Para que el enlace de edición cambie los mismos contenidos que ven todas las personas, falta conectar una base de datos compartida y proteger el acceso de edición. Sin esa conexión, un enlace «editor» solo podría cambiar el contenido local del navegador.
