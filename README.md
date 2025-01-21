![Node.js Version](https://img.shields.io/badge/node.js-v20.0-green.svg)
![ReactJS](https://img.shields.io/badge/ReactJS-20232A?logo=react)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![AWS Lambda](https://img.shields.io/badge/AWS-Lambda-ff9900)
![AWS SNS](https://img.shields.io/badge/AWS-SNS-orange)
![Terraform](https://img.shields.io/badge/Terraform-7B42BC?logo=terraform&logoColor=white)


# AWS S3 File Sorting System with React Frontend

This project sets up an AWS infrastructure to automatically process and sort uploaded files into designated folders based on their file extensions. It leverages AWS S3, AWS Lambda, and Terraform for infrastructure setup and management. Additionally, it provides a ReactJS frontend application for users to upload files to AWS S3.


## Project Overview
- Step 1: Git clone and code review
- Step 2: AWS IAM role and CLI access
- Step 3: Terraform cloud account setup 
- Step 4: Infrastructure as Code (IaC) using Terraform 
- Step 5: Github Actions pipeline
- Step 6: Push code and verify resources
- Step 7: Start app locally, test application and verify
- Step 8: Clean up 


## Architecture Overview

The system consists of the following components:
- **Two AWS S3 Buckets**: One for incoming uploads (`bucket-in`) and one for sorted files (`bucket-out`).
- **AWS Lambda Function**: Triggered by file uploads to `bucket-in`, processes each file and sorts it into folders `bucket-out` based on the file extension.
- **ReactJS Frontend**: A simple web application allowing users to upload files to `bucket-in`.
- **Terraform**: Used to provision and manage AWS resources.

![Architecture Diagram](link-to-diagram-if-available)

![s3](https://github.com/cloudcore-hub/s3-file-uploader/assets/88560609/9a8df75f-5da5-4d0a-9702-e804a217c0c4)


![Screenshot 2024-04-09 at 8 31 23 AM](https://github.com/cloudcore-hub/s3-file-uploader/assets/88560609/3425a32c-2281-4383-b4c8-04511d5ab033)


# AutoSort: Automated File Management and Organization System on AWS
This project, which automates the process of uploading files to an S3 bucket and then sorts these files into different folders based on their file type using a Lambda function, addresses several practical problems and streamlines workflows for businesses or individual users. 


## Running the App Locally

This guide will walk you through the process of running the application on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (which includes npm)

You can verify the installations by running `node -v` and `npm -v` in your terminal. This will output the version of Node.js and npm installed on your system, respectively.

### Steps

1. **Clone the Repository 


   ```
   git clone https://github.com/cloudcore-hub/s3-file-uploader.git
   ```

2. **Navigate to the Project Directory**

   Change to the project directory in your terminal:

   ```
   cd s3-file-uploader
   ```


3. **Install Dependencies**

   Install the project's dependencies by running:

   ```
   npm install
   ```

   This command reads the `package.json` file and installs all the required packages.

4. **Start the Development Server**

   Launch the development server with:

   ```
   npm run dev
   ```

   This command starts a local web server and opens the app in your default web browser. The development server watches for changes to your source code, so you can see updates in real-time as you develop.

5. **Access the App**

   By default, the app will be available at [http://localhost:3000](http://localhost:3000). Navigate to this URL in your web browser to view the app.

## Troubleshooting

- If you encounter any issues with `npm install`, try clearing the npm cache with `npm cache clean --force` and then rerun `npm install`.
- Ensure your Node.js and npm are up to date to avoid compatibility issues with the dependencies.

For more help or information, feel free to open an issue in the project's repository.


Here's how this solves specific challenges:

### Automated File Organization

- **Problem Solved**: Manual sorting of files is time-consuming and prone to human error. This is especially cumbersome for organizations dealing with large volumes of documents, images, or datasets.
- **How This Project Helps**: Automatically sorting files by type upon upload reduces manual labor, enhances accuracy, and improves efficiency in managing digital assets.

### Efficient Data Management

- **Problem Solved**: Without proper organization, finding specific files in a large bucket can be like searching for a needle in a haystack, leading to wasted time and frustration.
- **How This Project Helps**: By automatically organizing files into predefined folders based on their type, this project facilitates easier navigation, retrieval, and management of stored data.

### Scalable Uploads and Processing

- **Problem Solved**: Scaling file uploads and processing manually is inefficient and can become increasingly complex as the volume of data grows.
- **How This Project Helps**: The use of AWS services (S3 for storage and Lambda for processing) allows the system to scale automatically, handling increases in data volume seamlessly without the need for manual intervention.

### Cost and Resource Efficiency

- **Problem Solved**: Running dedicated servers or manual sorting processes for file management can be costly and resource-intensive.
- **How This Project Helps**: Serverless computing models, like AWS Lambda, offer a pay-as-you-go pricing model, which can be more cost-effective than traditional server-based solutions. Moreover, automating the sorting process reduces the need for dedicated human resources for file management tasks.

### Enhanced Accessibility and Collaboration

- **Problem Solved**: Collaborative environments often suffer from disorganized data storage, making it difficult for team members to access and share the files they need.
- **How This Project Helps**: Organized data storage ensures that team members can quickly find and access files relevant to their tasks, facilitating smoother collaboration and productivity.

### Improved Data Processing Workflows

- **Problem Solved**: Processing different types of files often requires specific actions or workflows. Without organization, automating these workflows can be challenging.
- **How This Project Helps**: Sorting files into folders based on type can act as a precursor to more complex processing workflows. For instance, text files could be automatically sent through a text processing pipeline, while images could go through a different workflow for analysis or transformation.


### Resources Clean-up using Terraform

#### Prepare the files

Comment this line in `lambda.tf` file 
`source_code_hash = filebase64sha256(var.lambda_source_file)`

Add this line to the file 
`source_code_hash = "placeholder"`

#### Delete the contents in the S3 bucket  

Be sure you have awscli in setup locally.

run `aws s3 rm s3://<bucket-name> --recursive`
```
aws s3 rm s3://cloudcore-s3-file-in --recursive
aws s3 rm s3://cloudcore-s3-file-out --recursive
```

```
terraform login
```
 Type in `yes` and paste the token from Terraform Cloud

 cd into the the folder with the terraform file `/terraform`

 Run 
 ```
 terraform init
 ```

then 

```
terraform destroy -auto-approve
```


### Conclusion

This project leverages AWS S3 for robust and scalable storage solutions, along with AWS Lambda for efficient, serverless computing. The automation of file uploads and sorting based on file types addresses key challenges in file management and data processing, making it a valuable solution for businesses and individual users looking to optimize their digital asset management and processing workflows.
