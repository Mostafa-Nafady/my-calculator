# ---------- Static HTML Website — nginx ----------
# Single-stage build: no compilation step needed for static files.
# Base image pinned to a specific version — never use :latest in production.

FROM nginx:1.27-alpine

# OCI standard image labels for registry metadata
LABEL org.opencontainers.image.title="my-calculator" \
      org.opencontainers.image.description="Static HTML calculator portfolio website served by nginx" \
      org.opencontainers.image.source="https://github.com/daytona/my-calculator" \
      org.opencontainers.image.licenses="MIT" \
      org.opencontainers.image.version="1.0.0"

# Install curl for HEALTHCHECK (Alpine does not ship curl by default).
# --no-cache keeps the layer small by not storing the apk index.
RUN apk add --no-cache curl

# Copy all static site content into the nginx document root.
# The .dockerignore file ensures .env, .git, node_modules, package-lock.json,
# Dockerfile, docker-compose.yml, *.md, and .github/ are excluded from the
# build context, so a broad COPY is safe and keeps the layer minimal.
# This captures: index.html, about.html, asd.html, aswd.html, ccx.html,
# cvxz.html, nnn.html, sdssa.html, basics-10-function-refactoring/,
# tyo/, uyt/, xpy/, and assets/ (styles + scripts + components).
COPY . /usr/share/nginx/html/

# Ensure the non-root 'nginx' user (UID 101, pre-created in nginx:alpine)
# owns the served files and the writable runtime directories.
# These directories are also mounted as tmpfs in docker-compose.yml for
# read-only root filesystem support.
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    mkdir -p /var/cache/nginx /var/run /tmp && \
    chown -R nginx:nginx /var/cache/nginx /var/run /tmp

# Run as the non-root 'nginx' user (UID 101, built into the base image)
USER nginx

# nginx listens on port 80 inside the container
EXPOSE 80

# Health check — curl is available because we installed it above.
# Checks the root URL; nginx serves index.html at /.
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD curl -fsS http://localhost:80/ || exit 1

# Start nginx in the foreground (daemon off) so the container stays alive
CMD ["nginx", "-g", "daemon off;"]


