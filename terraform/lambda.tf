resource "aws_lambda_function" "file_processing_function" {
  function_name = var.lambda_function_name
  handler       = var.lambda_handler
  runtime       = var.lambda_runtime
  role          = aws_iam_role.lambda_exec_role.arn

  filename         = var.lambda_source_file
  # source_code_hash = filebase64sha256(var.lambda_source_file)
  source_code_hash = "placeholder"
}