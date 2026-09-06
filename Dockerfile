# ---------- Stage 1: Production ----------
# Pinned nginx version — never use :latest
FROM nginx:1.27-alpine

# Install curl for HEALTHCHECK (alpine doesn't ship with it)
RUN apk add --no-cache curl

# Copy custom nginx config to support non-root execution and read-only filesystem
COPY nginx.conf /etc/nginx/nginx.conf

# Copy all static website files to nginx html directory
# Root HTML files
COPY index.html about.html apc.html asd.html cvxz.html nnn.html qwe.html sdssa.html /usr/share/nginx/html/

# Assets directory (CSS, JS)
COPY assets/ /usr/share/nginx/html/assets/

# Subdirectories with their own HTML and assets
COPY basics-10-function-refactoring/ /usr/share/nginx/html/basics-10-function-refactoring/
COPY uyt/ /usr/share/nginx/html/uyt/
COPY xpy/ /usr/share/nginx/html/xpy/

# Run as non-root user (nginx user exists in nginx:alpine image)
USER nginx

# Expose port 80
EXPOSE 80

# Health check using curl
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:80/ || exit 1

