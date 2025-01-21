import boto3

def lambda_handler(event, context):
    s3_resource = boto3.resource('s3')
    output_bucket_name = 's3-file-upload-out'

    # Define supported file extensions and their corresponding output paths
    supported_extensions = {
        '.txt': 'txt/',
        '.docx': 'docx/',
        '.pdf': 'pdf/',
        '.csv': 'csv/',
        '.png': 'png/',
        '.html': 'html/'
    }

    for record in event['Records']:
        input_bucket = record['s3']['bucket']['name']
        key = record['s3']['object']['key']
        file_extension = key[key.rfind('.'):]

        # Check if the file extension is supported and determine the output path
        if file_extension in supported_extensions:
            output_file_path = supported_extensions[file_extension] + key
            copy_source = {'Bucket': input_bucket, 'Key': key}
            s3_resource.meta.client.copy(copy_source, output_bucket_name, output_file_path)
            print(f"File {key} copied to {output_bucket_name}/{output_file_path}")
        else:
            print(f"Skipping unsupported file extension: {key}")
