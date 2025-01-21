# S3 bucket for uploads ("bucket-in")
resource "aws_s3_bucket" "bucket_in" {
  bucket = "${var.s3_bucket_prefix}-in"
}


resource "aws_s3_bucket_cors_configuration" "bucket_in_cors" {
  bucket = aws_s3_bucket.bucket_in.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["PUT", "POST"]
    allowed_origins = ["*"]
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }
}

# S3 bucket for processed files ("bucket-out")
resource "aws_s3_bucket" "bucket_out" {
  bucket = "${var.s3_bucket_prefix}-out"
}


resource "aws_s3_bucket_cors_configuration" "bucket_out_cors" {
  bucket = aws_s3_bucket.bucket_out.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["PUT", "POST"]
    allowed_origins = ["*"]
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }
}
