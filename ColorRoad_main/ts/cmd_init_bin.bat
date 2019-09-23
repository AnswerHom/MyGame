@echo off
@cd /d %~dp0
@set self_path=%~dp0
@set bin=bin
if exist %bin% ( @rd /s /Q %bin% )
@cd ../../
@set release=%cd%\ColorRoad_release
@cd %self_path%
if not exist %release% ( @echo "%release% not exist" ) else ( @mklink /J %bin% %release% )
pause 

