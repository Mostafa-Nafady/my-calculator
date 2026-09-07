# ---------- Static website served by nginx ----------
# Pinned base image — never use :latest in production
FROM nginx:1.27-alpine

# Install curl for the healthcheck probe
RUN apk add --no-cache curl

# Copy custom nginx config (listens on 8080 for non-root operation)
COPY nginx.conf /etc/nginx/nginx.conf

# Copy all static site files into the nginx document root
# .dockerignore ensures only HTML/CSS/JS/assets are included
COPY . /usr/share/nginx/html/

# Run as the built-in non-root nginx user
USER nginx

# Expose the port nginx listens on (configured in nginx.conf)
EXPOSE 8080

# Healthcheck — curl the /health endpoint served by nginx
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/health || exit 1

