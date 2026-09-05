# ------------------------------------------------------------------------------
# Outputs
# ------------------------------------------------------------------------------

output "s3_bucket_name" {
  description = "Name of the S3 bucket hosting the static site."
  value       = aws_s3_bucket.this.id
}

output "s3_bucket_arn" {
  description = "ARN of the S3 bucket hosting the static site."
  value       = aws_s3_bucket.this.arn
}

output "cloudfront_distribution_id" {
  description = "ID of the CloudFront distribution."
  value       = aws_cloudfront_distribution.this.id
}

output "cloudfront_domain_name" {
  description = "Default domain name of the CloudFront distribution (e.g. d12345abcdef.cloudfront.net)."
  value       = aws_cloudfront_distribution.this.domain_name
}

output "website_url" {
  description = "Full HTTPS URL of the deployed website."
  value       = "https://${aws_cloudfront_distribution.this.domain_name}"
}

