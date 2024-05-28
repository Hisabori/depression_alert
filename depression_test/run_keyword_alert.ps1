# PowerShell 스크립트 - run_keyword_alert.ps1

# 현재 스크립트 디렉토리로 이동
$scriptDir = Split-Path -Path $MyInvocation.MyCommand.Definition -Parent
Set-Location $scriptDir

# 가상 환경 활성화
& "$scriptDir\myenv\Scripts\Activate.ps1"

# Python 스크립트 실행
Start-Process pythonw "keyword_alert.py"
