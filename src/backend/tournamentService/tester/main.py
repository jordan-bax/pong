import requests

def main():
    url = 'http://127.0.0.1:3003/create'
    resp = requests.post(url=url, json={'name': 'luuk', 'maxPlayers': '8', 'userID': 1, 'lockTime': 10})
    data = resp.json()
    print(f'{data}')
    assert resp.status_code == 201


    # check to get tournament with invalid ID
    url = 'http://127.0.0.1:3003/id/-100'
    resp = requests.get(url=url, params={'id': -100})
    assert resp.status_code == 400

    # check to get tournament with ID thats not in DB
    url = 'http://127.0.0.1:3003/id/100000'
    resp = requests.get(url=url, params={'id': 100000})
    assert resp.status_code == 400

    # check to get tournament with a valid ID
    url = f'http://127.0.0.1:3003/id/{data["id"]}'
    resp = requests.get(url=url, params={'id': data['id']})
    print(resp.json(), resp.status_code)
    assert resp.status_code == 200

    # check invalid tourID
    url = 'http://127.0.0.1:3003/join'
    resp = requests.post(url=url, json={'tournamentID': -1, 'userID': 1})
    assert resp.status_code == 400

    # check invalid same ID
    url = 'http://127.0.0.1:3003/join'
    resp = requests.post(url=url, json={'tournamentID': data['id'], 'userID': 1})
    assert resp.status_code == 400

    # valid join
    url = 'http://127.0.0.1:3003/join'
    resp = requests.post(url=url, json={'tournamentID': data['id'], 'userID': 2})
    assert resp.status_code == 201

    # loop till full
    for i in range(data['maxPlayers'] - 2):
        url = 'http://127.0.0.1:3003/join'
        resp = requests.post(url=url, json={'tournamentID': data['id'], 'userID': i + 3})
        print(resp.json())
        assert resp.status_code == 201

    # try to join full tournament
    url = 'http://127.0.0.1:3003/join'
    resp = requests.post(url=url, json={'tournamentID': data['id'], 'userID': 1000})
    assert resp.status_code == 400

    # check leave with invalid tourID
    url = 'http://127.0.0.1:3003/leave'
    resp = requests.post(url=url, json={'tournamentID': -1, 'userID': 1})
    assert resp.status_code == 400

    # check leave with invalid tourID
    url = 'http://127.0.0.1:3003/leave'
    resp = requests.post(url=url, json={'tournamentID': 10000, 'userID': 1})
    assert resp.status_code == 400

    # check leave with a ID thats not in the tournament
    url = 'http://127.0.0.1:3003/leave'
    resp = requests.post(url=url, json={'tournamentID': data['id'], 'userID': 200})
    assert resp.status_code == 400

    # # leave tournament
    # url = 'http://127.0.0.1:3003/leave'
    # resp = requests.post(url=url, json={'tournamentID': data['id'], 'userID': 1})
    # print(f'{resp.json()}')
    # assert resp.status_code == 201
    #
    # # leave tournament with same ID again
    # url = 'http://127.0.0.1:3003/leave'
    # resp = requests.post(url=url, json={'tournamentID': data['id'], 'userID': 1})
    # assert resp.status_code == 400
    #
    # # everyone leave the tournament
    # for index in range(data['maxPlayers'] - 1):
    #     url = 'http://127.0.0.1:3003/leave'
    #     resp = requests.post(url=url, json={'tournamentID': data['id'], 'userID': index + 2})
    #     assert resp.status_code == 201
    #
    # # check that tournament is deleted
    # url = f'http://127.0.0.1:3003/id/{data["id"]}'
    # resp = requests.get(url=url, params={'id': data['id']})
    # assert resp.status_code == 400
    #
    # # check idle tournaments
    # url = 'http://127.0.0.1:3003/create'
    # resp = requests.post(url=url, json={'name': 'luuk', 'description': 'This is a test', 'maxPlayers': '8', 'userID': 1, 'lockTime': 10})
    # assert resp.status_code == 201
    #
    # data = resp.json()
    # print(f'{data}')
    #
    # # url = 'http://127.0.0.1:3003/idle'
    # # resp = requests.get(url=url)
    # # assert resp.status_code == 200
    # #
    # # url = 'http://127.0.0.1:3003/running'
    # # resp = requests.get(url=url)
    # # assert resp.status_code == 200
    # #
    # # url = 'http://127.0.0.1:3003/finished'
    # # resp = requests.get(url=url)
    # # assert resp.status_code == 200
    # #
    # # url = 'http://127.0.0.1:3003/tours'
    # # resp = requests.get(url=url)
    # # assert resp.status_code == 200


if __name__ == '__main__':
    main()
