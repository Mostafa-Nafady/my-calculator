terraform {
  required_version = ">= 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # Backend: local (suitable for single-developer or prototyping)
  # For team environments, switch to a remote backend (S3 + DynamoDB lock)
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = "my-calculator"
      Environment = var.environment
      ManagedBy   = "terraform"
    }
  }
}

