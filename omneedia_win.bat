@SETLOCAL
@SET ANDROID_BUILD_VERSION=20.0.0
@SET CURRENT_DIR=%~dp0
@SET CURRENT_BIN=%CURRENT_DIR%bin\
@SET ANDROID_HOME=%CURRENT_BIN%android-sdk\
@SET ANDROID_SDK_HOME=%CURRENT_BIN%android-sdk\
@SET ANDROID_STUDIO_JDK=%CURRENT_BIN%jdk
@SET JAVA_HOME=%CURRENT_BIN%jdk
@SET APPDATA=%CURRENT_BIN%.appdata
@SET HOMEPATH=%CURRENT_BIN%.home
@SET USERPROFILE=%CURRENT_BIN%.home
@SET ProgramData=%CURRENT_BIN%.appdata
@SET ALLUSERSPROFILE=%CURRENT_BIN%.appdata
@SET PLINK_PROTOCOL=ssh
@IF NOT DEFINED TERM SET TERM=msys
@SET PATH=%CURRENT_BIN%\cmd\5.1.3.61;%JAVA_HOME%\bin;%ANDROID_HOME%platform-tools;%ANDROID_HOME%build-tools\%ANDROID_BUILD_VERSION%;%ANDROID_HOME%tools;%CURRENT_BIN%;%CURRENT_BIN%git;%CURRENT_BIN%git\bin;%CURRENT_BIN%git\libexec\git-core;%CURRENT_BIN%npm;%CURRENT_BIN%ant\bin;%CURRENT_BIN%node_modules\.bin;%CURRENT_BIN%git\bin;%CURRENT_BIN%git\cmd;%CURRENT_BIN%editor;%CURRENT_BIN%chrome;%CURRENT_BIN%mysql\bin;%PATH%;
@set HOMEDRIVE=%~d0
@set HOMEPATH=%~p0bin\git\bin
@if not exist "%HOME%" @set HOME=%HOMEDRIVE%%HOMEPATH%
@if not exist "%HOME%" @set HOME=%USERPROFILE%
start %~dp0\bin\mysql\bin\mysqld
@cls
@echo.
@echo  -----------------------------
@echo  Welcome to omneedia Framework
@echo  -----------------------------
@echo.
@cmd.exe /K
