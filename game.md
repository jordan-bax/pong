
> game-service@1.0.0 start
> node dist/game.js

Starting game loop...
{"level":40,"time":1756226933815,"pid":19,"hostname":"7eecf37cd77d","msg":"\"root\" path \"/app/dist/dist\" must exist"}
{"level":30,"time":1756226933876,"pid":19,"hostname":"7eecf37cd77d","msg":"Server listening at http://127.0.0.1:3002"}
{"level":30,"time":1756226933876,"pid":19,"hostname":"7eecf37cd77d","msg":"Server listening at http://172.18.0.6:3002"}
{"level":30,"time":1756226958288,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-1","req":{"method":"GET","url":"/db/getGamesForPlayer","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":43984},"msg":"incoming request"}
Forwarding cookies: g_state={"i_l":0}; _csrf=dOGaITrJ0phpKZ3Prhg5FUD6; pageContent=OM-NphTASJzriuzDfNPnAyVlqWC9gp7n.4roFxdw51bu5N%2F207Ew2WVGTn6gFzcEuaNORE8yfUOY; gameSession=fKkPxbYRV5TgYNb6oV1JgA96UfYntrqI.rF%2Buve16ajZ3x18Nt5SdPCUe6TLbYjrpDKn%2BvnU9lqA
Fetching games for player ID: 1
DB-- Fetching games for player ID: 1 Rows: [
  {
    id: 2,
    type: null,
    player1_id: 1,
    player2_id: 0,
    player1Score: 0,
    player2Score: 1,
    winner: 'Player 2',
    createdAt: '2025-08-26 16:47:47',
    player1name: 'anonymous',
    player2name: 'ai'
  },
  {
    id: 1,
    type: null,
    player1_id: 1,
    player2_id: 0,
    player1Score: 0,
    player2Score: 0,
    winner: 'Draw',
    createdAt: '2025-08-26 16:46:50',
    player1name: 'anonymous',
    player2name: 'ai'
  }
]
Games fetched for player ID: 1 Number of games: 2
{"level":30,"time":1756226958330,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-1","res":{"statusCode":200},"responseTime":42.10216200351715,"msg":"request completed"}
Notification sent successfully: {
  id: 1,
  message: 'Fetching games for player ID: 1',
  timestamp: '2025-08-26T16:49:18.339Z'
}
{"level":30,"time":1756227210132,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-2","req":{"method":"POST","url":"/start","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":60500},"msg":"incoming request"}
Forwarding cookies: g_state={"i_l":0}; _csrf=dOGaITrJ0phpKZ3Prhg5FUD6; pageContent=OM-NphTASJzriuzDfNPnAyVlqWC9gp7n.4roFxdw51bu5N%2F207Ew2WVGTn6gFzcEuaNORE8yfUOY
Starting game with AI: local Player Name: Guest
New game created: {
  player1: {
    id: 1,
    name: 'Guest',
    x: 2,
    y: 50,
    speed: 10,
    height: 25,
    width: 4,
    score: 0
  },
  player2: {
    id: 2,
    name: 'Player 2',
    x: 194,
    y: 50,
    speed: 10,
    height: 25,
    width: 4,
    score: 0
  },
  ball: {
    x: 98,
    y: 98,
    dx: 2,
    dy: 5,
    speed: 0.6666666666666666,
    staticSpeed: 20,
    height: 4,
    width: 4
  },
  gameActive: true,
  gamePause: false,
  gameID: 3,
  gametype: 'local'
}
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false }
{"level":30,"time":1756227210139,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-2","res":{"statusCode":200},"responseTime":7.174608998000622,"msg":"request completed"}
{"level":30,"time":1756227210147,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-3","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":60502},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227210148,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-3","res":{"statusCode":200},"responseTime":0.9899460002779961,"msg":"request completed"}
{"level":30,"time":1756227210203,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-4","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":60504},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227210204,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-4","res":{"statusCode":200},"responseTime":0.8553780019283295,"msg":"request completed"}
{"level":30,"time":1756227210245,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-5","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":60508},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227210245,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-5","res":{"statusCode":200},"responseTime":0.7709970027208328,"msg":"request completed"}
{"level":30,"time":1756227210283,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-6","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":60520},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227210284,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-6","res":{"statusCode":200},"responseTime":0.798222005367279,"msg":"request completed"}
{"level":30,"time":1756227210322,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-7","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":60524},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227210323,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-7","res":{"statusCode":200},"responseTime":0.6576820015907288,"msg":"request completed"}
{"level":30,"time":1756227210361,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-8","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":60536},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227210362,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-8","res":{"statusCode":200},"responseTime":0.9957579970359802,"msg":"request completed"}
{"level":30,"time":1756227210399,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-9","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":60552},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227210400,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-9","res":{"statusCode":200},"responseTime":0.8537679985165596,"msg":"request completed"}
{"level":30,"time":1756227210438,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-a","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":60556},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227210439,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-a","res":{"statusCode":200},"responseTime":0.9308690056204796,"msg":"request completed"}
{"level":30,"time":1756227210476,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-b","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":60572},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227210477,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-b","res":{"statusCode":200},"responseTime":0.7910409942269325,"msg":"request completed"}
{"level":30,"time":1756227210516,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-c","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":60580},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227210517,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-c","res":{"statusCode":200},"responseTime":0.7569859996438026,"msg":"request completed"}
{"level":30,"time":1756227210554,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-d","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":60586},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227210555,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-d","res":{"statusCode":200},"responseTime":0.8268430009484291,"msg":"request completed"}
{"level":30,"time":1756227210592,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-e","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":60598},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227210593,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-e","res":{"statusCode":200},"responseTime":0.769287995994091,"msg":"request completed"}
{"level":30,"time":1756227210635,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-f","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":60608},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227210636,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-f","res":{"statusCode":200},"responseTime":0.7971979975700378,"msg":"request completed"}
{"level":30,"time":1756227210674,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-g","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":60618},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227210675,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-g","res":{"statusCode":200},"responseTime":0.701384000480175,"msg":"request completed"}
{"level":30,"time":1756227210716,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-h","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":60632},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227210716,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-h","res":{"statusCode":200},"responseTime":0.6367359980940819,"msg":"request completed"}
{"level":30,"time":1756227210754,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-i","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":60646},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227210754,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-i","res":{"statusCode":200},"responseTime":0.6436149999499321,"msg":"request completed"}
{"level":30,"time":1756227210792,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-j","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":60658},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227210792,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-j","res":{"statusCode":200},"responseTime":0.7198780030012131,"msg":"request completed"}
{"level":30,"time":1756227210833,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-k","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":60666},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227210834,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-k","res":{"statusCode":200},"responseTime":0.7538660019636154,"msg":"request completed"}
{"level":30,"time":1756227210872,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-l","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":60674},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227210873,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-l","res":{"statusCode":200},"responseTime":0.6555589959025383,"msg":"request completed"}
{"level":30,"time":1756227210910,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-m","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":60690},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227210910,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-m","res":{"statusCode":200},"responseTime":0.5889360010623932,"msg":"request completed"}
{"level":30,"time":1756227210950,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-n","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":60692},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227210951,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-n","res":{"statusCode":200},"responseTime":0.678955003619194,"msg":"request completed"}
{"level":30,"time":1756227210988,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-o","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":60698},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227210989,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-o","res":{"statusCode":200},"responseTime":0.7190629988908768,"msg":"request completed"}
{"level":30,"time":1756227211027,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-p","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":60714},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227211028,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-p","res":{"statusCode":200},"responseTime":0.7271540015935898,"msg":"request completed"}
{"level":30,"time":1756227211068,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-q","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":60720},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227211068,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-q","res":{"statusCode":200},"responseTime":0.6242940053343773,"msg":"request completed"}
{"level":30,"time":1756227211115,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-r","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":60732},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227211116,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-r","res":{"statusCode":200},"responseTime":0.590658001601696,"msg":"request completed"}
{"level":30,"time":1756227211155,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-s","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":60742},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227211155,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-s","res":{"statusCode":200},"responseTime":0.5633269995450974,"msg":"request completed"}
{"level":30,"time":1756227211160,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-t","req":{"method":"POST","url":"/move?player=2","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":60748},"msg":"incoming request"}
Moving player: 2 Direction: down Game ID: local
{"level":30,"time":1756227211161,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-t","res":{"statusCode":200},"responseTime":1.0143480002880096,"msg":"request completed"}
{"level":30,"time":1756227211194,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-u","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":60758},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227211195,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-u","res":{"statusCode":200},"responseTime":0.5178599953651428,"msg":"request completed"}
{"level":30,"time":1756227211234,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-v","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":60764},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227211235,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-v","res":{"statusCode":200},"responseTime":0.6758609935641289,"msg":"request completed"}
{"level":30,"time":1756227211272,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-w","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":60780},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227211273,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-w","res":{"statusCode":200},"responseTime":0.6042499989271164,"msg":"request completed"}
{"level":30,"time":1756227211315,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-x","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":60796},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227211315,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-x","res":{"statusCode":200},"responseTime":0.4811599999666214,"msg":"request completed"}
{"level":30,"time":1756227211353,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-y","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":60800},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227211353,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-y","res":{"statusCode":200},"responseTime":0.48602600395679474,"msg":"request completed"}
{"level":30,"time":1756227211391,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-z","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":60814},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227211391,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-z","res":{"statusCode":200},"responseTime":0.5913319960236549,"msg":"request completed"}
{"level":30,"time":1756227211407,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-10","req":{"method":"POST","url":"/move?player=2","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":60830},"msg":"incoming request"}
Moving player: 2 Direction: down Game ID: local
{"level":30,"time":1756227211408,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-10","res":{"statusCode":200},"responseTime":0.5753440037369728,"msg":"request completed"}
{"level":30,"time":1756227211429,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-11","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":60838},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227211429,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-11","res":{"statusCode":200},"responseTime":0.5250400006771088,"msg":"request completed"}
{"level":30,"time":1756227211467,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-12","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":60840},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227211468,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-12","res":{"statusCode":200},"responseTime":0.5759029984474182,"msg":"request completed"}
{"level":30,"time":1756227211506,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-13","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":60846},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227211507,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-13","res":{"statusCode":200},"responseTime":0.43655499815940857,"msg":"request completed"}
{"level":30,"time":1756227211544,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-14","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":60848},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227211545,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-14","res":{"statusCode":200},"responseTime":0.43959299474954605,"msg":"request completed"}
{"level":30,"time":1756227211582,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-15","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":60860},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227211583,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-15","res":{"statusCode":200},"responseTime":0.4866439998149872,"msg":"request completed"}
{"level":30,"time":1756227211599,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-16","req":{"method":"POST","url":"/move?player=2","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":60876},"msg":"incoming request"}
Moving player: 2 Direction: down Game ID: local
{"level":30,"time":1756227211599,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-16","res":{"statusCode":200},"responseTime":0.5485780015587807,"msg":"request completed"}
{"level":30,"time":1756227211626,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-17","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":60892},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227211627,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-17","res":{"statusCode":200},"responseTime":0.5589829981327057,"msg":"request completed"}
{"level":30,"time":1756227211667,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-18","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":60894},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227211668,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-18","res":{"statusCode":200},"responseTime":0.5676299929618835,"msg":"request completed"}
{"level":30,"time":1756227211705,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-19","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":60902},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227211706,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-19","res":{"statusCode":200},"responseTime":0.4677889943122864,"msg":"request completed"}
{"level":30,"time":1756227211744,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-1a","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":60910},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227211744,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-1a","res":{"statusCode":200},"responseTime":0.4983050003647804,"msg":"request completed"}
{"level":30,"time":1756227211781,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-1b","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":60922},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227211782,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-1b","res":{"statusCode":200},"responseTime":0.7054470032453537,"msg":"request completed"}
{"level":30,"time":1756227211821,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-1c","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":60932},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227211822,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-1c","res":{"statusCode":200},"responseTime":0.5149789974093437,"msg":"request completed"}
{"level":30,"time":1756227211859,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-1d","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":60948},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227211860,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-1d","res":{"statusCode":200},"responseTime":0.5531370043754578,"msg":"request completed"}
{"level":30,"time":1756227211885,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-1e","req":{"method":"POST","url":"/move?player=2","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":60956},"msg":"incoming request"}
Moving player: 2 Direction: up Game ID: local
{"level":30,"time":1756227211886,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-1e","res":{"statusCode":200},"responseTime":0.5571139976382256,"msg":"request completed"}
{"level":30,"time":1756227211897,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-1f","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":60962},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227211898,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-1f","res":{"statusCode":200},"responseTime":0.5109700039029121,"msg":"request completed"}
{"level":30,"time":1756227211941,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-1g","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":60978},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227211942,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-1g","res":{"statusCode":200},"responseTime":0.7966580018401146,"msg":"request completed"}
{"level":30,"time":1756227211979,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-1h","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":60994},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227211980,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-1h","res":{"statusCode":200},"responseTime":0.5243079960346222,"msg":"request completed"}
{"level":30,"time":1756227212017,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-1i","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":60996},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227212017,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-1i","res":{"statusCode":200},"responseTime":0.48893000185489655,"msg":"request completed"}
{"level":30,"time":1756227212054,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-1j","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":32772},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227212055,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-1j","res":{"statusCode":200},"responseTime":0.4935219958424568,"msg":"request completed"}
{"level":30,"time":1756227212092,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-1k","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":32786},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227212093,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-1k","res":{"statusCode":200},"responseTime":0.6531529948115349,"msg":"request completed"}
{"level":30,"time":1756227212096,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-1l","req":{"method":"POST","url":"/move?player=2","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":32794},"msg":"incoming request"}
Moving player: 2 Direction: up Game ID: local
{"level":30,"time":1756227212097,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-1l","res":{"statusCode":200},"responseTime":0.5463360026478767,"msg":"request completed"}
{"level":30,"time":1756227212137,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-1m","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":32802},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227212138,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-1m","res":{"statusCode":200},"responseTime":0.5557790026068687,"msg":"request completed"}
{"level":30,"time":1756227212177,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-1n","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":32816},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227212177,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-1n","res":{"statusCode":200},"responseTime":0.5593440011143684,"msg":"request completed"}
{"level":30,"time":1756227212214,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-1o","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":32830},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227212215,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-1o","res":{"statusCode":200},"responseTime":0.4761360064148903,"msg":"request completed"}
{"level":30,"time":1756227212252,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-1p","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":32834},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227212252,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-1p","res":{"statusCode":200},"responseTime":0.49936699867248535,"msg":"request completed"}
{"level":30,"time":1756227212290,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-1q","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":32846},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227212290,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-1q","res":{"statusCode":200},"responseTime":0.4918840005993843,"msg":"request completed"}
{"level":30,"time":1756227212319,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-1r","req":{"method":"POST","url":"/move?player=2","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":32850},"msg":"incoming request"}
Moving player: 2 Direction: up Game ID: local
{"level":30,"time":1756227212320,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-1r","res":{"statusCode":200},"responseTime":0.5028780028223991,"msg":"request completed"}
{"level":30,"time":1756227212335,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-1s","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":32854},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227212336,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-1s","res":{"statusCode":200},"responseTime":0.536873996257782,"msg":"request completed"}
{"level":30,"time":1756227212374,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-1t","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":32856},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227212374,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-1t","res":{"statusCode":200},"responseTime":0.5584869980812073,"msg":"request completed"}
{"level":30,"time":1756227212412,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-1u","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":32866},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227212413,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-1u","res":{"statusCode":200},"responseTime":0.6257690042257309,"msg":"request completed"}
{"level":30,"time":1756227212450,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-1v","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":32872},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227212450,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-1v","res":{"statusCode":200},"responseTime":0.47239699959754944,"msg":"request completed"}
{"level":30,"time":1756227212463,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-1w","req":{"method":"POST","url":"/move?player=2","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":32880},"msg":"incoming request"}
Moving player: 2 Direction: up Game ID: local
{"level":30,"time":1756227212464,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-1w","res":{"statusCode":200},"responseTime":0.5507199987769127,"msg":"request completed"}
{"level":30,"time":1756227212488,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-1x","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":32882},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227212488,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-1x","res":{"statusCode":200},"responseTime":0.46985699981451035,"msg":"request completed"}
{"level":30,"time":1756227212537,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-1y","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":32898},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227212538,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-1y","res":{"statusCode":200},"responseTime":0.5352969989180565,"msg":"request completed"}
{"level":30,"time":1756227212575,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-1z","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":32912},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227212576,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-1z","res":{"statusCode":200},"responseTime":0.5121169984340668,"msg":"request completed"}
{"level":30,"time":1756227212613,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-20","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":32920},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227212614,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-20","res":{"statusCode":200},"responseTime":0.5324639976024628,"msg":"request completed"}
{"level":30,"time":1756227212651,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-21","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":32924},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227212652,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-21","res":{"statusCode":200},"responseTime":0.46192099899053574,"msg":"request completed"}
{"level":30,"time":1756227212663,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-22","req":{"method":"POST","url":"/move?player=2","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":32926},"msg":"incoming request"}
Moving player: 2 Direction: up Game ID: local
{"level":30,"time":1756227212664,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-22","res":{"statusCode":200},"responseTime":0.4930659979581833,"msg":"request completed"}
{"level":30,"time":1756227212688,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-23","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":32928},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227212689,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-23","res":{"statusCode":200},"responseTime":0.5135620012879372,"msg":"request completed"}
{"level":30,"time":1756227212728,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-24","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":32938},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227212729,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-24","res":{"statusCode":200},"responseTime":0.5974349975585938,"msg":"request completed"}
{"level":30,"time":1756227212766,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-25","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":32944},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227212766,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-25","res":{"statusCode":200},"responseTime":0.4757490009069443,"msg":"request completed"}
{"level":30,"time":1756227212804,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-26","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":32946},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227212804,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-26","res":{"statusCode":200},"responseTime":0.4945160001516342,"msg":"request completed"}
{"level":30,"time":1756227212850,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-27","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":32950},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227212851,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-27","res":{"statusCode":200},"responseTime":0.5436920002102852,"msg":"request completed"}
{"level":30,"time":1756227212890,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-28","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":32952},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227212891,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-28","res":{"statusCode":200},"responseTime":0.4748300015926361,"msg":"request completed"}
{"level":30,"time":1756227212895,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-29","req":{"method":"POST","url":"/move?player=2","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":32956},"msg":"incoming request"}
Moving player: 2 Direction: up Game ID: local
{"level":30,"time":1756227212895,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-29","res":{"statusCode":200},"responseTime":0.5128000006079674,"msg":"request completed"}
{"level":30,"time":1756227212930,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-2a","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":32960},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227212930,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-2a","res":{"statusCode":200},"responseTime":0.4585229977965355,"msg":"request completed"}
{"level":30,"time":1756227212970,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-2b","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":32964},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227212970,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-2b","res":{"statusCode":200},"responseTime":0.4417560026049614,"msg":"request completed"}
{"level":30,"time":1756227213007,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-2c","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":32972},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227213008,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-2c","res":{"statusCode":200},"responseTime":0.524786002933979,"msg":"request completed"}
{"level":30,"time":1756227213046,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-2d","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":32980},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227213046,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-2d","res":{"statusCode":200},"responseTime":0.4774859994649887,"msg":"request completed"}
{"level":30,"time":1756227213084,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-2e","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":32984},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227213084,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-2e","res":{"statusCode":200},"responseTime":0.5046209990978241,"msg":"request completed"}
{"level":30,"time":1756227213121,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-2f","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":32990},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227213122,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-2f","res":{"statusCode":200},"responseTime":0.45453500002622604,"msg":"request completed"}
{"level":30,"time":1756227213135,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-2g","req":{"method":"POST","url":"/move?player=2","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":33000},"msg":"incoming request"}
Moving player: 2 Direction: down Game ID: local
{"level":30,"time":1756227213136,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-2g","res":{"statusCode":200},"responseTime":0.6999370008707047,"msg":"request completed"}
{"level":30,"time":1756227213159,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-2h","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":36778},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227213159,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-2h","res":{"statusCode":200},"responseTime":0.5418340042233467,"msg":"request completed"}
{"level":30,"time":1756227213197,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-2i","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":36794},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227213197,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-2i","res":{"statusCode":200},"responseTime":0.503150999546051,"msg":"request completed"}
{"level":30,"time":1756227213244,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-2j","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":36808},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227213244,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-2j","res":{"statusCode":200},"responseTime":0.5187449976801872,"msg":"request completed"}
{"level":30,"time":1756227213284,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-2k","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":36824},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227213285,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-2k","res":{"statusCode":200},"responseTime":0.5003369972109795,"msg":"request completed"}
{"level":30,"time":1756227213319,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-2l","req":{"method":"POST","url":"/move?player=2","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":36834},"msg":"incoming request"}
Moving player: 2 Direction: down Game ID: local
{"level":30,"time":1756227213320,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-2l","res":{"statusCode":200},"responseTime":0.5108730047941208,"msg":"request completed"}
{"level":30,"time":1756227213323,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-2m","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":36840},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227213323,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-2m","res":{"statusCode":200},"responseTime":0.49551500380039215,"msg":"request completed"}
{"level":30,"time":1756227213360,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-2n","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":36854},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227213361,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-2n","res":{"statusCode":200},"responseTime":0.528048999607563,"msg":"request completed"}
{"level":30,"time":1756227213398,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-2o","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":36856},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227213398,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-2o","res":{"statusCode":200},"responseTime":0.5286450013518333,"msg":"request completed"}
{"level":30,"time":1756227213443,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-2p","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":36862},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227213444,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-2p","res":{"statusCode":200},"responseTime":0.5460509955883026,"msg":"request completed"}
{"level":30,"time":1756227213484,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-2q","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":36868},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227213485,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-2q","res":{"statusCode":200},"responseTime":0.552216000854969,"msg":"request completed"}
{"level":30,"time":1756227213505,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-2r","req":{"method":"POST","url":"/move?player=2","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":36878},"msg":"incoming request"}
Moving player: 2 Direction: down Game ID: local
{"level":30,"time":1756227213505,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-2r","res":{"statusCode":200},"responseTime":0.6207140013575554,"msg":"request completed"}
{"level":30,"time":1756227213523,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-2s","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":36880},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227213523,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-2s","res":{"statusCode":200},"responseTime":0.5155210047960281,"msg":"request completed"}
{"level":30,"time":1756227213561,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-2t","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":36888},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227213562,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-2t","res":{"statusCode":200},"responseTime":0.4917469993233681,"msg":"request completed"}
{"level":30,"time":1756227213602,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-2u","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":36902},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227213602,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-2u","res":{"statusCode":200},"responseTime":0.48776599764823914,"msg":"request completed"}
{"level":30,"time":1756227213649,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-2v","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":36916},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227213649,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-2v","res":{"statusCode":200},"responseTime":0.4949840009212494,"msg":"request completed"}
{"level":30,"time":1756227213666,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-2w","req":{"method":"POST","url":"/move?player=2","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":36928},"msg":"incoming request"}
Moving player: 2 Direction: down Game ID: local
{"level":30,"time":1756227213666,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-2w","res":{"statusCode":200},"responseTime":0.4953770041465759,"msg":"request completed"}
{"level":30,"time":1756227213686,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-2x","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":36938},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227213687,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-2x","res":{"statusCode":200},"responseTime":0.45244599878787994,"msg":"request completed"}
{"level":30,"time":1756227213724,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-2y","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":36944},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227213724,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-2y","res":{"statusCode":200},"responseTime":0.5349620059132576,"msg":"request completed"}
{"level":30,"time":1756227213762,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-2z","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":36946},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227213763,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-2z","res":{"statusCode":200},"responseTime":0.4843899980187416,"msg":"request completed"}
{"level":30,"time":1756227213800,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-30","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":36952},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227213801,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-30","res":{"statusCode":200},"responseTime":0.5094109997153282,"msg":"request completed"}
Fetching game state... 1
{"level":30,"time":1756227213849,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-31","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":36954},"msg":"incoming request"}
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227213849,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-31","res":{"statusCode":200},"responseTime":0.4515630006790161,"msg":"request completed"}
{"level":30,"time":1756227213849,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-32","req":{"method":"POST","url":"/move?player=2","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":36964},"msg":"incoming request"}
Moving player: 2 Direction: down Game ID: local
{"level":30,"time":1756227213850,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-32","res":{"statusCode":200},"responseTime":0.5357080027461052,"msg":"request completed"}
{"level":30,"time":1756227213888,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-33","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":36978},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227213889,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-33","res":{"statusCode":200},"responseTime":0.5422329977154732,"msg":"request completed"}
{"level":30,"time":1756227213925,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-34","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":36982},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227213926,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-34","res":{"statusCode":200},"responseTime":0.49501799792051315,"msg":"request completed"}
{"level":30,"time":1756227213963,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-35","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":36990},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227213964,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-35","res":{"statusCode":200},"responseTime":0.49925000220537186,"msg":"request completed"}
{"level":30,"time":1756227214001,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-36","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":36998},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227214002,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-36","res":{"statusCode":200},"responseTime":0.5784999951720238,"msg":"request completed"}
{"level":30,"time":1756227214050,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-37","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37010},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227214051,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-37","res":{"statusCode":200},"responseTime":0.5050519928336143,"msg":"request completed"}
{"level":30,"time":1756227214089,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-38","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37020},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227214089,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-38","res":{"statusCode":200},"responseTime":0.5177170038223267,"msg":"request completed"}
{"level":30,"time":1756227214126,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-39","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37024},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227214127,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-39","res":{"statusCode":200},"responseTime":0.5014260038733482,"msg":"request completed"}
{"level":30,"time":1756227214135,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-3a","req":{"method":"POST","url":"/move?player=1","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37036},"msg":"incoming request"}
Moving player: 1 Direction: down Game ID: local
{"level":30,"time":1756227214136,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-3a","res":{"statusCode":200},"responseTime":0.6359379962086678,"msg":"request completed"}
{"level":30,"time":1756227214163,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-3b","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37044},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227214164,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-3b","res":{"statusCode":200},"responseTime":0.4865799993276596,"msg":"request completed"}
{"level":30,"time":1756227214201,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-3c","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37052},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227214201,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-3c","res":{"statusCode":200},"responseTime":0.5532119944691658,"msg":"request completed"}
{"level":30,"time":1756227214250,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-3d","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37062},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227214250,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-3d","res":{"statusCode":200},"responseTime":0.5935709998011589,"msg":"request completed"}
{"level":30,"time":1756227214291,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-3e","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37078},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227214291,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-3e","res":{"statusCode":200},"responseTime":0.5066659972071648,"msg":"request completed"}
{"level":30,"time":1756227214329,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-3f","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37092},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227214330,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-3f","res":{"statusCode":200},"responseTime":0.45818499475717545,"msg":"request completed"}
{"level":30,"time":1756227214351,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-3g","req":{"method":"POST","url":"/move?player=1","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37100},"msg":"incoming request"}
Moving player: 1 Direction: down Game ID: local
{"level":30,"time":1756227214351,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-3g","res":{"statusCode":200},"responseTime":0.6811840012669563,"msg":"request completed"}
{"level":30,"time":1756227214369,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-3h","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37116},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227214369,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-3h","res":{"statusCode":200},"responseTime":0.4999679997563362,"msg":"request completed"}
{"level":30,"time":1756227214437,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-3i","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37120},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227214438,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-3i","res":{"statusCode":200},"responseTime":0.46372299641370773,"msg":"request completed"}
{"level":30,"time":1756227214489,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-3j","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37130},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227214490,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-3j","res":{"statusCode":200},"responseTime":0.49375399947166443,"msg":"request completed"}
{"level":30,"time":1756227214539,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-3k","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37142},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227214540,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-3k","res":{"statusCode":200},"responseTime":0.6336419954895973,"msg":"request completed"}
{"level":30,"time":1756227214593,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-3l","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37144},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227214593,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-3l","res":{"statusCode":200},"responseTime":0.45237500220537186,"msg":"request completed"}
{"level":30,"time":1756227214662,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-3m","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37148},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227214662,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-3m","res":{"statusCode":200},"responseTime":0.5038910061120987,"msg":"request completed"}
{"level":30,"time":1756227214687,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-3n","req":{"method":"POST","url":"/move?player=1","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37154},"msg":"incoming request"}
Moving player: 1 Direction: down Game ID: local
{"level":30,"time":1756227214687,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-3n","res":{"statusCode":200},"responseTime":0.48632999509572983,"msg":"request completed"}
{"level":30,"time":1756227214704,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-3o","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37162},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227214704,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-3o","res":{"statusCode":200},"responseTime":0.45809199661016464,"msg":"request completed"}
{"level":30,"time":1756227214741,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-3p","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37170},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227214742,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-3p","res":{"statusCode":200},"responseTime":0.4956810027360916,"msg":"request completed"}
{"level":30,"time":1756227214779,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-3q","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37172},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227214780,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-3q","res":{"statusCode":200},"responseTime":0.5300249978899956,"msg":"request completed"}
{"level":30,"time":1756227214817,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-3r","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37186},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227214817,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-3r","res":{"statusCode":200},"responseTime":0.4933829978108406,"msg":"request completed"}
{"level":30,"time":1756227214863,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-3s","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37188},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227214863,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-3s","res":{"statusCode":200},"responseTime":0.5438379943370819,"msg":"request completed"}
{"level":30,"time":1756227214903,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-3t","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37204},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227214903,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-3t","res":{"statusCode":200},"responseTime":0.49902400374412537,"msg":"request completed"}
{"level":30,"time":1756227214941,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-3u","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37212},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227214942,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-3u","res":{"statusCode":200},"responseTime":0.5443670004606247,"msg":"request completed"}
{"level":30,"time":1756227214982,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-3v","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37214},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227214983,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-3v","res":{"statusCode":200},"responseTime":0.5500129982829094,"msg":"request completed"}
{"level":30,"time":1756227215015,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-3w","req":{"method":"POST","url":"/move?player=1","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37222},"msg":"incoming request"}
Moving player: 1 Direction: down Game ID: local
{"level":30,"time":1756227215016,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-3w","res":{"statusCode":200},"responseTime":0.6297629997134209,"msg":"request completed"}
{"level":30,"time":1756227215022,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-3x","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37230},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227215022,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-3x","res":{"statusCode":200},"responseTime":0.4903770014643669,"msg":"request completed"}
{"level":30,"time":1756227215063,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-3y","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37232},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227215064,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-3y","res":{"statusCode":200},"responseTime":0.5649029985070229,"msg":"request completed"}
{"level":30,"time":1756227215104,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-3z","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37242},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227215105,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-3z","res":{"statusCode":200},"responseTime":0.4697209969162941,"msg":"request completed"}
{"level":30,"time":1756227215142,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-40","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37250},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227215143,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-40","res":{"statusCode":200},"responseTime":0.43213799595832825,"msg":"request completed"}
{"level":30,"time":1756227215180,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-41","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37266},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227215181,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-41","res":{"statusCode":200},"responseTime":0.5398130044341087,"msg":"request completed"}
{"level":30,"time":1756227215218,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-42","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37278},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227215219,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-42","res":{"statusCode":200},"responseTime":0.5597829967737198,"msg":"request completed"}
{"level":30,"time":1756227215265,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-43","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37282},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227215266,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-43","res":{"statusCode":200},"responseTime":0.5214359983801842,"msg":"request completed"}
{"level":30,"time":1756227215287,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-44","req":{"method":"POST","url":"/move?player=1","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37294},"msg":"incoming request"}
Moving player: 1 Direction: down Game ID: local
{"level":30,"time":1756227215287,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-44","res":{"statusCode":200},"responseTime":0.5467329993844032,"msg":"request completed"}
{"level":30,"time":1756227215305,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-45","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37308},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227215306,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-45","res":{"statusCode":200},"responseTime":0.4930590018630028,"msg":"request completed"}
{"level":30,"time":1756227215343,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-46","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37322},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227215343,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-46","res":{"statusCode":200},"responseTime":0.6113210022449493,"msg":"request completed"}
{"level":30,"time":1756227215381,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-47","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37328},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227215381,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-47","res":{"statusCode":200},"responseTime":0.5104129984974861,"msg":"request completed"}
{"level":30,"time":1756227215418,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-48","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37332},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227215419,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-48","res":{"statusCode":200},"responseTime":0.5530529990792274,"msg":"request completed"}
{"level":30,"time":1756227215465,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-49","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37348},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227215466,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-49","res":{"statusCode":200},"responseTime":0.522476002573967,"msg":"request completed"}
{"level":30,"time":1756227215506,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-4a","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37350},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227215507,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-4a","res":{"statusCode":200},"responseTime":0.45148299634456635,"msg":"request completed"}
{"level":30,"time":1756227215545,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-4b","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37354},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227215545,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-4b","res":{"statusCode":200},"responseTime":0.49838200211524963,"msg":"request completed"}
{"level":30,"time":1756227215582,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-4c","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37368},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227215583,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-4c","res":{"statusCode":200},"responseTime":0.46034500002861023,"msg":"request completed"}
{"level":30,"time":1756227215620,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-4d","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37382},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227215621,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-4d","res":{"statusCode":200},"responseTime":0.46070899814367294,"msg":"request completed"}
{"level":30,"time":1756227215647,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-4e","req":{"method":"POST","url":"/move?player=1","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37398},"msg":"incoming request"}
Moving player: 1 Direction: up Game ID: local
{"level":30,"time":1756227215647,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-4e","res":{"statusCode":200},"responseTime":0.48522600531578064,"msg":"request completed"}
{"level":30,"time":1756227215665,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-4f","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37406},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227215666,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-4f","res":{"statusCode":200},"responseTime":0.5029569938778877,"msg":"request completed"}
{"level":30,"time":1756227215706,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-4g","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37408},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227215707,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-4g","res":{"statusCode":200},"responseTime":0.4170849993824959,"msg":"request completed"}
{"level":30,"time":1756227215744,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-4h","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37422},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227215745,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-4h","res":{"statusCode":200},"responseTime":0.7931240051984787,"msg":"request completed"}
{"level":30,"time":1756227215782,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-4i","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37428},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227215783,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-4i","res":{"statusCode":200},"responseTime":0.4212779998779297,"msg":"request completed"}
{"level":30,"time":1756227215821,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-4j","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37438},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227215821,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-4j","res":{"statusCode":200},"responseTime":0.45404399931430817,"msg":"request completed"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227215867,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-4k","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37440},"msg":"incoming request"}
{"level":30,"time":1756227215867,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-4k","res":{"statusCode":200},"responseTime":0.4528319984674454,"msg":"request completed"}
{"level":30,"time":1756227215908,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-4l","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37452},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227215909,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-4l","res":{"statusCode":200},"responseTime":0.4816250056028366,"msg":"request completed"}
{"level":30,"time":1756227215946,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-4m","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37460},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227215946,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-4m","res":{"statusCode":200},"responseTime":0.38385800272226334,"msg":"request completed"}
{"level":30,"time":1756227215983,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-4n","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37464},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227215984,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-4n","res":{"statusCode":200},"responseTime":0.5036280006170273,"msg":"request completed"}
{"level":30,"time":1756227216021,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-4o","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37470},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227216021,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-4o","res":{"statusCode":200},"responseTime":0.4571400061249733,"msg":"request completed"}
{"level":30,"time":1756227216070,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-4p","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37486},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227216071,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-4p","res":{"statusCode":200},"responseTime":0.46602900326251984,"msg":"request completed"}
{"level":30,"time":1756227216108,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-4q","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37490},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227216109,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-4q","res":{"statusCode":200},"responseTime":0.4779699966311455,"msg":"request completed"}
{"level":30,"time":1756227216146,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-4r","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37498},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227216147,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-4r","res":{"statusCode":200},"responseTime":0.5149190053343773,"msg":"request completed"}
{"level":30,"time":1756227216148,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-4s","req":{"method":"POST","url":"/move?player=1","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37506},"msg":"incoming request"}
Moving player: 1 Direction: up Game ID: local
{"level":30,"time":1756227216148,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-4s","res":{"statusCode":200},"responseTime":0.4286229982972145,"msg":"request completed"}
{"level":30,"time":1756227216178,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-4t","req":{"method":"POST","url":"/move?player=1","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37520},"msg":"incoming request"}
Moving player: 1 Direction: up Game ID: local
{"level":30,"time":1756227216179,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-4t","res":{"statusCode":200},"responseTime":0.4455009996891022,"msg":"request completed"}
{"level":30,"time":1756227216185,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-4u","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37524},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227216186,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-4u","res":{"statusCode":200},"responseTime":0.5159609988331795,"msg":"request completed"}
{"level":30,"time":1756227216209,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-4v","req":{"method":"POST","url":"/move?player=1","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37538},"msg":"incoming request"}
Moving player: 1 Direction: up Game ID: local
{"level":30,"time":1756227216209,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-4v","res":{"statusCode":200},"responseTime":0.457736998796463,"msg":"request completed"}
{"level":30,"time":1756227216223,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-4w","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37542},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227216224,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-4w","res":{"statusCode":200},"responseTime":0.4571009948849678,"msg":"request completed"}
{"level":30,"time":1756227216238,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-4x","req":{"method":"POST","url":"/move?player=1","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37546},"msg":"incoming request"}
Moving player: 1 Direction: up Game ID: local
{"level":30,"time":1756227216238,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-4x","res":{"statusCode":200},"responseTime":0.4709709957242012,"msg":"request completed"}
{"level":30,"time":1756227216261,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-4y","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37560},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227216262,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-4y","res":{"statusCode":200},"responseTime":0.4944930002093315,"msg":"request completed"}
{"level":30,"time":1756227216309,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-4z","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37572},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227216309,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-4z","res":{"statusCode":200},"responseTime":0.45159099996089935,"msg":"request completed"}
{"level":30,"time":1756227216346,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-50","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37584},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227216347,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-50","res":{"statusCode":200},"responseTime":0.42245399951934814,"msg":"request completed"}
{"level":30,"time":1756227216384,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-51","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37586},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227216384,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-51","res":{"statusCode":200},"responseTime":0.5064840018749237,"msg":"request completed"}
{"level":30,"time":1756227216422,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-52","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37600},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227216422,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-52","res":{"statusCode":200},"responseTime":0.490944005548954,"msg":"request completed"}
{"level":30,"time":1756227216462,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-53","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37608},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227216463,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-53","res":{"statusCode":200},"responseTime":0.442161001265049,"msg":"request completed"}
{"level":30,"time":1756227216509,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-54","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37624},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227216510,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-54","res":{"statusCode":200},"responseTime":0.8645409941673279,"msg":"request completed"}
{"level":30,"time":1756227216511,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-55","req":{"method":"POST","url":"/move?player=1","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37638},"msg":"incoming request"}
Moving player: 1 Direction: up Game ID: local
{"level":30,"time":1756227216512,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-55","res":{"statusCode":200},"responseTime":0.5530539974570274,"msg":"request completed"}
{"level":30,"time":1756227216549,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-56","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37654},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227216549,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-56","res":{"statusCode":200},"responseTime":0.4928999990224838,"msg":"request completed"}
{"level":30,"time":1756227216590,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-57","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37662},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227216591,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-57","res":{"statusCode":200},"responseTime":0.4778919965028763,"msg":"request completed"}
{"level":30,"time":1756227216628,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-58","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37664},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227216628,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-58","res":{"statusCode":200},"responseTime":0.5261159986257553,"msg":"request completed"}
{"level":30,"time":1756227216665,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-59","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37670},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227216666,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-59","res":{"statusCode":200},"responseTime":0.4264409989118576,"msg":"request completed"}
{"level":30,"time":1756227216716,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-5a","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37686},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227216717,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-5a","res":{"statusCode":200},"responseTime":0.46378400176763535,"msg":"request completed"}
{"level":30,"time":1756227216754,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-5b","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37700},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227216755,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-5b","res":{"statusCode":200},"responseTime":0.4507810026407242,"msg":"request completed"}
{"level":30,"time":1756227216791,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-5c","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37712},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227216792,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-5c","res":{"statusCode":200},"responseTime":0.4601670056581497,"msg":"request completed"}
{"level":30,"time":1756227216807,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-5d","req":{"method":"POST","url":"/move?player=1","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37724},"msg":"incoming request"}
Moving player: 1 Direction: up Game ID: local
{"level":30,"time":1756227216807,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-5d","res":{"statusCode":200},"responseTime":0.4274500012397766,"msg":"request completed"}
{"level":30,"time":1756227216829,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-5e","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37728},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227216830,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-5e","res":{"statusCode":200},"responseTime":0.4438669979572296,"msg":"request completed"}
{"level":30,"time":1756227216867,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-5f","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37744},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227216867,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-5f","res":{"statusCode":200},"responseTime":0.4632200002670288,"msg":"request completed"}
{"level":30,"time":1756227216904,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-5g","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37758},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227216905,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-5g","res":{"statusCode":200},"responseTime":0.4465470016002655,"msg":"request completed"}
{"level":30,"time":1756227216942,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-5h","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37764},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227216942,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-5h","res":{"statusCode":200},"responseTime":0.4746050015091896,"msg":"request completed"}
{"level":30,"time":1756227216985,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-5i","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37772},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227216985,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-5i","res":{"statusCode":200},"responseTime":0.4511459991335869,"msg":"request completed"}
{"level":30,"time":1756227217023,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-5j","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37778},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227217023,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-5j","res":{"statusCode":200},"responseTime":0.5054899975657463,"msg":"request completed"}
{"level":30,"time":1756227217064,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-5k","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37794},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227217065,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-5k","res":{"statusCode":200},"responseTime":0.5089030042290688,"msg":"request completed"}
{"level":30,"time":1756227217102,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-5l","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37802},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227217102,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-5l","res":{"statusCode":200},"responseTime":0.5209000036120415,"msg":"request completed"}
{"level":30,"time":1756227217140,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-5m","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37818},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227217140,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-5m","res":{"statusCode":200},"responseTime":0.47098399698734283,"msg":"request completed"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227217177,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-5n","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37832},"msg":"incoming request"}
{"level":30,"time":1756227217178,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-5n","res":{"statusCode":200},"responseTime":0.44514700025320053,"msg":"request completed"}
{"level":30,"time":1756227217223,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-5o","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37838},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227217223,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-5o","res":{"statusCode":200},"responseTime":0.49221400171518326,"msg":"request completed"}
{"level":30,"time":1756227217260,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-5p","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37852},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227217261,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-5p","res":{"statusCode":200},"responseTime":0.4989830031991005,"msg":"request completed"}
{"level":30,"time":1756227217299,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-5q","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37866},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227217299,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-5q","res":{"statusCode":200},"responseTime":0.38002700358629227,"msg":"request completed"}
{"level":30,"time":1756227217336,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-5r","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37882},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227217337,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-5r","res":{"statusCode":200},"responseTime":0.486456997692585,"msg":"request completed"}
{"level":30,"time":1756227217374,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-5s","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37898},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227217375,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-5s","res":{"statusCode":200},"responseTime":0.41383999586105347,"msg":"request completed"}
{"level":30,"time":1756227217412,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-5t","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37908},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227217413,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-5t","res":{"statusCode":200},"responseTime":0.5576269999146461,"msg":"request completed"}
{"level":30,"time":1756227217450,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-5u","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37920},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227217451,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-5u","res":{"statusCode":200},"responseTime":0.4859350025653839,"msg":"request completed"}
{"level":30,"time":1756227217492,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-5v","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37928},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227217492,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-5v","res":{"statusCode":200},"responseTime":0.448001004755497,"msg":"request completed"}
{"level":30,"time":1756227217529,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-5w","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37936},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227217530,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-5w","res":{"statusCode":200},"responseTime":0.4698430001735687,"msg":"request completed"}
{"level":30,"time":1756227217567,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-5x","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37950},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227217568,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-5x","res":{"statusCode":200},"responseTime":0.44271599501371384,"msg":"request completed"}
{"level":30,"time":1756227217606,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-5y","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37960},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227217606,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-5y","res":{"statusCode":200},"responseTime":0.41245999932289124,"msg":"request completed"}
{"level":30,"time":1756227217644,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-5z","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37972},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227217644,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-5z","res":{"statusCode":200},"responseTime":0.5312399938702583,"msg":"request completed"}
{"level":30,"time":1756227217684,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-60","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37982},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227217684,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-60","res":{"statusCode":200},"responseTime":0.4362199977040291,"msg":"request completed"}
{"level":30,"time":1756227217721,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-61","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37984},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227217722,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-61","res":{"statusCode":200},"responseTime":0.4260540008544922,"msg":"request completed"}
{"level":30,"time":1756227217735,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-62","req":{"method":"POST","url":"/move?player=1","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37990},"msg":"incoming request"}
Moving player: 1 Direction: down Game ID: local
{"level":30,"time":1756227217735,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-62","res":{"statusCode":200},"responseTime":0.5415729954838753,"msg":"request completed"}
{"level":30,"time":1756227217759,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-63","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":37994},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227217759,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-63","res":{"statusCode":200},"responseTime":0.43574900180101395,"msg":"request completed"}
{"level":30,"time":1756227217799,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-64","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38008},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227217799,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-64","res":{"statusCode":200},"responseTime":0.4789950028061867,"msg":"request completed"}
{"level":30,"time":1756227217837,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-65","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38020},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227217837,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-65","res":{"statusCode":200},"responseTime":0.479762002825737,"msg":"request completed"}
{"level":30,"time":1756227217875,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-66","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38036},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227217875,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-66","res":{"statusCode":200},"responseTime":0.4699229970574379,"msg":"request completed"}
{"level":30,"time":1756227217916,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-67","req":{"method":"POST","url":"/move?player=2","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38046},"msg":"incoming request"}
Moving player: 2 Direction: down Game ID: local
{"level":30,"time":1756227217916,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-67","res":{"statusCode":200},"responseTime":0.4288240000605583,"msg":"request completed"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227217917,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-68","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38056},"msg":"incoming request"}
{"level":30,"time":1756227217918,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-68","res":{"statusCode":200},"responseTime":0.42843399941921234,"msg":"request completed"}
{"level":30,"time":1756227217956,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-69","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38072},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227217957,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-69","res":{"statusCode":200},"responseTime":0.5268120020627975,"msg":"request completed"}
{"level":30,"time":1756227217993,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-6a","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38088},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227217994,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-6a","res":{"statusCode":200},"responseTime":0.49939100444316864,"msg":"request completed"}
{"level":30,"time":1756227218034,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-6b","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38100},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227218035,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-6b","res":{"statusCode":200},"responseTime":0.8129279986023903,"msg":"request completed"}
{"level":30,"time":1756227218073,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-6c","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38102},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227218073,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-6c","res":{"statusCode":200},"responseTime":0.5342699959874153,"msg":"request completed"}
{"level":30,"time":1756227218111,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-6d","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38118},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227218112,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-6d","res":{"statusCode":200},"responseTime":0.5196520015597343,"msg":"request completed"}
{"level":30,"time":1756227218149,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-6e","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38134},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227218150,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-6e","res":{"statusCode":200},"responseTime":0.46540799736976624,"msg":"request completed"}
{"level":30,"time":1756227218187,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-6f","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38142},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227218188,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-6f","res":{"statusCode":200},"responseTime":0.4640960022807121,"msg":"request completed"}
{"level":30,"time":1756227218229,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-6g","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38158},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227218230,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-6g","res":{"statusCode":200},"responseTime":0.5285099968314171,"msg":"request completed"}
{"level":30,"time":1756227218267,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-6h","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38160},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227218268,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-6h","res":{"statusCode":200},"responseTime":0.43777500092983246,"msg":"request completed"}
{"level":30,"time":1756227218305,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-6i","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38166},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227218306,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-6i","res":{"statusCode":200},"responseTime":0.41485899686813354,"msg":"request completed"}
{"level":30,"time":1756227218343,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-6j","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38174},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227218344,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-6j","res":{"statusCode":200},"responseTime":0.5067120045423508,"msg":"request completed"}
{"level":30,"time":1756227218382,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-6k","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38186},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227218382,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-6k","res":{"statusCode":200},"responseTime":0.4548240005970001,"msg":"request completed"}
{"level":30,"time":1756227218411,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-6l","req":{"method":"POST","url":"/move?player=2","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38192},"msg":"incoming request"}
Moving player: 2 Direction: down Game ID: local
{"level":30,"time":1756227218412,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-6l","res":{"statusCode":200},"responseTime":0.4721340015530586,"msg":"request completed"}
{"level":30,"time":1756227218420,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-6m","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38206},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227218421,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-6m","res":{"statusCode":200},"responseTime":0.47676200419664383,"msg":"request completed"}
{"level":30,"time":1756227218442,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-6n","req":{"method":"POST","url":"/move?player=2","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38212},"msg":"incoming request"}
Moving player: 2 Direction: down Game ID: local
{"level":30,"time":1756227218442,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-6n","res":{"statusCode":200},"responseTime":0.42360299825668335,"msg":"request completed"}
{"level":30,"time":1756227218457,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-6o","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38224},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227218458,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-6o","res":{"statusCode":200},"responseTime":0.46687500178813934,"msg":"request completed"}
{"level":30,"time":1756227218472,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-6p","req":{"method":"POST","url":"/move?player=2","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38236},"msg":"incoming request"}
Moving player: 2 Direction: down Game ID: local
{"level":30,"time":1756227218472,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-6p","res":{"statusCode":200},"responseTime":0.49422599375247955,"msg":"request completed"}
{"level":30,"time":1756227218498,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-6q","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38244},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227218499,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-6q","res":{"statusCode":200},"responseTime":0.3890419974923134,"msg":"request completed"}
Moving player: 2 Direction: down Game ID: local
{"level":30,"time":1756227218502,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-6r","req":{"method":"POST","url":"/move?player=2","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38254},"msg":"incoming request"}
{"level":30,"time":1756227218503,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-6r","res":{"statusCode":200},"responseTime":0.5338030010461807,"msg":"request completed"}
{"level":30,"time":1756227218532,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-6s","req":{"method":"POST","url":"/move?player=2","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38264},"msg":"incoming request"}
Moving player: 2 Direction: down Game ID: local
{"level":30,"time":1756227218533,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-6s","res":{"statusCode":200},"responseTime":0.42382900416851044,"msg":"request completed"}
{"level":30,"time":1756227218537,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-6t","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38274},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227218537,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-6t","res":{"statusCode":200},"responseTime":0.4608540013432503,"msg":"request completed"}
{"level":30,"time":1756227218562,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-6u","req":{"method":"POST","url":"/move?player=2","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38284},"msg":"incoming request"}
Moving player: 2 Direction: down Game ID: local
{"level":30,"time":1756227218563,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-6u","res":{"statusCode":200},"responseTime":0.45652999728918076,"msg":"request completed"}
{"level":30,"time":1756227218577,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-6v","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38294},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227218578,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-6v","res":{"statusCode":200},"responseTime":0.4370669946074486,"msg":"request completed"}
{"level":30,"time":1756227218615,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-6w","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38310},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227218616,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-6w","res":{"statusCode":200},"responseTime":0.4595099985599518,"msg":"request completed"}
{"level":30,"time":1756227218653,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-6x","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38316},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227218654,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-6x","res":{"statusCode":200},"responseTime":0.4965509995818138,"msg":"request completed"}
{"level":30,"time":1756227218691,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-6y","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38330},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227218692,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-6y","res":{"statusCode":200},"responseTime":0.43699200451374054,"msg":"request completed"}
{"level":30,"time":1756227218729,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-6z","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38342},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227218730,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-6z","res":{"statusCode":200},"responseTime":0.5156340003013611,"msg":"request completed"}
{"level":30,"time":1756227218743,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-70","req":{"method":"POST","url":"/move?player=2","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38348},"msg":"incoming request"}
Moving player: 2 Direction: up Game ID: local
{"level":30,"time":1756227218743,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-70","res":{"statusCode":200},"responseTime":0.45138899981975555,"msg":"request completed"}
{"level":30,"time":1756227218771,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-71","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38354},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227218771,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-71","res":{"statusCode":200},"responseTime":0.4481609985232353,"msg":"request completed"}
{"level":30,"time":1756227218808,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-72","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38362},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227218809,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-72","res":{"statusCode":200},"responseTime":0.3972880020737648,"msg":"request completed"}
{"level":30,"time":1756227218846,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-73","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38368},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227218847,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-73","res":{"statusCode":200},"responseTime":0.4286219999194145,"msg":"request completed"}
{"level":30,"time":1756227218886,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-74","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38382},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227218887,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-74","res":{"statusCode":200},"responseTime":0.47784699499607086,"msg":"request completed"}
{"level":30,"time":1756227218930,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-75","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38394},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227218930,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-75","res":{"statusCode":200},"responseTime":0.4318619966506958,"msg":"request completed"}
{"level":30,"time":1756227218968,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-76","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38408},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227218968,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-76","res":{"statusCode":200},"responseTime":0.4440170004963875,"msg":"request completed"}
{"level":30,"time":1756227219005,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-77","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38422},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227219006,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-77","res":{"statusCode":200},"responseTime":0.4787459969520569,"msg":"request completed"}
{"level":30,"time":1756227219043,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-78","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38436},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227219043,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-78","res":{"statusCode":200},"responseTime":0.4580170065164566,"msg":"request completed"}
{"level":30,"time":1756227219081,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-79","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38448},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227219082,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-79","res":{"statusCode":200},"responseTime":0.4428030028939247,"msg":"request completed"}
{"level":30,"time":1756227219119,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-7a","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38458},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227219119,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-7a","res":{"statusCode":200},"responseTime":0.45692600309848785,"msg":"request completed"}
{"level":30,"time":1756227219157,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-7b","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38462},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227219157,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-7b","res":{"statusCode":200},"responseTime":0.4538690000772476,"msg":"request completed"}
{"level":30,"time":1756227219194,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-7c","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38464},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227219195,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-7c","res":{"statusCode":200},"responseTime":0.45704900473356247,"msg":"request completed"}
{"level":30,"time":1756227219235,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-7d","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38466},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227219235,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-7d","res":{"statusCode":200},"responseTime":0.510635994374752,"msg":"request completed"}
{"level":30,"time":1756227219245,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-7e","req":{"method":"POST","url":"/move?player=2","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38482},"msg":"incoming request"}
Moving player: 2 Direction: up Game ID: local
{"level":30,"time":1756227219245,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-7e","res":{"statusCode":200},"responseTime":0.43641600012779236,"msg":"request completed"}
{"level":30,"time":1756227219273,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-7f","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38498},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227219273,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-7f","res":{"statusCode":200},"responseTime":0.4785749986767769,"msg":"request completed"}
{"level":30,"time":1756227219276,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-7g","req":{"method":"POST","url":"/move?player=2","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38504},"msg":"incoming request"}
Moving player: 2 Direction: up Game ID: local
{"level":30,"time":1756227219277,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-7g","res":{"statusCode":200},"responseTime":0.4353810027241707,"msg":"request completed"}
{"level":30,"time":1756227219305,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-7h","req":{"method":"POST","url":"/move?player=2","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38510},"msg":"incoming request"}
Moving player: 2 Direction: up Game ID: local
{"level":30,"time":1756227219306,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-7h","res":{"statusCode":200},"responseTime":0.4829629957675934,"msg":"request completed"}
{"level":30,"time":1756227219310,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-7i","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38524},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227219311,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-7i","res":{"statusCode":200},"responseTime":0.4368709996342659,"msg":"request completed"}
{"level":30,"time":1756227219336,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-7j","req":{"method":"POST","url":"/move?player=2","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38526},"msg":"incoming request"}
Moving player: 2 Direction: up Game ID: local
{"level":30,"time":1756227219336,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-7j","res":{"statusCode":200},"responseTime":0.45315200090408325,"msg":"request completed"}
{"level":30,"time":1756227219351,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-7k","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38538},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227219351,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-7k","res":{"statusCode":200},"responseTime":0.5444980040192604,"msg":"request completed"}
{"level":30,"time":1756227219366,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-7l","req":{"method":"POST","url":"/move?player=2","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38544},"msg":"incoming request"}
Moving player: 2 Direction: up Game ID: local
{"level":30,"time":1756227219367,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-7l","res":{"statusCode":200},"responseTime":0.43065299838781357,"msg":"request completed"}
{"level":30,"time":1756227219402,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-7m","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38558},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227219403,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-7m","res":{"statusCode":200},"responseTime":0.751569002866745,"msg":"request completed"}
{"level":30,"time":1756227219403,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-7n","req":{"method":"POST","url":"/move?player=2","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38566},"msg":"incoming request"}
Moving player: 2 Direction: up Game ID: local
{"level":30,"time":1756227219403,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-7n","res":{"statusCode":200},"responseTime":0.40396299958229065,"msg":"request completed"}
{"level":30,"time":1756227219426,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-7o","req":{"method":"POST","url":"/move?player=2","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38572},"msg":"incoming request"}
Moving player: 2 Direction: up Game ID: local
{"level":30,"time":1756227219427,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-7o","res":{"statusCode":200},"responseTime":0.41865599900484085,"msg":"request completed"}
{"level":30,"time":1756227219440,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-7p","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38586},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227219440,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-7p","res":{"statusCode":200},"responseTime":0.4279500022530556,"msg":"request completed"}
{"level":30,"time":1756227219456,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-7q","req":{"method":"POST","url":"/move?player=2","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38600},"msg":"incoming request"}
Moving player: 2 Direction: up Game ID: local
{"level":30,"time":1756227219457,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-7q","res":{"statusCode":200},"responseTime":0.4425780028104782,"msg":"request completed"}
{"level":30,"time":1756227219486,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-7r","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38616},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227219487,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-7r","res":{"statusCode":200},"responseTime":0.4317450001835823,"msg":"request completed"}
{"level":30,"time":1756227219488,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-7s","req":{"method":"POST","url":"/move?player=2","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38620},"msg":"incoming request"}
Moving player: 2 Direction: up Game ID: local
{"level":30,"time":1756227219488,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-7s","res":{"statusCode":200},"responseTime":0.4141189977526665,"msg":"request completed"}
{"level":30,"time":1756227219517,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-7t","req":{"method":"POST","url":"/move?player=2","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38630},"msg":"incoming request"}
Moving player: 2 Direction: up Game ID: local
{"level":30,"time":1756227219518,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-7t","res":{"statusCode":200},"responseTime":0.4461880028247833,"msg":"request completed"}
{"level":30,"time":1756227219526,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-7u","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38632},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227219526,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-7u","res":{"statusCode":200},"responseTime":0.5001519992947578,"msg":"request completed"}
{"level":30,"time":1756227219547,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-7v","req":{"method":"POST","url":"/move?player=2","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38640},"msg":"incoming request"}
Moving player: 2 Direction: up Game ID: local
{"level":30,"time":1756227219548,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-7v","res":{"statusCode":200},"responseTime":0.42680999636650085,"msg":"request completed"}
{"level":30,"time":1756227219564,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-7w","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38652},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227219564,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-7w","res":{"statusCode":200},"responseTime":0.4929089993238449,"msg":"request completed"}
{"level":30,"time":1756227219582,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-7x","req":{"method":"POST","url":"/move?player=2","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38658},"msg":"incoming request"}
Moving player: 2 Direction: up Game ID: local
{"level":30,"time":1756227219583,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-7x","res":{"statusCode":200},"responseTime":0.6724430024623871,"msg":"request completed"}
{"level":30,"time":1756227219602,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-7y","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38670},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227219602,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-7y","res":{"statusCode":200},"responseTime":0.4723229929804802,"msg":"request completed"}
{"level":30,"time":1756227219608,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-7z","req":{"method":"POST","url":"/move?player=2","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38672},"msg":"incoming request"}
Moving player: 2 Direction: up Game ID: local
{"level":30,"time":1756227219608,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-7z","res":{"statusCode":200},"responseTime":0.4225829988718033,"msg":"request completed"}
{"level":30,"time":1756227219639,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-80","req":{"method":"POST","url":"/move?player=2","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38676},"msg":"incoming request"}
Moving player: 2 Direction: up Game ID: local
{"level":30,"time":1756227219639,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-80","res":{"statusCode":200},"responseTime":0.7062610015273094,"msg":"request completed"}
{"level":30,"time":1756227219640,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-81","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38690},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227219640,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-81","res":{"statusCode":200},"responseTime":0.614717997610569,"msg":"request completed"}
{"level":30,"time":1756227219678,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-82","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38704},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227219678,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-82","res":{"statusCode":200},"responseTime":0.4785669967532158,"msg":"request completed"}
{"level":30,"time":1756227219716,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-83","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38720},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227219716,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-83","res":{"statusCode":200},"responseTime":0.45930200070142746,"msg":"request completed"}
{"level":30,"time":1756227219753,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-84","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38726},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227219754,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-84","res":{"statusCode":200},"responseTime":0.442439004778862,"msg":"request completed"}
{"level":30,"time":1756227219792,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-85","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38736},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227219793,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-85","res":{"statusCode":200},"responseTime":0.45115800201892853,"msg":"request completed"}
{"level":30,"time":1756227219830,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-86","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38748},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227219830,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-86","res":{"statusCode":200},"responseTime":0.3626269996166229,"msg":"request completed"}
{"level":30,"time":1756227219867,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-87","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38750},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227219868,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-87","res":{"statusCode":200},"responseTime":0.5328340008854866,"msg":"request completed"}
{"level":30,"time":1756227219905,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-88","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38756},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227219906,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-88","res":{"statusCode":200},"responseTime":0.43542200326919556,"msg":"request completed"}
{"level":30,"time":1756227219943,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-89","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38770},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227219943,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-89","res":{"statusCode":200},"responseTime":0.4083550050854683,"msg":"request completed"}
{"level":30,"time":1756227219981,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-8a","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38774},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227219981,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-8a","res":{"statusCode":200},"responseTime":0.4586699977517128,"msg":"request completed"}
{"level":30,"time":1756227220018,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-8b","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38778},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227220019,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-8b","res":{"statusCode":200},"responseTime":0.5096349939703941,"msg":"request completed"}
{"level":30,"time":1756227220056,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-8c","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38792},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227220057,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-8c","res":{"statusCode":200},"responseTime":0.447611004114151,"msg":"request completed"}
{"level":30,"time":1756227220094,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-8d","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38806},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227220094,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-8d","res":{"statusCode":200},"responseTime":0.46512899547815323,"msg":"request completed"}
{"level":30,"time":1756227220134,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-8e","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38810},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227220134,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-8e","res":{"statusCode":200},"responseTime":0.45306699723005295,"msg":"request completed"}
{"level":30,"time":1756227220172,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-8f","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38822},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227220172,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-8f","res":{"statusCode":200},"responseTime":0.48235199600458145,"msg":"request completed"}
{"level":30,"time":1756227220214,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-8g","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38828},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227220215,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-8g","res":{"statusCode":200},"responseTime":0.4162139967083931,"msg":"request completed"}
{"level":30,"time":1756227220252,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-8h","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38844},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227220253,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-8h","res":{"statusCode":200},"responseTime":0.5108700022101402,"msg":"request completed"}
{"level":30,"time":1756227220290,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-8i","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38860},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227220291,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-8i","res":{"statusCode":200},"responseTime":0.4538719952106476,"msg":"request completed"}
{"level":30,"time":1756227220332,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-8j","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38862},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227220333,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-8j","res":{"statusCode":200},"responseTime":0.45202700048685074,"msg":"request completed"}
{"level":30,"time":1756227220370,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-8k","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38864},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227220371,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-8k","res":{"statusCode":200},"responseTime":0.4046989977359772,"msg":"request completed"}
{"level":30,"time":1756227220408,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-8l","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38880},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227220408,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-8l","res":{"statusCode":200},"responseTime":0.4554949998855591,"msg":"request completed"}
{"level":30,"time":1756227220447,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-8m","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38886},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227220447,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-8m","res":{"statusCode":200},"responseTime":0.4706280007958412,"msg":"request completed"}
{"level":30,"time":1756227220489,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-8n","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38892},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227220490,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-8n","res":{"statusCode":200},"responseTime":0.4107550010085106,"msg":"request completed"}
{"level":30,"time":1756227220527,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-8o","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38908},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227220527,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-8o","res":{"statusCode":200},"responseTime":0.493197999894619,"msg":"request completed"}
{"level":30,"time":1756227220564,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-8p","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38924},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227220565,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-8p","res":{"statusCode":200},"responseTime":0.4789090007543564,"msg":"request completed"}
{"level":30,"time":1756227220602,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-8q","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38940},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227220602,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-8q","res":{"statusCode":200},"responseTime":0.48211199790239334,"msg":"request completed"}
{"level":30,"time":1756227220645,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-8r","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38956},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227220645,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-8r","res":{"statusCode":200},"responseTime":0.4714680016040802,"msg":"request completed"}
{"level":30,"time":1756227220683,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-8s","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38972},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227220683,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-8s","res":{"statusCode":200},"responseTime":0.43427199870347977,"msg":"request completed"}
{"level":30,"time":1756227220744,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-8t","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":38988},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227220744,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-8t","res":{"statusCode":200},"responseTime":0.44386500120162964,"msg":"request completed"}
{"level":30,"time":1756227220803,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-8u","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":39004},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227220803,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-8u","res":{"statusCode":200},"responseTime":0.4179060012102127,"msg":"request completed"}
{"level":30,"time":1756227220857,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-8v","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":39006},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227220858,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-8v","res":{"statusCode":200},"responseTime":0.4819499999284744,"msg":"request completed"}
{"level":30,"time":1756227220912,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-8w","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":39012},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227220913,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-8w","res":{"statusCode":200},"responseTime":0.7448159977793694,"msg":"request completed"}
{"level":30,"time":1756227220986,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-8x","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":39016},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227220986,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-8x","res":{"statusCode":200},"responseTime":0.45951200276613235,"msg":"request completed"}
{"level":30,"time":1756227221026,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-8y","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":39028},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227221027,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-8y","res":{"statusCode":200},"responseTime":0.40633299946784973,"msg":"request completed"}
{"level":30,"time":1756227221065,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-8z","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":39038},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227221065,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-8z","res":{"statusCode":200},"responseTime":0.5164580047130585,"msg":"request completed"}
{"level":30,"time":1756227221102,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-90","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":39048},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227221102,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-90","res":{"statusCode":200},"responseTime":0.4841279983520508,"msg":"request completed"}
{"level":30,"time":1756227221140,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-91","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":39060},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227221140,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-91","res":{"statusCode":200},"responseTime":0.4470690041780472,"msg":"request completed"}
{"level":30,"time":1756227221177,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-92","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":39072},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227221178,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-92","res":{"statusCode":200},"responseTime":0.45965899527072906,"msg":"request completed"}
{"level":30,"time":1756227221215,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-93","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":39086},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227221216,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-93","res":{"statusCode":200},"responseTime":0.4812199994921684,"msg":"request completed"}
{"level":30,"time":1756227221254,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-94","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":39102},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227221255,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-94","res":{"statusCode":200},"responseTime":0.42228399962186813,"msg":"request completed"}
{"level":30,"time":1756227221293,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-95","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":39118},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227221294,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-95","res":{"statusCode":200},"responseTime":0.49421099573373795,"msg":"request completed"}
{"level":30,"time":1756227221332,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-96","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":39128},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227221333,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-96","res":{"statusCode":200},"responseTime":0.43763700127601624,"msg":"request completed"}
{"level":30,"time":1756227221370,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-97","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":39130},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227221371,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-97","res":{"statusCode":200},"responseTime":0.46374600380659103,"msg":"request completed"}
{"level":30,"time":1756227221408,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-98","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":39136},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227221409,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-98","res":{"statusCode":200},"responseTime":0.4359610006213188,"msg":"request completed"}
{"level":30,"time":1756227221451,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-99","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":39146},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227221451,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-99","res":{"statusCode":200},"responseTime":0.4155439957976341,"msg":"request completed"}
{"level":30,"time":1756227221488,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-9a","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":39162},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227221489,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-9a","res":{"statusCode":200},"responseTime":0.4554609954357147,"msg":"request completed"}
{"level":30,"time":1756227221526,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-9b","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":39178},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227221526,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-9b","res":{"statusCode":200},"responseTime":0.42097199708223343,"msg":"request completed"}
{"level":30,"time":1756227221564,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-9c","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":39180},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227221565,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-9c","res":{"statusCode":200},"responseTime":0.40573399513959885,"msg":"request completed"}
{"level":30,"time":1756227221602,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-9d","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":39186},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227221602,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-9d","res":{"statusCode":200},"responseTime":0.49649299681186676,"msg":"request completed"}
{"level":30,"time":1756227221640,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-9e","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":39202},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227221640,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-9e","res":{"statusCode":200},"responseTime":0.40957000106573105,"msg":"request completed"}
{"level":30,"time":1756227221677,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-9f","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":39212},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227221678,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-9f","res":{"statusCode":200},"responseTime":0.42560800164937973,"msg":"request completed"}
{"level":30,"time":1756227221716,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-9g","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":39222},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227221716,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-9g","res":{"statusCode":200},"responseTime":0.44954900443553925,"msg":"request completed"}
{"level":30,"time":1756227221754,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-9h","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":39234},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227221754,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-9h","res":{"statusCode":200},"responseTime":0.4688180014491081,"msg":"request completed"}
{"level":30,"time":1756227221794,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-9i","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":39244},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227221794,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-9i","res":{"statusCode":200},"responseTime":0.46102599799633026,"msg":"request completed"}
{"level":30,"time":1756227221833,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-9j","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":39246},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227221834,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-9j","res":{"statusCode":200},"responseTime":0.4551369994878769,"msg":"request completed"}
{"level":30,"time":1756227221871,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-9k","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":39252},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227221872,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-9k","res":{"statusCode":200},"responseTime":0.4706599935889244,"msg":"request completed"}
{"level":30,"time":1756227221909,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-9l","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":39264},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227221909,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-9l","res":{"statusCode":200},"responseTime":0.41256900131702423,"msg":"request completed"}
{"level":30,"time":1756227221953,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-9m","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":39274},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227221954,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-9m","res":{"statusCode":200},"responseTime":0.438788004219532,"msg":"request completed"}
{"level":30,"time":1756227221990,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-9n","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":39282},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227221991,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-9n","res":{"statusCode":200},"responseTime":0.3794490024447441,"msg":"request completed"}
{"level":30,"time":1756227222032,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-9o","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":39286},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227222033,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-9o","res":{"statusCode":200},"responseTime":0.44427400082349777,"msg":"request completed"}
{"level":30,"time":1756227222074,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-9p","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":39290},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227222074,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-9p","res":{"statusCode":200},"responseTime":0.40372200310230255,"msg":"request completed"}
{"level":30,"time":1756227222111,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-9q","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":39306},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227222112,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-9q","res":{"statusCode":200},"responseTime":0.5092500001192093,"msg":"request completed"}
{"level":30,"time":1756227222156,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-9r","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":39310},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227222157,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-9r","res":{"statusCode":200},"responseTime":0.46556299924850464,"msg":"request completed"}
{"level":30,"time":1756227222197,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-9s","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":39326},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227222197,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-9s","res":{"statusCode":200},"responseTime":0.4574799984693527,"msg":"request completed"}
{"level":30,"time":1756227222235,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-9t","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":39332},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227222235,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-9t","res":{"statusCode":200},"responseTime":0.46681199967861176,"msg":"request completed"}
{"level":30,"time":1756227222273,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-9u","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":39342},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227222273,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-9u","res":{"statusCode":200},"responseTime":0.5316710025072098,"msg":"request completed"}
{"level":30,"time":1756227222311,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-9v","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":39344},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227222311,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-9v","res":{"statusCode":200},"responseTime":0.4739999994635582,"msg":"request completed"}
{"level":30,"time":1756227222360,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-9w","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":39354},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227222361,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-9w","res":{"statusCode":200},"responseTime":0.474481999874115,"msg":"request completed"}
{"level":30,"time":1756227222401,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-9x","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":39368},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
{"level":30,"time":1756227222402,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-9x","res":{"statusCode":200},"responseTime":0.48089399933815,"msg":"request completed"}
{"level":30,"time":1756227222427,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-9y","req":{"method":"POST","url":"/leave","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":39382},"msg":"incoming request"}
Player leaving game with ID: 3
Game updated in database: 3
Game updated in database before leaving: 3
DB-- Fetching games for player ID: 1 Rows: [
  {
    id: 3,
    type: null,
    player1_id: 1,
    player2_id: 2,
    player1Score: 0,
    player2Score: 1,
    winner: 'Player 2',
    createdAt: '2025-08-26 16:53:42',
    player1name: 'anonymous',
    player2name: 'local'
  },
  {
    id: 2,
    type: null,
    player1_id: 1,
    player2_id: 0,
    player1Score: 0,
    player2Score: 1,
    winner: 'Player 2',
    createdAt: '2025-08-26 16:47:47',
    player1name: 'anonymous',
    player2name: 'ai'
  },
  {
    id: 1,
    type: null,
    player1_id: 1,
    player2_id: 0,
    player1Score: 0,
    player2Score: 0,
    winner: 'Draw',
    createdAt: '2025-08-26 16:46:50',
    player1name: 'anonymous',
    player2name: 'ai'
  }
]
Game retrieved from database: [
  {
    id: 3,
    type: null,
    player1: { id: 1, username: 'anonymous' },
    player2: { id: 2, username: 'local' },
    player1Score: 0,
    player2Score: 1,
    winner: 'Player 2',
    createdAt: 2025-08-26T16:53:42.000Z
  },
  {
    id: 2,
    type: null,
    player1: { id: 1, username: 'anonymous' },
    player2: { id: 0, username: 'ai' },
    player1Score: 0,
    player2Score: 1,
    winner: 'Player 2',
    createdAt: 2025-08-26T16:47:47.000Z
  },
  {
    id: 1,
    type: null,
    player1: { id: 1, username: 'anonymous' },
    player2: { id: 0, username: 'ai' },
    player1Score: 0,
    player2Score: 0,
    winner: 'Draw',
    createdAt: 2025-08-26T16:46:50.000Z
  }
]
Game with ID: 3 has been removed. Remaining games: 0
{"level":30,"time":1756227222444,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-9y","res":{"statusCode":200},"responseTime":17.53123500198126,"msg":"request completed"}
{"level":30,"time":1756227222455,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-9z","req":{"method":"GET","url":"/state","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":39386},"msg":"incoming request"}
Fetching game state... 0
Player session: { username: 'Guest', id: 1, player: 1, gameid: 3, loggedin: false } session ID: undefined
Game not found for game ID: 3
{"level":30,"time":1756227222455,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-9z","res":{"statusCode":404},"responseTime":0.6825630068778992,"msg":"request completed"}
{"level":30,"time":1756227226077,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-a0","req":{"method":"GET","url":"/db/getGamesForPlayer","host":"game:3002","remoteAddress":"172.18.0.7","remotePort":44064},"msg":"incoming request"}
Fetching games for player ID: 1
DB-- Fetching games for player ID: 1 Rows: [
  {
    id: 3,
    type: null,
    player1_id: 1,
    player2_id: 2,
    player1Score: 0,
    player2Score: 1,
    winner: 'Player 2',
    createdAt: '2025-08-26 16:53:42',
    player1name: 'anonymous',
    player2name: 'local'
  },
  {
    id: 2,
    type: null,
    player1_id: 1,
    player2_id: 0,
    player1Score: 0,
    player2Score: 1,
    winner: 'Player 2',
    createdAt: '2025-08-26 16:47:47',
    player1name: 'anonymous',
    player2name: 'ai'
  },
  {
    id: 1,
    type: null,
    player1_id: 1,
    player2_id: 0,
    player1Score: 0,
    player2Score: 0,
    winner: 'Draw',
    createdAt: '2025-08-26 16:46:50',
    player1name: 'anonymous',
    player2name: 'ai'
  }
]
Games fetched for player ID: 1 Number of games: 3
{"level":30,"time":1756227226079,"pid":19,"hostname":"7eecf37cd77d","reqId":"req-a0","res":{"statusCode":200},"responseTime":2.3174050003290176,"msg":"request completed"}
Notification sent successfully: {
  id: 1,
  message: 'Fetching games for player ID: 1',
  timestamp: '2025-08-26T16:53:46.079Z'
}
