FROM node:16-alpine as builder

# Define a pasta de trabalho dentro do container
WORKDIR /usr/src/app

# Copia o arquivo package.json e o package-lock.json para dentro do container
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install --force

# Copia o código fonte para dentro do container
COPY . .

# Compila o TypeScript
RUN npm ci && npm run build && npm prune --production



# Expor a porta que o aplicativo está ouvindo
EXPOSE 3000

# Define as variáveis de ambiente para conexão com o banco de dados
ENV DATABASE_URL=postgres://nodedeploy_server_user:135faO0enPAKSmstvSAdly0mFwknwW33@dpg-ch8fjqtgk4q7lmq4c8lg-a/nodedeploy_server

COPY --from=builder --chown=node:node /home/node/package*.json ./
COPY --from=builder --chown=node:node /home/node/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /home/node/dist/ ./dist/

# Executa o comando para iniciar o servidor
CMD [ "node", "dist/main.js" ]
