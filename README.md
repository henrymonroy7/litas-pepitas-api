<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Litas Pepitas API

1. Clonar proyecto
2. `yarn install`
3. Clonar el archivo `.env.template` y renombrarlo a `.env`
4. Cambiar las variables de entorno
5. Levantar la base de datos

```
docker-compose up -d
```

6. leer archivos de configuracion

```
yarn add @nestjs/config
```

## Conectar Nest con postgress

7. instalar typeorm con postgress

```
yarn add @nestjs/typeorm typeorm pg
```

8. Levantar: `yarn start:dev`
