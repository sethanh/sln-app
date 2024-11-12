# BUILD IMAGE
FROM node:18 as builder
WORKDIR /source

ARG ENVIRONMENT
ARG APP

# Install dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn --frozen-lockfile

# Copy source
COPY . .

# Install monorepo dependencies
RUN yarn

# log env
RUN echo "ENVIRONMENT: ${ENVIRONMENT}"
RUN echo "APP: ${APP}"

# Build app
# COPY apps/${APP}/.env.${ENVIRONMENT} apps/${APP}/.env
RUN yarn ${APP}/build

# RUNTIME IMAGE
FROM nginx:alpine as runtime
WORKDIR /app
ARG APP
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /source/apps/${APP}/dist /var/www
ENTRYPOINT ["nginx", "-g", "daemon off;"]