# ---------- Static HTML Website — nginx ----------
# Single-stage build: no compilation step needed for static files.

FROM nginx:1.27-alpine

# OCI image labels
LABEL org.opencontainers.image.title="my-calculator" \
      org.opencontainers.image.description="Static HTML calculator portfolio website served by nginx" \
      org.opencontainers.image.source="https://github.com/daytona/my-calculator" \
      org.opencontainers.image.licenses="MIT"

# Install curl for HEALTHCHECK (Alpine does not ship it by default)
RUN apk add --no-cache curl

# Copy all static site content into the nginx document root.
# The .dockerignore file ensures .env, .git, node_modules, etc. are excluded
# from the build context, so a broad COPY is safe and keeps the layer small.
COPY . /usr/share/nginx/html/

# Ensure the nginx user (UID 101, built into nginx:alpine) owns the served files
# and the directories nginx needs to write to at runtime.
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    mkdir -p /var/cache/nginx /var/run /tmp && \
    chown -R nginx:nginx /var/cache/nginx /var/run /tmp

# Run nginx as the non-root 'nginx' user (UID 101, pre-created in the base image)
USER nginx

EXPOSE 80

# Health check — curl is available because we installed it above.
# nginx listens on port 80 inside the container.
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD curl -fsS http://localhost:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]

