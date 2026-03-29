# ---------- Production Stage: Static HTML with Nginx ----------
FROM nginx:1.25-alpine AS production

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy all HTML files from root directory
COPY *.html /usr/share/nginx/html/

# Copy assets directory
COPY assets/ /usr/share/nginx/html/assets/

# Create necessary directories for nginx runtime with proper permissions
# nginx needs write access to /var/cache/nginx, /var/log/nginx, and /var/run
RUN mkdir -p /var/cache/nginx /var/log/nginx /var/run && \
    chown -R nginx:nginx /var/cache/nginx /var/log/nginx /var/run /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Switch to non-root user
USER nginx

# Expose port 80
EXPOSE 80

# Health check using wget (available in alpine) or the /health endpoint
HEALTHCHECK --interval=10s --timeout=5s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:80/health || exit 1

# Start nginx in foreground
CMD ["nginx", "-g", "daemon off;"]

