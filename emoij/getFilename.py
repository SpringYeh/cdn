# -*- coding: utf-8 -*-

import os

#         print(root)  # 当前目录路径
#         print(dirs)  # 当前路径下所有子目录
#         print(files)  # 当前路径下所有非目录子文件
# 其中os.path.splitext()函数将路径拆分为文件名+扩展名


def file_name(file_dir):
    L = []
    for root, dirs, files in os.walk(file_dir):
        for file in files:
            if os.path.splitext(file)[1] == '.gif':
                L.append(os.path.splitext(file)[0])
                print(os.path.splitext(file)[0])
    # return L


def listdir(path, list_name):  # 传入存储的list
    for file in os.listdir(path):
        file_path = os.path.join(path, file)
        if os.path.isdir(file_path):
            listdir(file_path, list_name)
        else:
            list_name.append(file_path)


# print(file_name("./bili"))
file_name("./bili")



