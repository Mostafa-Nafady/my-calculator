# ---------- Dockerfile for my-calculator (static website) ----------
# Multi-stage build: builder stage stages static content for future asset
# processing; production stage serves via nginx on port 8080 (non-root).

# ---------- Stage 1: builder ----------
# Stages all static content into /app/build for potential future asset
# processing (minification, bundling, cache-busting, etc.).
FROM nginx:1.27-alpine AS builder

WORKDIR /app/build

# Copy HTML files explicitly
COPY index.html about.html addop.html asd.html ASDSFSF.html zzz.html ./

# Copy asset directories
COPY assets/ ./assets/
COPY basics-10-function-refactoring/ ./basics-10-function-refactoring/
COPY uyt/ ./uyt/
COPY xpy/ ./xpy/

# ---------- Stage 2: production (final) ----------
FROM nginx:1.27-alpine AS production

LABEL org.opencontainers.image.title="my-calculator" \
      org.opencontainers.image.description="Static web-based calculator served by nginx" \
      org.opencontainers.image.version="1.0.0" \
      org.opencontainers.image.authors="maintainer" \
      org.opencontainers.image.source="https://github.com/daytona/my-calculator"

# Copy custom nginx configuration (listens on 8080, runs as nginx user)
COPY nginx.conf /etc/nginx/nginx.conf

# Copy staged static content from builder into nginx document root
COPY --from=builder /app/build/ /usr/share/nginx/html/

# Ensure nginx user owns the document root and runtime directories
RUN chown -R nginx:nginx /usr/share/nginx/html /var/cache/nginx /var/log/nginx /etc/nginx

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --spider -q http://127.0.0.1:8080/ || exit 1

CMD ["nginx", "-g", "daemon off;"]







