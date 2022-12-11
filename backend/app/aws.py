import boto3
import botocore
import os
import uuid
import logging
from botocore.exceptions import ClientError


BUCKET_NAME = os.environ.get("S3_BUCKET")
S3_LOCATION = f"http://{BUCKET_NAME}.s3.amazonaws.com/"
ALLOWED_EXTENSIONS = {"pdf", "png", "jpg", "jpeg", "gif", "mov", "mp4"}

# s3 = boto3.client(
#     "s3",
#     aws_access_key_id=os.environ.get("S3_KEY"),
#     aws_secret_access_key=os.environ.get("S3_SECRET")
# )


def allowed_file(filename):
    return "." in filename and \
           filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def get_unique_filename(filename):
    ext = filename.rsplit(".", 1)[1].lower()
    unique_filename = uuid.uuid4().hex
    return f"{unique_filename}.{ext}"


# def upload_file_to_s3(file, acl="public-read"):
#     try:
#         s3.upload_fileobj(
#             file,
#             BUCKET_NAME,
#             file.filename,
#             ExtraArgs={
#                 "ACL": acl,
#                 "ContentType": file.content_type
#             }
#         )
#     except Exception as e:
#         # in case the our s3 upload fails
#         print('failed to upload')
#         return {"errors": str(e)}

#     return {"url": f"{S3_LOCATION}{file.filename}"}

# def upload_file_to_s3(file, acl="public-read"):
#     print("FILE NAMe", type(file.filename))
#     try:
#         s3.upload_file(
#             file,
#             BUCKET_NAME,
#             file.filename,
#             ExtraArgs={
#                 "ACL": acl,
#                 "ContentType": file.content_type
#             }
#         )
#     except Exception as e:
#         # in case the our s3 upload fails
#         print('failed to upload')
#         return {"errors": str(e)}

#     return {"url": f"{S3_LOCATION}{file.filename}"}

# import logging
# import boto3
# from botocore.exceptions import ClientError
# import os


def upload_file_to_s3(file_path, bucket, object_name=None):
    """Upload a file to an S3 bucket

    :param file_name: File to upload
    :param bucket: Bucket to upload to
    :param object_name: S3 object name. If not specified then file_name is used
    :return: True if file was uploaded, else False
    """

    # If S3 object_name was not specified, use file_name
    # if object_name is None:
    #     object_name = os.path.basename(file_name)

    # Upload the file
    s3_client = boto3.client('s3',
                    aws_access_key_id=os.environ.get("S3_KEY"),
                    aws_secret_access_key=os.environ.get("S3_SECRET"))
    try:
        # absolute_path = os.path.dirname(__file__)
        # path_pwd = os.path.dirname(os.path.dirname(absolute_path)) + "/frontend/public/assets/" + file_storage.filename
        print("AWS PY", file_path)
        response = s3_client.upload_file(file_path, bucket, object_name)
        os.remove(file_path)
    except ClientError as e:
        logging.error(e)
        return False

    return {"url": f"{S3_LOCATION}{os.path.basename(file_path)}"}
