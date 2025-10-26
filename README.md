# Podcaster

Aplicación web para explorar y escuchar los 100 podcasts musicales más populares de Apple Podcasts.

## Inicio rápido

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build de producción
npm run build

# Preview de producción
npm run preview

# Tests
npm test              # Ejecutar todos los tests
npm run test:watch    # Modo watch
npm run test:ui       # UI interactiva

# Linting y formato
npm run lint          # Verificar código
npm run lint:fix      # Corregir automáticamente
npm run prettier      # Formatear código
```

## Arquitectura

### Estructura del proyecto

```
src/
├── core/              # Lógica de negocio (independiente de UI)
│   ├── podcasts/      # Dominio de podcasts
│   │   ├── itunes-service.ts      # Casos de uso
│   │   ├── itunes-repository.ts   # Acceso a datos
│   │   └── models/                # Modelos de datos
│   └── common/        # Utilidades comunes
└── ui/                # Capa de presentación
    ├── common/        # Componentes y utilidades compartidas
    │   ├── components/
    │   ├── router/
    │   └── util/
    └── podcasts/      # Módulo de podcasts UI
        ├── views/     # Páginas principales
        ├── components/
        └── hooks/     # Custom hooks
```

### Decisiones técnicas

**Clean Architecture por capas**: Separación clara entre lógica de negocio (`core`) y presentación (`ui`), facilitando el testing y mantenimiento.

**Repository Pattern**: Abstracción del acceso a datos en la capa `core`, permitiendo cambiar la fuente de datos sin afectar la UI.

**Custom Hooks**: Encapsulación de lógica de UI reutilizable (ej: `usePopularPodcasts`, `usePodcastSearch`).

**TanStack Query**: Gestión de estado asíncrono, caché automático de 24 horas (según requisitos), y sincronización con localStorage para persistencia.

**CSS Modules**: Estilos encapsulados por componente, evitando colisiones de nombres.

**TypeScript**: Tipado estático para prevenir errores y mejorar la experiencia de desarrollo.

**Sin estado global explícito**: No existe un estado global explícito (`React Context` / `Zustand` / `Redux`). En su lugar se ha aprovechado el caché que ya tenemos de `React Query` para obtener los datos entre vistas, así como sus utilidades (como `useIsFetching` para saber si se están cargado datos) para conocer estados concretos. Esto es, de cara a mantener la aplicación lo más simple posible.

## Enrutamiento y navegación

La aplicación utiliza **React Router v7** con las siguientes rutas:

- `/` - Vista principal con listado de podcasts
- `/podcast/:podcastId` - Detalle de un podcast
- `/podcast/:podcastId/episode/:episodeId` - Detalle de un episodio

**Características**:

- Lazy loading de rutas para optimizar el bundle inicial.
- Indicador de carga en la cabecera durante navegación.
- No habrá cambio de vista hasta obtener los datos necesarios. Mientras tanto se mostrará el indicador de carga.
- Persistencia de datos entre navegaciones (caché).

## Patrones de diseño implementados

### 1. Repository Pattern

Abstracción del acceso a datos externos (iTunes API) en `ItunesRepository`, separando la lógica de obtención de datos de su uso.

### 2. Service Layer

Capa de servicios (`itunes-service.ts`) que orquesta llamadas al repositorio, permitiendo agregar lógica de negocio adicional.

### 3. Custom Hooks Pattern

Hooks reutilizables que encapsulan lógica compleja:

- `usePopularPodcasts` - Obtiene y cachea el listado
- `usePodcastDetails` - Obtiene detalles del podcast
- `usePodcastSearch` - Implementa búsqueda con debouncing
- `useEpisodeDetails` - Extrae datos del episodio del caché

### 4. Compound Components

Componentes como `PodcastDetailsContainer` que componen elementos relacionados manteniendo cohesión.

### 5. Container/Presentational Pattern

Separación entre componentes con lógica (containers) y componentes de presentación puros.

## Testing

**Framework**: Vitest + Testing Library

**Cobertura**:

- Tests unitarios de servicios y repositorios
- Tests de componentes
- Tests de custom hooks
- Tests de utilidades

Se mantiene siempre una cobertura superior al 80%.

Los tests verifican comportamiento, no implementación, facilitando refactorización sin romper tests.

## Características destacadas

- **Caché persistente**: Los datos se almacenan 24 horas.
- **Búsqueda en tiempo real**: Filtrado instantáneo por título y autor.
- **Code splitting**: Las rutas se cargan bajo demanda.
- **Sanitización HTML**: Las descripciones de episodios se sanitizan con `DOMPurify`.
- **Estados de carga**: Skeletons y spinners durante la carga de datos.
- **Sin gestión de errores UI**: Los errores se muestran solo en consola.

## Variables de entorno

Para este caso particular, se decidió incluir el fichero .env en el repositorio, el cual contiene:

- `VITE_API_URL`: Url base del API de iTunes usado durante la prueba.
- `VITE_CORS_PROXY_URL`: Servicio proxy para hacer bypass a problemas de CORS con las peticiones al API.

Se decidió dejar el fichero ya que no contiene ningún dato sensible, siendo de esta manera más cómoda la revisión de la solución. Sin embargo, habría que destacar que **_es buena práctica no incluir este fichero en el repositorio git y en su lugar crear un .env.example con las claves de las variable, no sus valores_**

## Tecnologías principales

- React 19 + TypeScript
- Vite - Build tool y dev server
- React Router v7 - Enrutamiento
- TanStack Query - Estado asíncrono y caché
- Vitest - Testing framework
- CSS Modules - Estilos
