# especificar la version de node que vamos a usar
FROM node:18

# crear carpeta dentro del contenedor
WORKDIR /myapp

# copiar el archivo package.json en esa carpeta
COPY package.json .

# ejecutar el comando npm install para descargar las dependencias de node
RUN npm install

# copiar todos los archivos del proyecto en el contenedor
COPY . .

# ejecutar el comando para iniciar el proyecto
CMD ["node", "app.js"]