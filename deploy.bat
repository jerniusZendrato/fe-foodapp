@echo off
echo Building Angular App...
call ng build

echo Deploying to S3...
aws s3 sync ./dist/fe-foodapp s3://food-aangular-app/ --delete

echo Deployment selesai.
pause