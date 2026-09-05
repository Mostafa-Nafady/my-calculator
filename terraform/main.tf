terraform {
  required_version = ">= 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # ── Remote State Backend: S3 + DynamoDB ──────────────────────────
  # State is stored in an S3 bucket with DynamoDB-based locking for
  # team safety. The backend resources are provisioned in backend.tf.
  #
  # NOTE: Terraform backend blocks do NOT support variable interpolation.
  # The bucket name and table name below must match the defaults in
  # variables.tf. If you change them, update both places.
  backend "s3" {
    bucket         = "my-calculator-terraform-state"
    key            = "my-calculator/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "my-calculator-terraform-locks"
  }
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


