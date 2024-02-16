from datetime import datetime
def filterDataByTimeRange(data,timeRange):
        
    start_time = datetime.fromisoformat(timeRange[0].replace("Z", "+00:00"))
    end_time = datetime.fromisoformat(timeRange[1].replace("Z", "+00:00"))

 
    filtered_data = [
        entry for entry in data
        if start_time <= datetime.fromisoformat(entry["Time"]) <= end_time
    ]

    return filtered_data