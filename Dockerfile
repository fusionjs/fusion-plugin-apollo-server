FROM uber/web-base-image:1.0.5

WORKDIR /fusion-plugin-apollo-server

COPY . .

RUN yarn

RUN yarn --ignore-scripts run build-test
