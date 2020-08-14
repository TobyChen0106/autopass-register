import pandas
import json


def compare(list1, list2):
    for li1 in list1:
        found_flag = False
        for li2 in list2:
            if(li2 == li1):
                found_flag = True
        if(not found_flag):
            return False
    return True


with open('offerdatas_new.json', encoding="utf-8") as json_file:
    offerdatas = json.load(json_file)

deeplink_csv = pandas.read_csv(
    'deeplink.csv', encoding="utf-8", header=None).values

# for offerdata in offerdatas:
#     if(offerdata['parkinglot'] == None):
#         continue
#     for i in range(len(offerdata['parkinglot'])):
#         if(offerdata['parkinglot'][i] == "臺灣聯通"):
#             offerdata['parkinglot'][i] = "台灣聯通"
       
not_found_data_count = 0
for offerdata in offerdatas:
    if(offerdata['parkinglot'] == None):
        continue
    find_data_flag = False
    find_count = 0
    for data in deeplink_csv:
        parkinglot_data = data[0].split('、')
        if(len(offerdata['parkinglot']) == len(parkinglot_data) and compare(offerdata['parkinglot'], parkinglot_data)):
            find_data_flag = True
            find_count = find_count+1
            offerdata['deeplink'] = data[1]

    if(not find_data_flag or find_count>1):
        not_found_data_count = not_found_data_count+1
        print(offerdata)
print(f'NOT FOUND DATA COUNT: {not_found_data_count}')

with open('offerdatas_new.json', 'w') as outfile:
    json.dump(offerdatas, outfile)
# all(elem in offerdata['parkinglot'] for elem in parkinglot_data)
