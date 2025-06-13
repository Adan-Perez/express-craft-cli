# Guía de Contribución

¡Gracias por tu interés en contribuir a Express Craft CLI! 🚀

## ¿Cómo Contribuir?

### Reportar Errores

- Busca issues similares antes de crear uno nuevo
- Incluye detalles específicos y pasos para reproducir

### Sugerir Mejoras

- Explica el problema que resuelve
- Describe la solución propuesta

### Pull Requests

1. Fork el repositorio
2. Crea tu rama: `git checkout -b feature/nueva-caracteristica`
3. Commit: `git commit -am 'Descripción del cambio'`
4. Push: `git push origin feature/nueva-caracteristica`
5. Abre un Pull Request

## Setup de Desarrollo

### Requisitos

- Node.js >= 22.0.0
- Git

### Instalación

```bash
git clone https://github.com/Adan-Perez/express-craft-cli.git
cd express-craft-cli
npm install
npm link
express-craft --version  # Verificar
```

### Comandos

```bash
npm run dev      # Desarrollo
npm test         # Pruebas básicas
npm run test:full # Pruebas completas
```

## Estilo de Código

- ES Modules (`import/export`)
- Async/await sobre Promises
- JSDoc para funciones públicas
- camelCase para variables

## FAQ

**¿Debo actualizar documentación?**  
Sí, si cambias funcionalidad o CLI options.

**¿Cómo agrego dependencias?**  
`npm install nueva-dependencia` y documenta el propósito.

---

¡Gracias por contribuir! 🎉
