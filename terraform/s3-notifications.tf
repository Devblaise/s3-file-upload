resource "aws_s3_bucket_notification" "bucket_in_notification" {
  bucket = aws_s3_bucket.bucket_in.id

  lambda_function {
    lambda_function_arn = aws_lambda_function.file_processing_function.arn
    events              = ["s3:ObjectCreated:*"]
    filter_prefix       = ""
    filter_suffix       = ""
  }

  depends_on = [
    aws_lambda_permission.allow_bucket_in
  ]
}

resource "aws_lambda_permission" "allow_bucket_in" {
  statement_id  = "AllowExecutionFromS3BucketIn"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.file_processing_function.arn
  principal     = "s3.amazonaws.com"
  source_arn    = "${aws_s3_bucket.bucket_in.arn}"
}
