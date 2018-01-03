import boto3
from botocore.client import Config
import zipfile
import StringIO
import mimetypes

def lambda_handler(event, context):


    sns = boto3.resource('sns')
    topic = sns.Topic('arn:aws:sns:us-west-1:148251350517:deployPortfolioTopic')

    try:
        s3 = boto3.resource('s3', config=Config(signature_version='s3v4'))
        portfolio_bucket = s3.Bucket('my-portfolio-serverless')
        build_bucket = s3.Bucket('jn-my-portfolio-build')

        portfolio_zip = StringIO.StringIO()
        build_bucket.download_fileobj('myportfoliobuild.zip', portfolio_zip)

        with zipfile.ZipFile(portfolio_zip) as myzip:
            for nm in myzip.namelist():
                obj = myzip.open(nm)
                portfolio_bucket.upload_fileobj(obj, nm, ExtraArgs={'ContentType': mimetypes.guess_type(nm)[0]})
                portfolio_bucket.Object(nm).Acl().put(ACL='public-read')

        print "Done"

        topic.publish(Subject="Portfolio Deployed", Message="Portfolio deployed successfully!")
    except:
        topic.publish(Subject="Portfolio Deploy Failed", Message="The portfolio was not deployed successfully!")

    return 'Hello from Lambda'
