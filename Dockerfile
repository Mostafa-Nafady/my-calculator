# Stage 1: Build stage (for future extensibility)
FROM nginx:alpine AS builder

# Install curl for healthcheck
RUN apk add --no-cache curl

# Stage 2: Production stage
FROM nginx:alpine

# Copy static files to nginx html directory
COPY --from=builder /usr/bin/curl /usr/bin/curl

# Copy all HTML files from root
COPY *.html /usr/share/nginx/html/

# Copy subdirectories
COPY aqrt /usr/share/nginx/html/aqrt
COPY azx /usr/share/nginx/html/azx
COPY xpy /usr/share/nginx/html/xpy
COPY uyt /usr/share/nginx/html/uyt
COPY basics-10-function-refactoring /usr/share/nginx/html/basics-10-function-refactoring
COPY assets /usr/share/nginx/html/assets

# Expose port 80
EXPOSE 80

# Healthcheck configuration
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:80/ || exit 1

# Run as non-root user (nginx user has UID 101 on alpine)
USER nginx

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

