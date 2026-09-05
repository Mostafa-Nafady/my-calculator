# ---------- Single-stage: nginx serving static files ----------
# No build step required — HTML/CSS/JS files are served as-is.
FROM nginx:1.27-alpine

# Labels for image metadata and traceability
LABEL maintainer="daytona"
LABEL org.opencontainers.image.title="my-calculator"
LABEL org.opencontainers.image.source="https://github.com/daytona/my-calculator"

# Install wget for HEALTHCHECK (alpine images do not include it by default)
RUN apk add --no-cache wget

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy all static site content into the nginx document root
COPY index.html about.html aqe.html arq.html asd-new.html asd.html asdd.html aswd.html cvxz.html nnn.html sdssa.html /usr/share/nginx/html/
COPY assets/ /usr/share/nginx/html/assets/
COPY basics-10-function-refactoring/ /usr/share/nginx/html/basics-10-function-refactoring/
COPY uyt/ /usr/share/nginx/html/uyt/
COPY xpy/ /usr/share/nginx/html/xpy/

# The nginx:1.27-alpine image runs the master process as root (to bind port 80)
# but spawns worker processes as the 'nginx' user (UID 101) by default.
# This is the standard, secure configuration for nginx in Docker.
# We explicitly set the user for clarity and to enforce non-root worker execution.
USER nginx

EXPOSE 80

# Health check using wget (installed above) — spider mode checks HTTP status without downloading body
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1

