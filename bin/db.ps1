Clear-Host

$programFiles = [System.Environment]::GetEnvironmentVariable("ProgramFiles")
$findPath = "$programFiles\MySQL"

Write-Host "Press enter to use defaults [DEFAULT]" -ForegroundColor Yellow

$temp = Read-Host "Enter Your MySQL Directory[$findPath]"
if ($temp) {
  $findPath = $temp
}

$user = "root"
$temp = Read-Host "Enter username[$user]"
if ($temp) {
  $user = $temp
}

$password = "password"
$temp = Read-Host "Enter password[$password]" -asSecureString
if ($temp.length -gt 0) {
  $BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($temp)
  $password = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)
}

Write-Host
Write-Host "Searching for MySQL in $findPath..." -ForegroundColor Cyan
Start-Sleep -s 1
$mysqlPath = (Get-ChildItem 'mysql.exe' -Path $findPath -Recurse).FullName
Write-Host "Found: " -ForegroundColor Green -NoNewline
Write-Host $mysqlPath -ForegroundColor Yellow -BackgroundColor Black

Write-Host
Write-Host "Executing sql scripts..." -ForegroundColor Cyan
& $mysqlPath --user=$user --password=$password -e "source $PSScriptRoot\init-database.sql"
& $mysqlPath --user=$user --password=$password -e "source $PSScriptRoot\seed-airports.sql"
& $mysqlPath --user=$user --password=$password -e "source $PSScriptRoot\seed-flights.sql"
& $mysqlPath --user=$user --password=$password -e "source $PSScriptRoot\seed-users.sql"

Write-Host
Write-Host "Done." -ForegroundColor Green