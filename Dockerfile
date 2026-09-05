# ---------- Single-stage: nginx serves static files ----------
FROM nginx:1.27-alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy all static site files (HTML pages + subdirectories) into nginx document root
COPY index.html about.html asd.html addop.html asx.html ASDSFSF.html aaa.html /usr/share/nginx/html/
COPY assets/ /usr/share/nginx/html/assets/
COPY basics-10-function-refactoring/ /usr/share/nginx/html/basics-10-function-refactoring/
COPY uyt/ /usr/share/nginx/html/uyt/
COPY xpy/ /usr/share/nginx/html/xpy/

# Ensure nginx user owns the document root
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d

# Switch to non-root user (nginx user is built into nginx:alpine)
USER nginx

EXPOSE 80

# Healthcheck using wget (Alpine ships with BusyBox wget, not curl)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget -q -O /dev/null http://localhost:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]

