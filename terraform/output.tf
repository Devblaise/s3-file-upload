output "s3_bucket_in_name" {
  value = aws_s3_bucket.bucket_in.id
}

output "s3_bucket_out_name" {
  value = aws_s3_bucket.bucket_out.id
}

output "lambda_function_name" {
  value = aws_lambda_function.file_processing_function
}

output "lambda_function_arn" {
  value = aws_lambda_function.file_processing_function.arn
}

output "iam_role_arn" {
  value = aws_iam_role.lambda_exec_role.arn
}