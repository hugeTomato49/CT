'''
@Description: scaling the data to 2d with the mode applied
@Author: Nemo
@Date: 2024-02-14 16:26:37
@LastEditTime: 2024-02-14 21:39:55
@LastEditors: Nemo
'''
import numpy as np
from sklearn.manifold import MDS
from jsonTransfer import TSjson_exp

def mds_to2d(json_data, mode='similarity'):

    keys, datas = TSjson_exp(json_data)
    tmpData = datas[:, 1:].T.astype('float')

    if mode == 'correlation':
        min_vals = tmpData.min(axis=1, keepdims=True)
        max_vals = tmpData.max(axis=1, keepdims=True)
        tmpData = (tmpData - min_vals) / (max_vals - min_vals)
    elif mode != 'similarity':
        print("Mode Error!")
        return
    
    distance_matrix = np.linalg.norm(tmpData[:, np.newaxis] - tmpData, axis=-1)

    # 使用MDS进行降维
    mds = MDS(n_components=2, dissimilarity='precomputed')
    data_to2d = mds.fit_transform(distance_matrix)

    return keys, data_to2d