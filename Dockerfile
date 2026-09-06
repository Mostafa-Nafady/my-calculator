# ============================================
# Stage 1: Build Astro static site
# ============================================
FROM node:22-alpine AS build

WORKDIR /app

# Copy package manifest and lockfile for deterministic installs
COPY package.json package-lock.json ./

# Install dependencies (npm ci requires package-lock.json)
RUN npm ci

# Copy source code and Astro config
COPY . .

# Build the static site — output goes to /app/dist
RUN npm run build

# ============================================
# Stage 2: Serve with nginx
# ============================================
FROM nginx:1.27-alpine AS production

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built static assets from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Ensure nginx user owns the html directory and temp paths
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    mkdir -p /tmp/nginx && \
    chown -R nginx:nginx /tmp/nginx

# Switch to non-root user
USER nginx

# Expose port 8080
EXPOSE 8080

# Health check — wget is available in Alpine nginx image
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget -q -O /dev/null http://localhost:8080/ || exit 1

# Start nginx in foreground
CMD ["nginx", "-g", "daemon off;"]

