FROM node:14

# Define a pasta de trabalho dentro do container
WORKDIR /usr/src/app

# Copia o arquivo package.json e o package-lock.json para dentro do container
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o código fonte para dentro do container
COPY . .

# Compila o TypeScript
RUN npm run build


# Expor a porta que o aplicativo está ouvindo
EXPOSE 3000

# Define as variáveis de ambiente para conexão com o banco de dados
ENV DATABASE_URL postgres://nodedeploy_server_user:135faO0enPAKSmstvSAdly0mFwknwW33@dpg-ch8fjqtgk4q7lmq4c8lg-a/nodedeploy_server

# Executa o comando para iniciar o servidor
CMD [ "npm", "run", "start:prod" ]
