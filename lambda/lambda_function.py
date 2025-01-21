import boto3 # type: ignore
import time

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

        if file_extension in supported_extensions:
            # Prepend a timestamp to avoid overwriting files
            timestamp = int(time.time())
            output_file_path = f"{supported_extensions[file_extension]}{timestamp}_{key}"
            copy_source = {'Bucket': input_bucket, 'Key': key}

            try:
                # Perform the copy operation
                s3_resource.meta.client.copy(copy_source, output_bucket_name, output_file_path)
                print(f"File {key} copied to {output_bucket_name}/{output_file_path}")
            except Exception as e:
                print(f"Error copying file {key}: {e}")
        else:
            print(f"Skipping unsupported file extension: {file_extension}")

