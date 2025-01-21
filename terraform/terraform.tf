terraform { 
    required_providers {
      aws = {
        source = "hashicorp/aws"
        version = ">=5.25"
      }
    }
    backend "remote" { 
    
    organization = "myDevOpsProjects" 

    workspaces { 
      name = "s3-upload" 
    } 
  } 
   required_version = ">=1.10.4"
}
provider "aws" {
  region = var.region
  access_key = var.AWS_ACCESS_KEY_ID
  secret_key = var.AWS_SECRET_ACCESS_KEY
}