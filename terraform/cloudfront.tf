# Note: required_version and required_providers are declared in main.tf.
# Per-file terraform blocks are omitted to avoid duplicate declaration warnings.

# ------------------------------------------------------------------------------
# CloudFront Distribution — HTTPS edge for the S3 static site
# ------------------------------------------------------------------------------

# Origin Access Control (OAC) — modern replacement for Origin Access Identity (OAI)
resource "aws_cloudfront_origin_access_control" "this" {
  name                              = "OAC-${var.bucket_name}"
  description                       = "Origin Access Control for ${var.bucket_name} S3 bucket"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "this" {
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  price_class         = "PriceClass_100"
  comment             = "CloudFront distribution for ${var.bucket_name}"

  # ---- S3 Origin ----
  origin {
    domain_name              = aws_s3_bucket.this.bucket_regional_domain_name
    origin_id                = "S3-${aws_s3_bucket.this.id}"
    origin_access_control_id = aws_cloudfront_origin_access_control.this.id
  }

  # ---- Default Cache Behavior ----
  default_cache_behavior {
    target_origin_id       = "S3-${aws_s3_bucket.this.id}"
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    trusted_signers        = []

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    min_ttl     = 0
    default_ttl = 3600
    max_ttl     = 86400
  }

  # ---- Custom Error Response: 403 → serve index.html (SPA-like fallback) ----
  custom_error_response {
    error_code            = 403
    response_code         = 200
    response_page_path    = "/index.html"
    error_caching_min_ttl = 30
  }

  # ---- Viewer Certificate (default CloudFront cert / *.cloudfront.net) ----
  viewer_certificate {
    cloudfront_default_certificate = true
  }

  # ---- Geo Restriction ----
  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  tags = merge(var.tags, {
    Name = "cf-${var.bucket_name}"
  })

  # Ensure the OAC exists before the distribution references it
  depends_on = [aws_cloudfront_origin_access_control.this]
}


