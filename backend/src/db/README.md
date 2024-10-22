# Estructura del Script

## Creación de la Base de Datos

- Crea la base de datos `planificador_vuelos` si no existe.
- Selecciona la base de datos para futuras operaciones.

## Tablas Creadas

### Tabla `usuarios`
- **id**: Identificador único (AUTO_INCREMENT).
- **email**: Dirección de correo electrónico (único y no nulo).
- **username**: Nombre de usuario (único y no nulo).
- **password**: Contraseña del usuario (no nula).
- **nombre**: Nombre del usuario.
- **apellidos**: Apellidos del usuario.
- **avatar**: URL o ruta de la imagen del perfil.
- **es_administrador**: Indica si el usuario es administrador (por defecto, falso).
- **habilitado**: Estado de la cuenta (habilitada o no, por defecto, verdadero).
- **email_verificado**: Indica si el email ha sido verificado (por defecto, falso).
- **created_at**: Marca de tiempo de creación.
- **updated_at**: Marca de tiempo de la última actualización.

### Tabla `vuelos`
- **id**: Identificador único (AUTO_INCREMENT).
- **origen**: Ciudad de origen del vuelo (no nulo).
- **destino**: Ciudad de destino del vuelo (no nulo).
- **fecha_salida**: Fecha y hora de salida (no nulo).
- **fecha_llegada**: Fecha y hora de llegada (no nulo).
- **duracion**: Duración total del vuelo (no nulo).
- **numero_paradas**: Número de paradas en el vuelo (no nulo).
- **precio**: Costo del vuelo (no nulo).
- **created_at**: Marca de tiempo de creación.
- **updated_at**: Marca de tiempo de la última actualización.

### Tabla `favoritos`
- **id**: Identificador único (AUTO_INCREMENT).
- **usuario_id**: ID del usuario (referencia a la tabla `usuarios`).
- **vuelo_id**: ID del vuelo (referencia a la tabla `vuelos`).
- **nota**: Nota opcional sobre el vuelo.
- **fecha_guardado**: Fecha en que se guardó el favorito.
- **created_at**: Marca de tiempo de creación.
- **updated_at**: Marca de tiempo de la última actualización.

### Tabla `ratings`
- **id**: Identificador único (AUTO_INCREMENT).
- **usuario_id**: ID del usuario (referencia a la tabla `usuarios`).
- **vuelo_id**: ID del vuelo (referencia a la tabla `vuelos`).
- **rating**: Calificación del vuelo (entre 1 y 5).
- **comentario**: Comentario opcional sobre el vuelo.
- **created_at**: Marca de tiempo de creación.
- **updated_at**: Marca de tiempo de la última actualización.

### Tabla `tokens_recuperacion`
- **id**: Identificador único (AUTO_INCREMENT).
- **usuario_id**: ID del usuario (referencia a la tabla `usuarios`).
- **token**: Token único para la recuperación de cuentas.
- **expiracion**: Fecha y hora de expiración del token.

## Índices

Se añaden índices en la tabla `vuelos` para mejorar el rendimiento en:
- Precio
- Fecha de salida
- Número de paradas
