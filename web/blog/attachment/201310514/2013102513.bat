@echo off

echo ping172.23.0.100看能否ping通

echo.

::此IP地址为需要远程的主机

ping 172.23.0.100  

ping 172.23.0.100

echo 启用远程桌面连接

echo. & pause

mstsc /v:172.23.0.100 /console

