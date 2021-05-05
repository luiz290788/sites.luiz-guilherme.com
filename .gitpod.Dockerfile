FROM gitpod/workspace-full

RUN apt-get install fish && \
  curl -L https://get.oh-my.fish | fish

RUN npm i -g npm