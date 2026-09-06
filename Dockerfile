# ---------- Dockerfile for my-calculator (static website) ----------
# Serves static HTML/CSS/JS files via nginx on a non-privileged port (8080).

FROM nginx:1.27-alpine

LABEL org.opencontainers.image.title="my-calculator" \
      org.opencontainers.image.description="Static web-based calculator served by nginx" \
      org.opencontainers.image.version="1.0.0" \
      org.opencontainers.image.authors="maintainer" \
      org.opencontainers.image.source="https://github.com/daytona/my-calculator"

# Copy custom nginx configuration (listens on 8080, runs as nginx user)
COPY nginx.conf /etc/nginx/nginx.conf

# Copy all static site content into nginx document root
COPY index.html about.html addop.html asd.html ASDSFSF.html zzz.html /usr/share/nginx/html/
COPY assets/ /usr/share/nginx/html/assets/
COPY basics-10-function-refactoring/ /usr/share/nginx/html/basics-10-function-refactoring/
COPY uyt/ /usr/share/nginx/html/uyt/
COPY xpy/ /usr/share/nginx/html/xpy/

# Ensure nginx user owns the document root and log directories
RUN chown -R nginx:nginx /usr/share/nginx/html /var/cache/nginx /var/log/nginx /etc/nginx

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --spider -q http://localhost:8080/ || exit 1

USER nginx

CMD ["nginx", "-g", "daemon off;"]


