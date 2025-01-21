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
}