FROM node:8

ENV APP_HOME /forum-webapp
WORKDIR $APP_HOME

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin
ENV HISTFILE $APP_HOME/tmp/docker_histfile
ENV LANG C.UTF-8

ADD .bashrc /root/.bashrc
ADD . $APP_HOME

RUN yarn install

EXPOSE 4000
EXPOSE 35729

ENTRYPOINT ["/bin/bash", "/forum-webapp/scripts/start"]
CMD ["start"]
