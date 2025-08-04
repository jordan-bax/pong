import requests

def main():
    url = 'http://127.0.0.1:3003/create'
    resp = requests.post(url=url, json={'name': 'luuk', 'description': 'This is a test', 'maxPlayers': '8', 'userID': 1, 'lockTime': 3500})
    print(resp.json())
    assert resp.status_code == 201

    data = resp.json()
    print(f'{data}')

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
        assert resp.status_code == 201

    # try to join full tournament
    url = 'http://127.0.0.1:3003/join'
    resp = requests.post(url=url, json={'tournamentID': data['id'], 'userID': 1000})
    print(resp.json(), resp.status_code)
    assert resp.status_code == 400

    # # check leave with invalid tourID
    # url = 'http://127.0.0.1:3003/leave'
    # resp = requests.post(url=url, json={'tournamentID': -1, 'userID': 1})
    # assert resp.status_code == 400
    #
    # # check leave with a ID thats not in the tournament
    # url = 'http://127.0.0.1:3003/leave'
    # resp = requests.post(url=url, json={'tournamentID': -1, 'userID': 200})
    # assert resp.status_code == 400
    #
    # # leave tournament
    # url = 'http://127.0.0.1:3003/leave'
    # resp = requests.post(url=url, json={'tournamentID': data['id'], 'userID': 1})
    # assert resp.status_code == 201
    #
    # # and join the tournament again
    # url = 'http://127.0.0.1:3003/join'
    # resp = requests.post(url=url, json={'tournamentID': data['id'], 'userID': 1})
    # assert resp.status_code == 201


if __name__ == '__main__':
    main()
