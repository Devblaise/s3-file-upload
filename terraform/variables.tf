variable "region" {
  description = "AWS region"
  type        = string
  default     = "eu-central-1"
}

variable "s3_bucket_prefix" {
  description = "The prefix name of the S3 buckets for uploads and processed files"
  type        = string
  default     = "s3-file-upload"
}

variable "lambda_function_name" {
  description = "The name of the Lambda function for processing uploads"
  type        = string
  default     = "file_processing_function"
}

variable "lambda_handler" {
  description = "The handler for the Lambda function"
  type        = string
  default     = "lambda_function.lambda_handler"
}

variable "lambda_runtime" {
  description = "The runtime for the Lambda function"
  type        = string
  default     = "python3.11"
}

variable "lambda_source_file" {
  description = "Path to the Lambda function's source code zip file"
  type        = string
  default     = "./lambda_function_payload.zip"
}

variable "AWS_ACCESS_KEY_ID" {
  description = "The AWS access key ID for authentication"
  type        = string
}

variable "AWS_SECRET_ACCESS_KEY" {
  description = "AWS secret access key for authentication"
  type        = string
  sensitive   = true
}