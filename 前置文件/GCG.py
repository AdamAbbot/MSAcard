# -*- coding: utf-8 -*-
"""
以exe同目录的【MSAcard】为根目录启动HTTP服务器
"""
import sys
import os
import http.server
import socketserver
import webbrowser

def main():
    # ===================== 核心配置 =====================
    SERVER_PORT = 8080  # 服务器端口，可修改
    TARGET_FOLDER = "MSAcard"  # 与exe同目录

    # ===================== 路径 =====================
    if getattr(sys, 'frozen', False):
        #exe时 获取EXE所在文件夹的绝对路径
        root_path = os.path.dirname(os.path.abspath(sys.executable))
    else:
        # py时获取脚本所在文件夹的绝对路径
        root_path = os.path.dirname(os.path.abspath(__file__))

    # MSAcard绝对路径
    target_folder_path = os.path.join(root_path, TARGET_FOLDER)

    # ===================== 检查文件夹 =====================
    if not os.path.exists(target_folder_path):
        # 文件夹不存在时提示并暂停窗口（方便查看错误）
        error_msg = f"""
错误：未找到【{TARGET_FOLDER}】文件夹！
请确保【{TARGET_FOLDER}】文件夹与本程序放在同一目录下，当前程序路径：
{root_path}
        """
        print(error_msg.strip())
        os.system("pause")  # Windows下暂停窗口，避免闪退
        sys.exit(1)  # 退出程序

    if not os.path.isdir(target_folder_path):
        # 存在同名文件而非文件夹时提示
        error_msg = f"""
错误：【{TARGET_FOLDER}】不是文件夹！
请检查路径：{target_folder_path}
确保这是一个文件夹而非文件
        """
        print(error_msg.strip())
        os.system("pause")
        sys.exit(1)

    # ===================== 启动服务器 =====================
    try:
        # 切换MSAcard
        os.chdir(target_folder_path)

        # 配置HTTP服务器处理器
        class CustomHandler(http.server.SimpleHTTPRequestHandler):
            # 修改服务器响应头
            def end_headers(self):
                self.send_header('Access-Control-Allow-Origin', '*')
                super().end_headers()

        # 绑定端口并启动服务器（允许地址复用，避免端口占用报错）
        socketserver.TCPServer.allow_reuse_address = True
        with socketserver.TCPServer(("", SERVER_PORT), CustomHandler) as httpd:
            # 打印启动信息
            start_msg = f"""
========================================
服务器启动成功！
✅ 根目录：{target_folder_path}
✅ 访问地址：http://localhost:{SERVER_PORT}
✅ 局域网访问：http://{os.popen('ipconfig | findstr "IPv4"').read().split()[-1]}:{SERVER_PORT}
========================================
按下 Ctrl+C 可停止服务器
            """
            print(start_msg.strip())

            # 自动打开浏览器访问服务器（可选，注释掉则不自动打开）
            webbrowser.open(f"http://localhost:{SERVER_PORT}")

            # 持续运行服务器
            httpd.serve_forever()

    except socket.error as e:
        if "Address already in use" in str(e) or "端口已占用" in str(e):
            error_msg = f"""
错误：端口 {SERVER_PORT} 已被占用！
请修改脚本中的 SERVER_PORT 为其他数值（如8000、9000），重新打包后重试。
            """
            print(error_msg.strip())
        else:
            print(f"网络错误：{e}")
        os.system("pause")
        sys.exit(1)

    except KeyboardInterrupt:
        # 捕获Ctrl+C停止服务器
        httpd.shutdown()
        print("\n服务器已正常停止")
        os.system("pause")

    except Exception as e:
        # 捕获其他未知错误
        print(f"程序运行出错：{str(e)}")
        os.system("pause")
        sys.exit(1)

if __name__ == "__main__":
    # 启动主程序
    main()