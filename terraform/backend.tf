# ------------------------------------------------------------------------------
# Terraform State Backend — S3 bucket + DynamoDB lock table
# These resources must exist before `terraform init` can configure the
# remote backend. Run `terraform init -backend=false` first to provision
# them, then run `terraform init` to migrate to the remote backend.
# ------------------------------------------------------------------------------

# S3 bucket for Terraform state storage
resource "aws_s3_bucket" "terraform_state" {
  bucket = var.terraform_state_bucket

  tags = merge(var.tags, {
    Name    = var.terraform_state_bucket
    Purpose = "Terraform remote state storage"
  })
}

# Enable versioning on the state bucket for state file history and rollback
resource "aws_s3_bucket_versioning" "terraform_state" {
  bucket = aws_s3_bucket.terraform_state.id

  versioning_configuration {
    status = "Enabled"
  }
}

# Server-side encryption for the state bucket
resource "aws_s3_bucket_server_side_encryption_configuration" "terraform_state" {
  bucket = aws_s3_bucket.terraform_state.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# Block ALL public access on the state bucket
resource "aws_s3_bucket_public_access_block" "terraform_state" {
  bucket                  = aws_s3_bucket.terraform_state.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# DynamoDB table for state locking
resource "aws_dynamodb_table" "terraform_locks" {
  name         = var.terraform_locks_table
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }

  tags = merge(var.tags, {
    Name    = var.terraform_locks_table
    Purpose = "Terraform state locking"
  })
}

