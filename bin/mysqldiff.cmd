@echo off
set MYSQL_DIFF_HOME=%~dp0_mysqldiff
cd %MYSQL_DIFF_HOME%
java -classpath lib/* ru.yandex.mysqlDiff.Diff %1 %2
cd %~dp0