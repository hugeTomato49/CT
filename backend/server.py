from flask import Flask, request, jsonify, make_response
import os
import json  
app = Flask(__name__)

PV_data_folder_path = "data/PV"
PV_tree_file_name = "PV_Tree.json"

@app.route('/PVTree', methods=['GET'])
def getPVTree():
    file_path = os.path.join(os.path.dirname(__file__),PV_data_folder_path, PV_tree_file_name)
    if os.path.exists(file_path):
        with open(file_path, 'r') as file:
            pv_tree_data = json.load(file) 
        # print(pv_tree_data)
        return {"PV_Tree": pv_tree_data}
    else:
        return make_response(jsonify({"error": "File not found"}), 404)

@app.route('/SeriesCollection', methods=['POST'])
def getSeriesCollection():
    data = request.get_json()
    nodeList = data.get('nodeList', [])
    dataset = data.get('dataset', None)
    collection = []
    
    if dataset == 'PV':
        # read the tree structure to get file_name
        file_path = os.path.join(os.path.dirname(__file__),PV_data_folder_path, PV_tree_file_name)
        if os.path.exists(file_path):
            with open(file_path, 'r') as file:
                pv_tree_data = json.load(file) 

        for id in nodeList:
            object = {}
            object["id"] = id

            matching_dict = next((item for item in pv_tree_data if item["id"] == id), None)
            object["node_name"] = matching_dict["node_name"]
            object["level"] = matching_dict["level"]
            data_file_name = matching_dict["node_name"] + ".json"
            if id == 1:
                data_file_path = os.path.join(os.path.dirname(__file__),PV_data_folder_path, data_file_name)
                with open(data_file_path, 'r') as file:
                    object['seriesData'] = json.load(file)["data"]
            else:
                data_folder_path = list(matching_dict["node_name"].split("-"))[-2]
                data_file_path = os.path.join(os.path.dirname(__file__),PV_data_folder_path, data_folder_path, data_file_name)
                with open(data_file_path, 'r') as file:
                    object['seriesData'] = json.load(file)["data"]
                
            collection.append(object)
    
    return {"seriesCollection": collection}
        
        
    
    

if __name__ == "__main__":
    app.run(port=3000, debug=True)
