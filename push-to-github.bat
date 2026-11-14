@echo off
title Push XOR Bit to GitHub
setlocal

set "GIT_PATH=%LOCALAPPDATA%\Microsoft\WinGet\Packages\Git.MinGit_Microsoft.Winget.Source_8wekyb3d8bbwe\cmd"
if exist "%GIT_PATH%\git.exe" (
    set "PATH=%GIT_PATH%;%PATH%"
)

cd /d "c:\Users\shrishaila m\OneDrive\Desktop\XOR\XOR-BIT"

echo ========================================================
echo ⚡ Pushing XOR Bit to GitHub...
echo ========================================================
echo.
echo If a GitHub sign-in window opens, please sign in or click Authorize.
echo.

git push origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================================
    echo ✅ SUCCESS! Your code and PWA are now live on GitHub:
    echo    https://github.com/shrishailamaganoor-creator/XOR-BIT
    echo ========================================================
) else (
    echo.
    echo ❌ Push did not complete. If you need a Personal Access Token (PAT),
    echo    generate one at https://github.com/settings/tokens
)

echo.
pause
