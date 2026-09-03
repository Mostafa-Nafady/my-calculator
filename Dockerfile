# ---------- Single-stage: nginx static file server ----------
# Pinned to nginx 1.27 on Alpine for a minimal, secure image (~7 MB).
FROM nginx:1.27-alpine

# Remove default nginx static assets and config
RUN rm -rf /usr/share/nginx/html/* /etc/nginx/conf.d/default.conf

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy all static site content into the nginx document root
COPY index.html \
     about.html \
     asd.html \
     cvxz.html \
     gallery.html \
     nnn.html \
     qwe.html \
     sdssa.html \
     /usr/share/nginx/html/

COPY assets/ /usr/share/nginx/html/assets/
COPY basics-10-function-refactoring/ /usr/share/nginx/html/basics-10-function-refactoring/
COPY uyt/ /usr/share/nginx/html/uyt/
COPY xpy/ /usr/share/nginx/html/xpy/

# Create runtime directories and adjust ownership for non-root execution
# nginx:alpine already ships with the 'nginx' user (UID 101)
# /run/ must be writable so nginx can create its PID file (/run/nginx.pid)
# /var/cache/nginx must be writable for temp paths, proxy cache, etc.
RUN mkdir -p /run /var/cache/nginx /var/log/nginx && \
    chown -R nginx:nginx /run /var/cache/nginx /var/log/nginx /usr/share/nginx/html /etc/nginx/conf.d

# Switch to non-root user
USER nginx

# Expose HTTP port
EXPOSE 80

# Health check — wget is available in Alpine BusyBox
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget -q --spider http://localhost:80/ || exit 1

# nginx is the default entrypoint in the base image
CMD ["nginx", "-g", "daemon off;"]


