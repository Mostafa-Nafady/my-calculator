# ---------- Stage 1: Builder ----------
# Uses node:22-alpine for future npm dependency installation.
# Currently no dependencies exist (empty packages), but this stage
# is kept for extensibility.
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package manifests (no install needed — packages is empty)
COPY package*.json ./

# Copy all static source files
COPY . .

# ---------- Stage 2: Production ----------
# nginx:1.27-alpine serves the static HTML/CSS/JS files
FROM nginx:1.27-alpine AS production

ENV NODE_ENV=production

# Create a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy all static files from the builder stage
COPY --from=builder /app/ /usr/share/nginx/html/

# Set ownership so appuser can read the files
RUN chown -R appuser:appgroup /usr/share/nginx/html

# Switch to non-root user
USER appuser

# Expose non-privileged port 8080
EXPOSE 8080

# Health check using wget (available in nginx:alpine)
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/ || exit 1

# Start nginx in foreground
CMD ["nginx", "-g", "daemon off;"]

