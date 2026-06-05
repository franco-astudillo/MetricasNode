# 1. Usar una imagen oficial de Node.js (versión 18 con Alpine, que es súper ligera)
FROM node:18-alpine

# 2. Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# 3. Copiar los archivos de definición de dependencias (package.json y package-lock.json)
COPY package*.json ./

# 4. Instalar las dependencias usando npm
RUN npm install

# 5. Copiar todo el resto del código fuente (la carpeta src) al contenedor
COPY . .

# 6. Exponer el puerto por el que se comunicará el microservicio
EXPOSE 8082

# 7. Comando por defecto para arrancar la aplicación
CMD ["npm", "start"]