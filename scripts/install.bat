@echo off
setlocal

:: Define the application executable name and its current location
set "appName=filebase.exe"
set "currentAppPath=%appName%"

:: Define the target installation directory in Program Files
set "installPath=%ProgramFiles%\filebase"

:: Create the target directory if it doesn't exist
if not exist "%installPath%" mkdir "%installPath%"

:: Copy the application executable to the target directory
copy ./filebase.exe "%installPath%"

:: Add the application's directory to the system PATH environment variable
:: This allows the application to be run from anywhere in the terminal
setx PATH "%PATH%;%installPath%" /M

echo Installation and configuration complete. You can now run %appName% from the terminal.
