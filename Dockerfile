# Utiliza uma imagem base do Node.js
FROM node:14

# Define o diretório de trabalho no container
WORKDIR /app

# Copia todos os arquivos do projeto para o container
COPY . .

# Instala o http-server globalmente para servir a aplicação
RUN npm install -g http-server

# Expõe a porta 8080
EXPOSE 8080

# Comando para iniciar o servidor
CMD ["http-server", "-p", "8080"]
