# ---------- Stage 1: Builder (for future build tooling support) ----------
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ---------- Stage 2: Production ----------
FROM nginx:1.27-alpine AS production

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy all static site content into nginx document root
COPY index.html about.html asd.html addop.html ASDSFSF.html /usr/share/nginx/html/
COPY assets/ /usr/share/nginx/html/assets/
COPY basics-10-function-refactoring/ /usr/share/nginx/html/basics-10-function-refactoring/
COPY uyt/ /usr/share/nginx/html/uyt/
COPY xpy/ /usr/share/nginx/html/xpy/

# Expose HTTP port
EXPOSE 80

# Health check — nginx:alpine ships with wget (not curl)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --spider -q http://localhost:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]

