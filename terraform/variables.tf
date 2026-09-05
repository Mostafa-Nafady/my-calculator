# ------------------------------------------------------------------------------
# Input Variables
# ------------------------------------------------------------------------------

variable "bucket_name" {
  description = "Globally unique name for the S3 bucket that stores the static site files."
  type        = string
  default     = "my-calculator-site"
}

variable "aws_region" {
  description = "AWS region in which to create all resources."
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Deployment environment name (e.g. production, staging, dev). Used in tags."
  type        = string
  default     = "production"

  validation {
    condition     = contains(["production", "staging", "dev"], var.environment)
    error_message = "environment must be one of: production, staging, dev."
  }
}

variable "domain_name" {
  description = "Optional custom domain name (e.g. www.example.com). Leave empty to use the default CloudFront domain (*.cloudfront.net)."
  type        = string
  default     = ""
}

variable "tags" {
  description = "Additional tags to merge with the default tags on all resources."
  type        = map(string)
  default     = {}
}

variable "terraform_state_bucket" {
  description = "Name of the S3 bucket for Terraform remote state storage. Must match the backend configuration in main.tf."
  type        = string
  default     = "my-calculator-terraform-state"
}

variable "terraform_locks_table" {
  description = "Name of the DynamoDB table for Terraform state locking. Must match the backend configuration in main.tf."
  type        = string
  default     = "my-calculator-terraform-locks"
}


