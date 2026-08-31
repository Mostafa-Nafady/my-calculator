# ---------- Stage 1: Builder (placeholder for future build/lint steps) ----------
FROM node:20-alpine AS builder
WORKDIR /build
# Copy static files into builder stage for potential future processing
# (e.g., minification, linting, asset optimization)
COPY . .

# ---------- Stage 2: Runtime (nginx serving static files) ----------
FROM nginx:1.27-alpine AS production

# Install curl for HEALTHCHECK (Alpine does not include it by default)
RUN apk add --no-cache curl

# Copy all static HTML files and asset directories into nginx's default serve path
COPY --from=builder /build/ /usr/share/nginx/html/

# Ensure nginx user owns the served files
RUN chown -R nginx:nginx /usr/share/nginx/html

# Switch to non-root user for the master process
USER nginx

# Expose HTTP port
EXPOSE 80

# Health check — verifies nginx is responding on port 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

