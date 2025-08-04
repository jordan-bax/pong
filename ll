
> game-service@1.0.0 start
> node dist/game.js

Starting game loop...
{"level":40,"time":1754329482687,"pid":19,"hostname":"29966661f171","msg":"\"root\" path \"/app/dist/dist\" must exist"}
{"level":30,"time":1754329482695,"pid":19,"hostname":"29966661f171","msg":"Server listening at http://0.0.0.0:3002"}
{"level":30,"time":1754329489264,"pid":19,"hostname":"29966661f171","reqId":"req-1","req":{"method":"GET","url":"/db/getGamesForPlayer","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":42192},"msg":"incoming request"}
Fetching games for player ID: 1
Games fetched for player ID: 1 Number of games: 1
{"level":30,"time":1754329489302,"pid":19,"hostname":"29966661f171","reqId":"req-1","res":{"statusCode":200},"responseTime":37.77945400029421,"msg":"request completed"}
{"level":30,"time":1754329674624,"pid":19,"hostname":"29966661f171","reqId":"req-2","req":{"method":"POST","url":"/start","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34326},"msg":"incoming request"}
Starting game with AI: ai Player Name: herer
New game created: {
  player1: {
    id: 1,
    name: 'herer',
    x: 2,
    y: 50,
    speed: 10,
    height: 25,
    width: 4,
    score: 0
  },
  player2: {
    id: 0,
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
  gameID: 7,
  gametype: 'ai'
}
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false }
{"level":30,"time":1754329674646,"pid":19,"hostname":"29966661f171","reqId":"req-2","res":{"statusCode":200},"responseTime":21.526802003383636,"msg":"request completed"}
{"level":30,"time":1754329674655,"pid":19,"hostname":"29966661f171","reqId":"req-3","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34338},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329674656,"pid":19,"hostname":"29966661f171","reqId":"req-3","res":{"statusCode":200},"responseTime":1.126231998205185,"msg":"request completed"}
{"level":30,"time":1754329674699,"pid":19,"hostname":"29966661f171","reqId":"req-4","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34350},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329674701,"pid":19,"hostname":"29966661f171","reqId":"req-4","res":{"statusCode":200},"responseTime":1.517977997660637,"msg":"request completed"}
{"level":30,"time":1754329674743,"pid":19,"hostname":"29966661f171","reqId":"req-5","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34358},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329674745,"pid":19,"hostname":"29966661f171","reqId":"req-5","res":{"statusCode":200},"responseTime":1.5516620054841042,"msg":"request completed"}
{"level":30,"time":1754329674788,"pid":19,"hostname":"29966661f171","reqId":"req-6","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34368},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329674790,"pid":19,"hostname":"29966661f171","reqId":"req-6","res":{"statusCode":200},"responseTime":1.8481030017137527,"msg":"request completed"}
{"level":30,"time":1754329674835,"pid":19,"hostname":"29966661f171","reqId":"req-7","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34374},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329674837,"pid":19,"hostname":"29966661f171","reqId":"req-7","res":{"statusCode":200},"responseTime":1.067111000418663,"msg":"request completed"}
{"level":30,"time":1754329674878,"pid":19,"hostname":"29966661f171","reqId":"req-8","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34382},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329674880,"pid":19,"hostname":"29966661f171","reqId":"req-8","res":{"statusCode":200},"responseTime":1.7099549993872643,"msg":"request completed"}
{"level":30,"time":1754329674923,"pid":19,"hostname":"29966661f171","reqId":"req-9","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34388},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329674925,"pid":19,"hostname":"29966661f171","reqId":"req-9","res":{"statusCode":200},"responseTime":1.9616400003433228,"msg":"request completed"}
{"level":30,"time":1754329674976,"pid":19,"hostname":"29966661f171","reqId":"req-a","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34396},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329674978,"pid":19,"hostname":"29966661f171","reqId":"req-a","res":{"statusCode":200},"responseTime":2.139876998960972,"msg":"request completed"}
{"level":30,"time":1754329675023,"pid":19,"hostname":"29966661f171","reqId":"req-b","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34406},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329675024,"pid":19,"hostname":"29966661f171","reqId":"req-b","res":{"statusCode":200},"responseTime":1.7013799995183945,"msg":"request completed"}
{"level":30,"time":1754329675068,"pid":19,"hostname":"29966661f171","reqId":"req-c","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34412},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329675070,"pid":19,"hostname":"29966661f171","reqId":"req-c","res":{"statusCode":200},"responseTime":1.63162399828434,"msg":"request completed"}
{"level":30,"time":1754329675115,"pid":19,"hostname":"29966661f171","reqId":"req-d","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34428},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329675116,"pid":19,"hostname":"29966661f171","reqId":"req-d","res":{"statusCode":200},"responseTime":1.7488870024681091,"msg":"request completed"}
{"level":30,"time":1754329675160,"pid":19,"hostname":"29966661f171","reqId":"req-e","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34444},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329675161,"pid":19,"hostname":"29966661f171","reqId":"req-e","res":{"statusCode":200},"responseTime":1.5881339982151985,"msg":"request completed"}
{"level":30,"time":1754329675208,"pid":19,"hostname":"29966661f171","reqId":"req-f","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34456},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329675210,"pid":19,"hostname":"29966661f171","reqId":"req-f","res":{"statusCode":200},"responseTime":1.4849429950118065,"msg":"request completed"}
{"level":30,"time":1754329675254,"pid":19,"hostname":"29966661f171","reqId":"req-g","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34468},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329675255,"pid":19,"hostname":"29966661f171","reqId":"req-g","res":{"statusCode":200},"responseTime":0.9943690001964569,"msg":"request completed"}
{"level":30,"time":1754329675298,"pid":19,"hostname":"29966661f171","reqId":"req-h","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34472},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329675300,"pid":19,"hostname":"29966661f171","reqId":"req-h","res":{"statusCode":200},"responseTime":1.5548650026321411,"msg":"request completed"}
{"level":30,"time":1754329675342,"pid":19,"hostname":"29966661f171","reqId":"req-i","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34486},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329675344,"pid":19,"hostname":"29966661f171","reqId":"req-i","res":{"statusCode":200},"responseTime":1.2770599946379662,"msg":"request completed"}
{"level":30,"time":1754329675386,"pid":19,"hostname":"29966661f171","reqId":"req-j","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34492},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329675388,"pid":19,"hostname":"29966661f171","reqId":"req-j","res":{"statusCode":200},"responseTime":1.5294789969921112,"msg":"request completed"}
{"level":30,"time":1754329675431,"pid":19,"hostname":"29966661f171","reqId":"req-k","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34496},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329675433,"pid":19,"hostname":"29966661f171","reqId":"req-k","res":{"statusCode":200},"responseTime":1.713757999241352,"msg":"request completed"}
{"level":30,"time":1754329675481,"pid":19,"hostname":"29966661f171","reqId":"req-l","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34506},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329675483,"pid":19,"hostname":"29966661f171","reqId":"req-l","res":{"statusCode":200},"responseTime":1.251688003540039,"msg":"request completed"}
{"level":30,"time":1754329675526,"pid":19,"hostname":"29966661f171","reqId":"req-m","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34512},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329675528,"pid":19,"hostname":"29966661f171","reqId":"req-m","res":{"statusCode":200},"responseTime":1.4828120023012161,"msg":"request completed"}
{"level":30,"time":1754329675572,"pid":19,"hostname":"29966661f171","reqId":"req-n","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34520},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329675574,"pid":19,"hostname":"29966661f171","reqId":"req-n","res":{"statusCode":200},"responseTime":1.4459370002150536,"msg":"request completed"}
{"level":30,"time":1754329675616,"pid":19,"hostname":"29966661f171","reqId":"req-o","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34526},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329675617,"pid":19,"hostname":"29966661f171","reqId":"req-o","res":{"statusCode":200},"responseTime":1.3959890007972717,"msg":"request completed"}
{"level":30,"time":1754329675659,"pid":19,"hostname":"29966661f171","reqId":"req-p","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34540},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329675661,"pid":19,"hostname":"29966661f171","reqId":"req-p","res":{"statusCode":200},"responseTime":1.4899080023169518,"msg":"request completed"}
{"level":30,"time":1754329675704,"pid":19,"hostname":"29966661f171","reqId":"req-q","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34542},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329675706,"pid":19,"hostname":"29966661f171","reqId":"req-q","res":{"statusCode":200},"responseTime":1.23853899538517,"msg":"request completed"}
{"level":30,"time":1754329675748,"pid":19,"hostname":"29966661f171","reqId":"req-r","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34544},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329675749,"pid":19,"hostname":"29966661f171","reqId":"req-r","res":{"statusCode":200},"responseTime":0.5425800010561943,"msg":"request completed"}
{"level":30,"time":1754329675789,"pid":19,"hostname":"29966661f171","reqId":"req-s","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34550},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329675791,"pid":19,"hostname":"29966661f171","reqId":"req-s","res":{"statusCode":200},"responseTime":1.3269400000572205,"msg":"request completed"}
{"level":30,"time":1754329675833,"pid":19,"hostname":"29966661f171","reqId":"req-t","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34564},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329675835,"pid":19,"hostname":"29966661f171","reqId":"req-t","res":{"statusCode":200},"responseTime":1.307494007050991,"msg":"request completed"}
{"level":30,"time":1754329675887,"pid":19,"hostname":"29966661f171","reqId":"req-u","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34574},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329675889,"pid":19,"hostname":"29966661f171","reqId":"req-u","res":{"statusCode":200},"responseTime":1.6581059992313385,"msg":"request completed"}
{"level":30,"time":1754329675932,"pid":19,"hostname":"29966661f171","reqId":"req-v","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34588},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329675933,"pid":19,"hostname":"29966661f171","reqId":"req-v","res":{"statusCode":200},"responseTime":1.2291970029473305,"msg":"request completed"}
{"level":30,"time":1754329675978,"pid":19,"hostname":"29966661f171","reqId":"req-w","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34604},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329675980,"pid":19,"hostname":"29966661f171","reqId":"req-w","res":{"statusCode":200},"responseTime":1.3696409985423088,"msg":"request completed"}
{"level":30,"time":1754329676023,"pid":19,"hostname":"29966661f171","reqId":"req-x","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34606},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329676024,"pid":19,"hostname":"29966661f171","reqId":"req-x","res":{"statusCode":200},"responseTime":1.2911849990487099,"msg":"request completed"}
{"level":30,"time":1754329676066,"pid":19,"hostname":"29966661f171","reqId":"req-y","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34608},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329676068,"pid":19,"hostname":"29966661f171","reqId":"req-y","res":{"statusCode":200},"responseTime":1.0789350047707558,"msg":"request completed"}
{"level":30,"time":1754329676109,"pid":19,"hostname":"29966661f171","reqId":"req-z","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34624},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329676111,"pid":19,"hostname":"29966661f171","reqId":"req-z","res":{"statusCode":200},"responseTime":1.2110590040683746,"msg":"request completed"}
{"level":30,"time":1754329676153,"pid":19,"hostname":"29966661f171","reqId":"req-10","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34628},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329676154,"pid":19,"hostname":"29966661f171","reqId":"req-10","res":{"statusCode":200},"responseTime":1.0450310036540031,"msg":"request completed"}
{"level":30,"time":1754329676196,"pid":19,"hostname":"29966661f171","reqId":"req-11","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34638},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329676198,"pid":19,"hostname":"29966661f171","reqId":"req-11","res":{"statusCode":200},"responseTime":1.2430820018053055,"msg":"request completed"}
{"level":30,"time":1754329676240,"pid":19,"hostname":"29966661f171","reqId":"req-12","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34650},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329676241,"pid":19,"hostname":"29966661f171","reqId":"req-12","res":{"statusCode":200},"responseTime":1.2061240002512932,"msg":"request completed"}
{"level":30,"time":1754329676289,"pid":19,"hostname":"29966661f171","reqId":"req-13","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34664},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329676289,"pid":19,"hostname":"29966661f171","reqId":"req-13","res":{"statusCode":200},"responseTime":0.45501599460840225,"msg":"request completed"}
{"level":30,"time":1754329676330,"pid":19,"hostname":"29966661f171","reqId":"req-14","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34668},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329676331,"pid":19,"hostname":"29966661f171","reqId":"req-14","res":{"statusCode":200},"responseTime":1.101335994899273,"msg":"request completed"}
{"level":30,"time":1754329676374,"pid":19,"hostname":"29966661f171","reqId":"req-15","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34682},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329676375,"pid":19,"hostname":"29966661f171","reqId":"req-15","res":{"statusCode":200},"responseTime":1.1348889991641045,"msg":"request completed"}
{"level":30,"time":1754329676417,"pid":19,"hostname":"29966661f171","reqId":"req-16","req":{"method":"POST","url":"/move","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34684},"msg":"incoming request"}
Moving player: 1 Direction: down Game ID: ai
{"level":30,"time":1754329676420,"pid":19,"hostname":"29966661f171","reqId":"req-16","res":{"statusCode":200},"responseTime":2.622561998665333,"msg":"request completed"}
{"level":30,"time":1754329676421,"pid":19,"hostname":"29966661f171","reqId":"req-17","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34696},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329676422,"pid":19,"hostname":"29966661f171","reqId":"req-17","res":{"statusCode":200},"responseTime":1.0375660061836243,"msg":"request completed"}
{"level":30,"time":1754329676464,"pid":19,"hostname":"29966661f171","reqId":"req-18","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34700},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329676466,"pid":19,"hostname":"29966661f171","reqId":"req-18","res":{"statusCode":200},"responseTime":1.0499109998345375,"msg":"request completed"}
{"level":30,"time":1754329676509,"pid":19,"hostname":"29966661f171","reqId":"req-19","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34712},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329676510,"pid":19,"hostname":"29966661f171","reqId":"req-19","res":{"statusCode":200},"responseTime":1.1389329954981804,"msg":"request completed"}
{"level":30,"time":1754329676550,"pid":19,"hostname":"29966661f171","reqId":"req-1a","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34726},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329676551,"pid":19,"hostname":"29966661f171","reqId":"req-1a","res":{"statusCode":200},"responseTime":0.49173400551080704,"msg":"request completed"}
{"level":30,"time":1754329676592,"pid":19,"hostname":"29966661f171","reqId":"req-1b","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34730},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329676594,"pid":19,"hostname":"29966661f171","reqId":"req-1b","res":{"statusCode":200},"responseTime":1.3215240016579628,"msg":"request completed"}
{"level":30,"time":1754329676637,"pid":19,"hostname":"29966661f171","reqId":"req-1c","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34746},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329676638,"pid":19,"hostname":"29966661f171","reqId":"req-1c","res":{"statusCode":200},"responseTime":1.1384140029549599,"msg":"request completed"}
{"level":30,"time":1754329676641,"pid":19,"hostname":"29966661f171","reqId":"req-1d","req":{"method":"POST","url":"/move","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34758},"msg":"incoming request"}
Moving player: 1 Direction: down Game ID: ai
{"level":30,"time":1754329676643,"pid":19,"hostname":"29966661f171","reqId":"req-1d","res":{"statusCode":200},"responseTime":1.3232109993696213,"msg":"request completed"}
{"level":30,"time":1754329676683,"pid":19,"hostname":"29966661f171","reqId":"req-1e","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34774},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329676684,"pid":19,"hostname":"29966661f171","reqId":"req-1e","res":{"statusCode":200},"responseTime":1.3628730028867722,"msg":"request completed"}
{"level":30,"time":1754329676731,"pid":19,"hostname":"29966661f171","reqId":"req-1f","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34778},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329676732,"pid":19,"hostname":"29966661f171","reqId":"req-1f","res":{"statusCode":200},"responseTime":1.2067800015211105,"msg":"request completed"}
{"level":30,"time":1754329676776,"pid":19,"hostname":"29966661f171","reqId":"req-1g","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34794},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329676778,"pid":19,"hostname":"29966661f171","reqId":"req-1g","res":{"statusCode":200},"responseTime":1.5909230038523674,"msg":"request completed"}
{"level":30,"time":1754329676825,"pid":19,"hostname":"29966661f171","reqId":"req-1h","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34802},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329676826,"pid":19,"hostname":"29966661f171","reqId":"req-1h","res":{"statusCode":200},"responseTime":1.2667410001158714,"msg":"request completed"}
{"level":30,"time":1754329676841,"pid":19,"hostname":"29966661f171","reqId":"req-1i","req":{"method":"POST","url":"/move","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34808},"msg":"incoming request"}
Moving player: 1 Direction: down Game ID: ai
{"level":30,"time":1754329676842,"pid":19,"hostname":"29966661f171","reqId":"req-1i","res":{"statusCode":200},"responseTime":1.3063020035624504,"msg":"request completed"}
{"level":30,"time":1754329676871,"pid":19,"hostname":"29966661f171","reqId":"req-1j","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34818},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329676873,"pid":19,"hostname":"29966661f171","reqId":"req-1j","res":{"statusCode":200},"responseTime":1.7310609966516495,"msg":"request completed"}
{"level":30,"time":1754329676918,"pid":19,"hostname":"29966661f171","reqId":"req-1k","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34822},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329676920,"pid":19,"hostname":"29966661f171","reqId":"req-1k","res":{"statusCode":200},"responseTime":1.0789399966597557,"msg":"request completed"}
{"level":30,"time":1754329676962,"pid":19,"hostname":"29966661f171","reqId":"req-1l","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34828},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329676963,"pid":19,"hostname":"29966661f171","reqId":"req-1l","res":{"statusCode":200},"responseTime":0.9742399975657463,"msg":"request completed"}
{"level":30,"time":1754329677006,"pid":19,"hostname":"29966661f171","reqId":"req-1m","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34840},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329677007,"pid":19,"hostname":"29966661f171","reqId":"req-1m","res":{"statusCode":200},"responseTime":1.2006490007042885,"msg":"request completed"}
{"level":30,"time":1754329677058,"pid":19,"hostname":"29966661f171","reqId":"req-1n","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34842},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329677060,"pid":19,"hostname":"29966661f171","reqId":"req-1n","res":{"statusCode":200},"responseTime":0.975152000784874,"msg":"request completed"}
{"level":30,"time":1754329677102,"pid":19,"hostname":"29966661f171","reqId":"req-1o","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34846},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329677103,"pid":19,"hostname":"29966661f171","reqId":"req-1o","res":{"statusCode":200},"responseTime":1.1448509991168976,"msg":"request completed"}
{"level":30,"time":1754329677145,"pid":19,"hostname":"29966661f171","reqId":"req-1p","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34852},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329677147,"pid":19,"hostname":"29966661f171","reqId":"req-1p","res":{"statusCode":200},"responseTime":1.0692140012979507,"msg":"request completed"}
{"level":30,"time":1754329677149,"pid":19,"hostname":"29966661f171","reqId":"req-1q","req":{"method":"POST","url":"/move","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34858},"msg":"incoming request"}
Moving player: 1 Direction: up Game ID: ai
{"level":30,"time":1754329677150,"pid":19,"hostname":"29966661f171","reqId":"req-1q","res":{"statusCode":200},"responseTime":0.8694199994206429,"msg":"request completed"}
{"level":30,"time":1754329677189,"pid":19,"hostname":"29966661f171","reqId":"req-1r","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34864},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329677190,"pid":19,"hostname":"29966661f171","reqId":"req-1r","res":{"statusCode":200},"responseTime":1.111958995461464,"msg":"request completed"}
{"level":30,"time":1754329677233,"pid":19,"hostname":"29966661f171","reqId":"req-1s","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34874},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329677235,"pid":19,"hostname":"29966661f171","reqId":"req-1s","res":{"statusCode":200},"responseTime":1.1462299972772598,"msg":"request completed"}
{"level":30,"time":1754329677281,"pid":19,"hostname":"29966661f171","reqId":"req-1t","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34876},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329677282,"pid":19,"hostname":"29966661f171","reqId":"req-1t","res":{"statusCode":200},"responseTime":1.7090409994125366,"msg":"request completed"}
{"level":30,"time":1754329677325,"pid":19,"hostname":"29966661f171","reqId":"req-1u","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34892},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329677326,"pid":19,"hostname":"29966661f171","reqId":"req-1u","res":{"statusCode":200},"responseTime":0.5673990026116371,"msg":"request completed"}
{"level":30,"time":1754329677364,"pid":19,"hostname":"29966661f171","reqId":"req-1v","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34906},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329677365,"pid":19,"hostname":"29966661f171","reqId":"req-1v","res":{"statusCode":200},"responseTime":0.47842399775981903,"msg":"request completed"}
{"level":30,"time":1754329677365,"pid":19,"hostname":"29966661f171","reqId":"req-1w","req":{"method":"POST","url":"/move","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34908},"msg":"incoming request"}
Moving player: 1 Direction: up Game ID: ai
{"level":30,"time":1754329677366,"pid":19,"hostname":"29966661f171","reqId":"req-1w","res":{"statusCode":200},"responseTime":0.4165769964456558,"msg":"request completed"}
{"level":30,"time":1754329677406,"pid":19,"hostname":"29966661f171","reqId":"req-1x","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34922},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329677407,"pid":19,"hostname":"29966661f171","reqId":"req-1x","res":{"statusCode":200},"responseTime":1.081106998026371,"msg":"request completed"}
{"level":30,"time":1754329677459,"pid":19,"hostname":"29966661f171","reqId":"req-1y","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34936},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329677460,"pid":19,"hostname":"29966661f171","reqId":"req-1y","res":{"statusCode":200},"responseTime":0.6157419979572296,"msg":"request completed"}
{"level":30,"time":1754329677502,"pid":19,"hostname":"29966661f171","reqId":"req-1z","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34946},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329677503,"pid":19,"hostname":"29966661f171","reqId":"req-1z","res":{"statusCode":200},"responseTime":1.0770770013332367,"msg":"request completed"}
{"level":30,"time":1754329677557,"pid":19,"hostname":"29966661f171","reqId":"req-20","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34952},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329677558,"pid":19,"hostname":"29966661f171","reqId":"req-20","res":{"statusCode":200},"responseTime":0.6603129953145981,"msg":"request completed"}
{"level":30,"time":1754329677599,"pid":19,"hostname":"29966661f171","reqId":"req-21","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34960},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329677601,"pid":19,"hostname":"29966661f171","reqId":"req-21","res":{"statusCode":200},"responseTime":1.0922449976205826,"msg":"request completed"}
{"level":30,"time":1754329677643,"pid":19,"hostname":"29966661f171","reqId":"req-22","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34970},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329677644,"pid":19,"hostname":"29966661f171","reqId":"req-22","res":{"statusCode":200},"responseTime":1.146797999739647,"msg":"request completed"}
{"level":30,"time":1754329677691,"pid":19,"hostname":"29966661f171","reqId":"req-23","req":{"method":"POST","url":"/move","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34976},"msg":"incoming request"}
Moving player: 1 Direction: down Game ID: ai
{"level":30,"time":1754329677692,"pid":19,"hostname":"29966661f171","reqId":"req-23","res":{"statusCode":200},"responseTime":1.349368005990982,"msg":"request completed"}
{"level":30,"time":1754329677697,"pid":19,"hostname":"29966661f171","reqId":"req-24","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34984},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329677698,"pid":19,"hostname":"29966661f171","reqId":"req-24","res":{"statusCode":200},"responseTime":1.176538996398449,"msg":"request completed"}
{"level":30,"time":1754329677744,"pid":19,"hostname":"29966661f171","reqId":"req-25","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34992},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329677746,"pid":19,"hostname":"29966661f171","reqId":"req-25","res":{"statusCode":200},"responseTime":1.4695950001478195,"msg":"request completed"}
{"level":30,"time":1754329677790,"pid":19,"hostname":"29966661f171","reqId":"req-26","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34996},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329677791,"pid":19,"hostname":"29966661f171","reqId":"req-26","res":{"statusCode":200},"responseTime":1.0048520043492317,"msg":"request completed"}
{"level":30,"time":1754329677834,"pid":19,"hostname":"29966661f171","reqId":"req-27","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35002},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329677835,"pid":19,"hostname":"29966661f171","reqId":"req-27","res":{"statusCode":200},"responseTime":1.082790993154049,"msg":"request completed"}
{"level":30,"time":1754329677878,"pid":19,"hostname":"29966661f171","reqId":"req-28","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35010},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329677880,"pid":19,"hostname":"29966661f171","reqId":"req-28","res":{"statusCode":200},"responseTime":1.0998480021953583,"msg":"request completed"}
{"level":30,"time":1754329677891,"pid":19,"hostname":"29966661f171","reqId":"req-29","req":{"method":"POST","url":"/move","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35014},"msg":"incoming request"}
Moving player: 1 Direction: down Game ID: ai
{"level":30,"time":1754329677891,"pid":19,"hostname":"29966661f171","reqId":"req-29","res":{"statusCode":200},"responseTime":0.6563439965248108,"msg":"request completed"}
{"level":30,"time":1754329677922,"pid":19,"hostname":"29966661f171","reqId":"req-2a","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35020},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329677923,"pid":19,"hostname":"29966661f171","reqId":"req-2a","res":{"statusCode":200},"responseTime":1.049696996808052,"msg":"request completed"}
{"level":30,"time":1754329677966,"pid":19,"hostname":"29966661f171","reqId":"req-2b","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35030},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329677967,"pid":19,"hostname":"29966661f171","reqId":"req-2b","res":{"statusCode":200},"responseTime":0.8281389996409416,"msg":"request completed"}
{"level":30,"time":1754329678008,"pid":19,"hostname":"29966661f171","reqId":"req-2c","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35040},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329678009,"pid":19,"hostname":"29966661f171","reqId":"req-2c","res":{"statusCode":200},"responseTime":0.8509270027279854,"msg":"request completed"}
{"level":30,"time":1754329678048,"pid":19,"hostname":"29966661f171","reqId":"req-2d","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35044},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329678048,"pid":19,"hostname":"29966661f171","reqId":"req-2d","res":{"statusCode":200},"responseTime":0.4594019949436188,"msg":"request completed"}
{"level":30,"time":1754329678062,"pid":19,"hostname":"29966661f171","reqId":"req-2e","req":{"method":"POST","url":"/move","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35054},"msg":"incoming request"}
Moving player: 1 Direction: down Game ID: ai
{"level":30,"time":1754329678063,"pid":19,"hostname":"29966661f171","reqId":"req-2e","res":{"statusCode":200},"responseTime":1.1114280000329018,"msg":"request completed"}
{"level":30,"time":1754329678092,"pid":19,"hostname":"29966661f171","reqId":"req-2f","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35062},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329678093,"pid":19,"hostname":"29966661f171","reqId":"req-2f","res":{"statusCode":200},"responseTime":1.3485070019960403,"msg":"request completed"}
{"level":30,"time":1754329678136,"pid":19,"hostname":"29966661f171","reqId":"req-2g","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35076},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329678137,"pid":19,"hostname":"29966661f171","reqId":"req-2g","res":{"statusCode":200},"responseTime":1.0951180011034012,"msg":"request completed"}
{"level":30,"time":1754329678180,"pid":19,"hostname":"29966661f171","reqId":"req-2h","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35080},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329678182,"pid":19,"hostname":"29966661f171","reqId":"req-2h","res":{"statusCode":200},"responseTime":1.242538996040821,"msg":"request completed"}
{"level":30,"time":1754329678224,"pid":19,"hostname":"29966661f171","reqId":"req-2i","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35094},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329678226,"pid":19,"hostname":"29966661f171","reqId":"req-2i","res":{"statusCode":200},"responseTime":1.3579799979925156,"msg":"request completed"}
{"level":30,"time":1754329678266,"pid":19,"hostname":"29966661f171","reqId":"req-2j","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35104},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329678267,"pid":19,"hostname":"29966661f171","reqId":"req-2j","res":{"statusCode":200},"responseTime":0.7467060014605522,"msg":"request completed"}
{"level":30,"time":1754329678309,"pid":19,"hostname":"29966661f171","reqId":"req-2k","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35112},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329678310,"pid":19,"hostname":"29966661f171","reqId":"req-2k","res":{"statusCode":200},"responseTime":1.4033450037240982,"msg":"request completed"}
{"level":30,"time":1754329678353,"pid":19,"hostname":"29966661f171","reqId":"req-2l","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35122},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329678355,"pid":19,"hostname":"29966661f171","reqId":"req-2l","res":{"statusCode":200},"responseTime":1.7327160015702248,"msg":"request completed"}
{"level":30,"time":1754329678370,"pid":19,"hostname":"29966661f171","reqId":"req-2m","req":{"method":"POST","url":"/move","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35132},"msg":"incoming request"}
Moving player: 1 Direction: up Game ID: ai
{"level":30,"time":1754329678370,"pid":19,"hostname":"29966661f171","reqId":"req-2m","res":{"statusCode":200},"responseTime":0.4796670004725456,"msg":"request completed"}
{"level":30,"time":1754329678408,"pid":19,"hostname":"29966661f171","reqId":"req-2n","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35146},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329678409,"pid":19,"hostname":"29966661f171","reqId":"req-2n","res":{"statusCode":200},"responseTime":1.0467220023274422,"msg":"request completed"}
{"level":30,"time":1754329678452,"pid":19,"hostname":"29966661f171","reqId":"req-2o","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35156},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329678454,"pid":19,"hostname":"29966661f171","reqId":"req-2o","res":{"statusCode":200},"responseTime":1.272015005350113,"msg":"request completed"}
{"level":30,"time":1754329678497,"pid":19,"hostname":"29966661f171","reqId":"req-2p","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35172},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329678499,"pid":19,"hostname":"29966661f171","reqId":"req-2p","res":{"statusCode":200},"responseTime":1.2401910051703453,"msg":"request completed"}
{"level":30,"time":1754329678545,"pid":19,"hostname":"29966661f171","reqId":"req-2q","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35180},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329678546,"pid":19,"hostname":"29966661f171","reqId":"req-2q","res":{"statusCode":200},"responseTime":1.0672350004315376,"msg":"request completed"}
{"level":30,"time":1754329678587,"pid":19,"hostname":"29966661f171","reqId":"req-2r","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35196},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329678587,"pid":19,"hostname":"29966661f171","reqId":"req-2r","res":{"statusCode":200},"responseTime":0.5920350030064583,"msg":"request completed"}
{"level":30,"time":1754329678590,"pid":19,"hostname":"29966661f171","reqId":"req-2s","req":{"method":"POST","url":"/move","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35206},"msg":"incoming request"}
Moving player: 1 Direction: up Game ID: ai
{"level":30,"time":1754329678591,"pid":19,"hostname":"29966661f171","reqId":"req-2s","res":{"statusCode":200},"responseTime":0.767144002020359,"msg":"request completed"}
{"level":30,"time":1754329678629,"pid":19,"hostname":"29966661f171","reqId":"req-2t","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35220},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329678631,"pid":19,"hostname":"29966661f171","reqId":"req-2t","res":{"statusCode":200},"responseTime":1.182386003434658,"msg":"request completed"}
{"level":30,"time":1754329678674,"pid":19,"hostname":"29966661f171","reqId":"req-2u","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35224},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329678675,"pid":19,"hostname":"29966661f171","reqId":"req-2u","res":{"statusCode":200},"responseTime":0.6939679980278015,"msg":"request completed"}
{"level":30,"time":1754329678716,"pid":19,"hostname":"29966661f171","reqId":"req-2v","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35232},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329678718,"pid":19,"hostname":"29966661f171","reqId":"req-2v","res":{"statusCode":200},"responseTime":1.2165300026535988,"msg":"request completed"}
{"level":30,"time":1754329678772,"pid":19,"hostname":"29966661f171","reqId":"req-2w","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35248},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329678773,"pid":19,"hostname":"29966661f171","reqId":"req-2w","res":{"statusCode":200},"responseTime":0.6334249973297119,"msg":"request completed"}
{"level":30,"time":1754329678792,"pid":19,"hostname":"29966661f171","reqId":"req-2x","req":{"method":"POST","url":"/move","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35252},"msg":"incoming request"}
Moving player: 1 Direction: up Game ID: ai
{"level":30,"time":1754329678793,"pid":19,"hostname":"29966661f171","reqId":"req-2x","res":{"statusCode":200},"responseTime":1.046634003520012,"msg":"request completed"}
{"level":30,"time":1754329678814,"pid":19,"hostname":"29966661f171","reqId":"req-2y","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35254},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329678815,"pid":19,"hostname":"29966661f171","reqId":"req-2y","res":{"statusCode":200},"responseTime":1.0630999952554703,"msg":"request completed"}
{"level":30,"time":1754329678857,"pid":19,"hostname":"29966661f171","reqId":"req-2z","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35260},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329678858,"pid":19,"hostname":"29966661f171","reqId":"req-2z","res":{"statusCode":200},"responseTime":1.0945160016417503,"msg":"request completed"}
{"level":30,"time":1754329678901,"pid":19,"hostname":"29966661f171","reqId":"req-30","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35264},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329678902,"pid":19,"hostname":"29966661f171","reqId":"req-30","res":{"statusCode":200},"responseTime":1.206717997789383,"msg":"request completed"}
{"level":30,"time":1754329678948,"pid":19,"hostname":"29966661f171","reqId":"req-31","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35272},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329678949,"pid":19,"hostname":"29966661f171","reqId":"req-31","res":{"statusCode":200},"responseTime":1.0992840006947517,"msg":"request completed"}
{"level":30,"time":1754329678994,"pid":19,"hostname":"29966661f171","reqId":"req-32","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35288},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329678995,"pid":19,"hostname":"29966661f171","reqId":"req-32","res":{"statusCode":200},"responseTime":1.0213430002331734,"msg":"request completed"}
{"level":30,"time":1754329679039,"pid":19,"hostname":"29966661f171","reqId":"req-33","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35298},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329679040,"pid":19,"hostname":"29966661f171","reqId":"req-33","res":{"statusCode":200},"responseTime":1.1684250012040138,"msg":"request completed"}
{"level":30,"time":1754329679082,"pid":19,"hostname":"29966661f171","reqId":"req-34","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35312},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329679083,"pid":19,"hostname":"29966661f171","reqId":"req-34","res":{"statusCode":200},"responseTime":0.8409100025892258,"msg":"request completed"}
{"level":30,"time":1754329679125,"pid":19,"hostname":"29966661f171","reqId":"req-35","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35326},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329679127,"pid":19,"hostname":"29966661f171","reqId":"req-35","res":{"statusCode":200},"responseTime":1.529220998287201,"msg":"request completed"}
{"level":30,"time":1754329679176,"pid":19,"hostname":"29966661f171","reqId":"req-36","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35342},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329679177,"pid":19,"hostname":"29966661f171","reqId":"req-36","res":{"statusCode":200},"responseTime":0.7081310003995895,"msg":"request completed"}
{"level":30,"time":1754329679221,"pid":19,"hostname":"29966661f171","reqId":"req-37","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35352},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329679223,"pid":19,"hostname":"29966661f171","reqId":"req-37","res":{"statusCode":200},"responseTime":1.3034659996628761,"msg":"request completed"}
{"level":30,"time":1754329679265,"pid":19,"hostname":"29966661f171","reqId":"req-38","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35368},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329679266,"pid":19,"hostname":"29966661f171","reqId":"req-38","res":{"statusCode":200},"responseTime":1.1323070004582405,"msg":"request completed"}
{"level":30,"time":1754329679298,"pid":19,"hostname":"29966661f171","reqId":"req-39","req":{"method":"POST","url":"/move","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35372},"msg":"incoming request"}
Moving player: 1 Direction: down Game ID: ai
{"level":30,"time":1754329679300,"pid":19,"hostname":"29966661f171","reqId":"req-39","res":{"statusCode":200},"responseTime":1.2884240001440048,"msg":"request completed"}
{"level":30,"time":1754329679316,"pid":19,"hostname":"29966661f171","reqId":"req-3a","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35388},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329679317,"pid":19,"hostname":"29966661f171","reqId":"req-3a","res":{"statusCode":200},"responseTime":0.6904440000653267,"msg":"request completed"}
{"level":30,"time":1754329679361,"pid":19,"hostname":"29966661f171","reqId":"req-3b","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35396},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329679362,"pid":19,"hostname":"29966661f171","reqId":"req-3b","res":{"statusCode":200},"responseTime":1.0417679995298386,"msg":"request completed"}
{"level":30,"time":1754329679405,"pid":19,"hostname":"29966661f171","reqId":"req-3c","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35404},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329679406,"pid":19,"hostname":"29966661f171","reqId":"req-3c","res":{"statusCode":200},"responseTime":1.1522260010242462,"msg":"request completed"}
{"level":30,"time":1754329679449,"pid":19,"hostname":"29966661f171","reqId":"req-3d","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35412},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329679450,"pid":19,"hostname":"29966661f171","reqId":"req-3d","res":{"statusCode":200},"responseTime":1.1812000051140785,"msg":"request completed"}
{"level":30,"time":1754329679493,"pid":19,"hostname":"29966661f171","reqId":"req-3e","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35418},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329679494,"pid":19,"hostname":"29966661f171","reqId":"req-3e","res":{"statusCode":200},"responseTime":1.2208250015974045,"msg":"request completed"}
{"level":30,"time":1754329679537,"pid":19,"hostname":"29966661f171","reqId":"req-3f","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35428},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329679538,"pid":19,"hostname":"29966661f171","reqId":"req-3f","res":{"statusCode":200},"responseTime":1.1104530021548271,"msg":"request completed"}
{"level":30,"time":1754329679580,"pid":19,"hostname":"29966661f171","reqId":"req-3g","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35444},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329679581,"pid":19,"hostname":"29966661f171","reqId":"req-3g","res":{"statusCode":200},"responseTime":0.9061660021543503,"msg":"request completed"}
{"level":30,"time":1754329679623,"pid":19,"hostname":"29966661f171","reqId":"req-3h","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35456},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329679624,"pid":19,"hostname":"29966661f171","reqId":"req-3h","res":{"statusCode":200},"responseTime":1.18121999502182,"msg":"request completed"}
{"level":30,"time":1754329679666,"pid":19,"hostname":"29966661f171","reqId":"req-3i","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35464},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329679667,"pid":19,"hostname":"29966661f171","reqId":"req-3i","res":{"statusCode":200},"responseTime":1.0807119980454445,"msg":"request completed"}
{"level":30,"time":1754329679720,"pid":19,"hostname":"29966661f171","reqId":"req-3j","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35474},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329679721,"pid":19,"hostname":"29966661f171","reqId":"req-3j","res":{"statusCode":200},"responseTime":1.216049998998642,"msg":"request completed"}
{"level":30,"time":1754329679765,"pid":19,"hostname":"29966661f171","reqId":"req-3k","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35486},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329679766,"pid":19,"hostname":"29966661f171","reqId":"req-3k","res":{"statusCode":200},"responseTime":1.0788879990577698,"msg":"request completed"}
{"level":30,"time":1754329679809,"pid":19,"hostname":"29966661f171","reqId":"req-3l","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35500},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329679810,"pid":19,"hostname":"29966661f171","reqId":"req-3l","res":{"statusCode":200},"responseTime":1.2062560021877289,"msg":"request completed"}
{"level":30,"time":1754329679853,"pid":19,"hostname":"29966661f171","reqId":"req-3m","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35516},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329679854,"pid":19,"hostname":"29966661f171","reqId":"req-3m","res":{"statusCode":200},"responseTime":1.0438319966197014,"msg":"request completed"}
{"level":30,"time":1754329679898,"pid":19,"hostname":"29966661f171","reqId":"req-3n","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35532},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329679899,"pid":19,"hostname":"29966661f171","reqId":"req-3n","res":{"statusCode":200},"responseTime":1.186939999461174,"msg":"request completed"}
{"level":30,"time":1754329679946,"pid":19,"hostname":"29966661f171","reqId":"req-3o","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35546},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329679947,"pid":19,"hostname":"29966661f171","reqId":"req-3o","res":{"statusCode":200},"responseTime":1.0390489995479584,"msg":"request completed"}
{"level":30,"time":1754329679989,"pid":19,"hostname":"29966661f171","reqId":"req-3p","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35556},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329679991,"pid":19,"hostname":"29966661f171","reqId":"req-3p","res":{"statusCode":200},"responseTime":0.9512500017881393,"msg":"request completed"}
{"level":30,"time":1754329680034,"pid":19,"hostname":"29966661f171","reqId":"req-3q","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35564},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329680035,"pid":19,"hostname":"29966661f171","reqId":"req-3q","res":{"statusCode":200},"responseTime":1.1475640013813972,"msg":"request completed"}
{"level":30,"time":1754329680086,"pid":19,"hostname":"29966661f171","reqId":"req-3r","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35580},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329680087,"pid":19,"hostname":"29966661f171","reqId":"req-3r","res":{"statusCode":200},"responseTime":0.5833900049328804,"msg":"request completed"}
{"level":30,"time":1754329680128,"pid":19,"hostname":"29966661f171","reqId":"req-3s","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35592},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329680129,"pid":19,"hostname":"29966661f171","reqId":"req-3s","res":{"statusCode":200},"responseTime":1.010161004960537,"msg":"request completed"}
{"level":30,"time":1754329680152,"pid":19,"hostname":"29966661f171","reqId":"req-3t","req":{"method":"POST","url":"/move","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35604},"msg":"incoming request"}
Moving player: 1 Direction: down Game ID: ai
{"level":30,"time":1754329680154,"pid":19,"hostname":"29966661f171","reqId":"req-3t","res":{"statusCode":200},"responseTime":1.4706940054893494,"msg":"request completed"}
{"level":30,"time":1754329680170,"pid":19,"hostname":"29966661f171","reqId":"req-3u","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35610},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329680171,"pid":19,"hostname":"29966661f171","reqId":"req-3u","res":{"statusCode":200},"responseTime":0.9694460034370422,"msg":"request completed"}
{"level":30,"time":1754329680220,"pid":19,"hostname":"29966661f171","reqId":"req-3v","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35612},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329680222,"pid":19,"hostname":"29966661f171","reqId":"req-3v","res":{"statusCode":200},"responseTime":1.1499869972467422,"msg":"request completed"}
{"level":30,"time":1754329680265,"pid":19,"hostname":"29966661f171","reqId":"req-3w","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35626},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329680266,"pid":19,"hostname":"29966661f171","reqId":"req-3w","res":{"statusCode":200},"responseTime":1.0403419956564903,"msg":"request completed"}
{"level":30,"time":1754329680310,"pid":19,"hostname":"29966661f171","reqId":"req-3x","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35634},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329680311,"pid":19,"hostname":"29966661f171","reqId":"req-3x","res":{"statusCode":200},"responseTime":1.021306999027729,"msg":"request completed"}
{"level":30,"time":1754329680353,"pid":19,"hostname":"29966661f171","reqId":"req-3y","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35638},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329680354,"pid":19,"hostname":"29966661f171","reqId":"req-3y","res":{"statusCode":200},"responseTime":1.0340320020914078,"msg":"request completed"}
{"level":30,"time":1754329680398,"pid":19,"hostname":"29966661f171","reqId":"req-3z","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35646},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329680399,"pid":19,"hostname":"29966661f171","reqId":"req-3z","res":{"statusCode":200},"responseTime":1.1924280002713203,"msg":"request completed"}
{"level":30,"time":1754329680445,"pid":19,"hostname":"29966661f171","reqId":"req-40","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35658},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329680446,"pid":19,"hostname":"29966661f171","reqId":"req-40","res":{"statusCode":200},"responseTime":1.036480002105236,"msg":"request completed"}
{"level":30,"time":1754329680487,"pid":19,"hostname":"29966661f171","reqId":"req-41","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35662},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329680488,"pid":19,"hostname":"29966661f171","reqId":"req-41","res":{"statusCode":200},"responseTime":0.8438820019364357,"msg":"request completed"}
{"level":30,"time":1754329680531,"pid":19,"hostname":"29966661f171","reqId":"req-42","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35664},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329680532,"pid":19,"hostname":"29966661f171","reqId":"req-42","res":{"statusCode":200},"responseTime":1.0335909947752953,"msg":"request completed"}
{"level":30,"time":1754329680576,"pid":19,"hostname":"29966661f171","reqId":"req-43","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35672},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329680577,"pid":19,"hostname":"29966661f171","reqId":"req-43","res":{"statusCode":200},"responseTime":1.0234619975090027,"msg":"request completed"}
{"level":30,"time":1754329680627,"pid":19,"hostname":"29966661f171","reqId":"req-44","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35678},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329680627,"pid":19,"hostname":"29966661f171","reqId":"req-44","res":{"statusCode":200},"responseTime":0.5982989966869354,"msg":"request completed"}
{"level":30,"time":1754329680673,"pid":19,"hostname":"29966661f171","reqId":"req-45","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35694},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329680674,"pid":19,"hostname":"29966661f171","reqId":"req-45","res":{"statusCode":200},"responseTime":1.1685349941253662,"msg":"request completed"}
{"level":30,"time":1754329680718,"pid":19,"hostname":"29966661f171","reqId":"req-46","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35696},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329680720,"pid":19,"hostname":"29966661f171","reqId":"req-46","res":{"statusCode":200},"responseTime":1.190760999917984,"msg":"request completed"}
{"level":30,"time":1754329680765,"pid":19,"hostname":"29966661f171","reqId":"req-47","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35706},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329680767,"pid":19,"hostname":"29966661f171","reqId":"req-47","res":{"statusCode":200},"responseTime":1.1049589961767197,"msg":"request completed"}
{"level":30,"time":1754329680809,"pid":19,"hostname":"29966661f171","reqId":"req-48","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35712},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329680810,"pid":19,"hostname":"29966661f171","reqId":"req-48","res":{"statusCode":200},"responseTime":0.8008389994502068,"msg":"request completed"}
{"level":30,"time":1754329680852,"pid":19,"hostname":"29966661f171","reqId":"req-49","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35726},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329680853,"pid":19,"hostname":"29966661f171","reqId":"req-49","res":{"statusCode":200},"responseTime":1.0157219991087914,"msg":"request completed"}
{"level":30,"time":1754329680895,"pid":19,"hostname":"29966661f171","reqId":"req-4a","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35732},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329680895,"pid":19,"hostname":"29966661f171","reqId":"req-4a","res":{"statusCode":200},"responseTime":0.8480539992451668,"msg":"request completed"}
{"level":30,"time":1754329680938,"pid":19,"hostname":"29966661f171","reqId":"req-4b","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35748},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329680940,"pid":19,"hostname":"29966661f171","reqId":"req-4b","res":{"statusCode":200},"responseTime":1.7626729980111122,"msg":"request completed"}
{"level":30,"time":1754329680993,"pid":19,"hostname":"29966661f171","reqId":"req-4c","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35754},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329680994,"pid":19,"hostname":"29966661f171","reqId":"req-4c","res":{"statusCode":200},"responseTime":0.5343919992446899,"msg":"request completed"}
{"level":30,"time":1754329681035,"pid":19,"hostname":"29966661f171","reqId":"req-4d","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35764},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329681037,"pid":19,"hostname":"29966661f171","reqId":"req-4d","res":{"statusCode":200},"responseTime":1.0525230020284653,"msg":"request completed"}
{"level":30,"time":1754329681081,"pid":19,"hostname":"29966661f171","reqId":"req-4e","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35776},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329681082,"pid":19,"hostname":"29966661f171","reqId":"req-4e","res":{"statusCode":200},"responseTime":1.0255139991641045,"msg":"request completed"}
{"level":30,"time":1754329681132,"pid":19,"hostname":"29966661f171","reqId":"req-4f","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35790},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329681133,"pid":19,"hostname":"29966661f171","reqId":"req-4f","res":{"statusCode":200},"responseTime":1.059398002922535,"msg":"request completed"}
{"level":30,"time":1754329681177,"pid":19,"hostname":"29966661f171","reqId":"req-4g","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35796},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329681178,"pid":19,"hostname":"29966661f171","reqId":"req-4g","res":{"statusCode":200},"responseTime":1.0197430029511452,"msg":"request completed"}
{"level":30,"time":1754329681224,"pid":19,"hostname":"29966661f171","reqId":"req-4h","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35810},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329681225,"pid":19,"hostname":"29966661f171","reqId":"req-4h","res":{"statusCode":200},"responseTime":1.002082996070385,"msg":"request completed"}
{"level":30,"time":1754329681268,"pid":19,"hostname":"29966661f171","reqId":"req-4i","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35818},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329681269,"pid":19,"hostname":"29966661f171","reqId":"req-4i","res":{"statusCode":200},"responseTime":0.9876480028033257,"msg":"request completed"}
{"level":30,"time":1754329681311,"pid":19,"hostname":"29966661f171","reqId":"req-4j","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35820},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329681312,"pid":19,"hostname":"29966661f171","reqId":"req-4j","res":{"statusCode":200},"responseTime":1.0656699985265732,"msg":"request completed"}
{"level":30,"time":1754329681355,"pid":19,"hostname":"29966661f171","reqId":"req-4k","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35824},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329681356,"pid":19,"hostname":"29966661f171","reqId":"req-4k","res":{"statusCode":200},"responseTime":1.008542001247406,"msg":"request completed"}
{"level":30,"time":1754329681402,"pid":19,"hostname":"29966661f171","reqId":"req-4l","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35832},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329681403,"pid":19,"hostname":"29966661f171","reqId":"req-4l","res":{"statusCode":200},"responseTime":0.8991739973425865,"msg":"request completed"}
{"level":30,"time":1754329681447,"pid":19,"hostname":"29966661f171","reqId":"req-4m","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35840},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329681449,"pid":19,"hostname":"29966661f171","reqId":"req-4m","res":{"statusCode":200},"responseTime":1.0454360023140907,"msg":"request completed"}
{"level":30,"time":1754329681498,"pid":19,"hostname":"29966661f171","reqId":"req-4n","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35842},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329681499,"pid":19,"hostname":"29966661f171","reqId":"req-4n","res":{"statusCode":200},"responseTime":0.7045409977436066,"msg":"request completed"}
{"level":30,"time":1754329681541,"pid":19,"hostname":"29966661f171","reqId":"req-4o","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35846},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329681542,"pid":19,"hostname":"29966661f171","reqId":"req-4o","res":{"statusCode":200},"responseTime":1.0335300043225288,"msg":"request completed"}
{"level":30,"time":1754329681585,"pid":19,"hostname":"29966661f171","reqId":"req-4p","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35858},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329681586,"pid":19,"hostname":"29966661f171","reqId":"req-4p","res":{"statusCode":200},"responseTime":1.02759899944067,"msg":"request completed"}
{"level":30,"time":1754329681628,"pid":19,"hostname":"29966661f171","reqId":"req-4q","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35872},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329681630,"pid":19,"hostname":"29966661f171","reqId":"req-4q","res":{"statusCode":200},"responseTime":1.1499380022287369,"msg":"request completed"}
{"level":30,"time":1754329681672,"pid":19,"hostname":"29966661f171","reqId":"req-4r","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35876},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329681673,"pid":19,"hostname":"29966661f171","reqId":"req-4r","res":{"statusCode":200},"responseTime":0.9944439977407455,"msg":"request completed"}
{"level":30,"time":1754329681717,"pid":19,"hostname":"29966661f171","reqId":"req-4s","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35888},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329681718,"pid":19,"hostname":"29966661f171","reqId":"req-4s","res":{"statusCode":200},"responseTime":1.2053509950637817,"msg":"request completed"}
{"level":30,"time":1754329681765,"pid":19,"hostname":"29966661f171","reqId":"req-4t","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35904},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329681766,"pid":19,"hostname":"29966661f171","reqId":"req-4t","res":{"statusCode":200},"responseTime":1.013944000005722,"msg":"request completed"}
{"level":30,"time":1754329681809,"pid":19,"hostname":"29966661f171","reqId":"req-4u","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35912},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329681810,"pid":19,"hostname":"29966661f171","reqId":"req-4u","res":{"statusCode":200},"responseTime":0.8228370025753975,"msg":"request completed"}
{"level":30,"time":1754329681852,"pid":19,"hostname":"29966661f171","reqId":"req-4v","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35920},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329681853,"pid":19,"hostname":"29966661f171","reqId":"req-4v","res":{"statusCode":200},"responseTime":1.0319820046424866,"msg":"request completed"}
{"level":30,"time":1754329681903,"pid":19,"hostname":"29966661f171","reqId":"req-4w","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35932},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329681904,"pid":19,"hostname":"29966661f171","reqId":"req-4w","res":{"statusCode":200},"responseTime":0.6579260006546974,"msg":"request completed"}
{"level":30,"time":1754329681946,"pid":19,"hostname":"29966661f171","reqId":"req-4x","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35942},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329681947,"pid":19,"hostname":"29966661f171","reqId":"req-4x","res":{"statusCode":200},"responseTime":1.0389069989323616,"msg":"request completed"}
{"level":30,"time":1754329681991,"pid":19,"hostname":"29966661f171","reqId":"req-4y","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35952},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329681992,"pid":19,"hostname":"29966661f171","reqId":"req-4y","res":{"statusCode":200},"responseTime":0.9923250004649162,"msg":"request completed"}
{"level":30,"time":1754329682042,"pid":19,"hostname":"29966661f171","reqId":"req-4z","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35968},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329682043,"pid":19,"hostname":"29966661f171","reqId":"req-4z","res":{"statusCode":200},"responseTime":1.0732309967279434,"msg":"request completed"}
{"level":30,"time":1754329682087,"pid":19,"hostname":"29966661f171","reqId":"req-50","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35978},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329682088,"pid":19,"hostname":"29966661f171","reqId":"req-50","res":{"statusCode":200},"responseTime":1.037419006228447,"msg":"request completed"}
{"level":30,"time":1754329682134,"pid":19,"hostname":"29966661f171","reqId":"req-51","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35992},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329682135,"pid":19,"hostname":"29966661f171","reqId":"req-51","res":{"statusCode":200},"responseTime":1.0541679933667183,"msg":"request completed"}
{"level":30,"time":1754329682178,"pid":19,"hostname":"29966661f171","reqId":"req-52","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":36008},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329682179,"pid":19,"hostname":"29966661f171","reqId":"req-52","res":{"statusCode":200},"responseTime":0.9852679967880249,"msg":"request completed"}
{"level":30,"time":1754329682223,"pid":19,"hostname":"29966661f171","reqId":"req-53","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":36024},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329682224,"pid":19,"hostname":"29966661f171","reqId":"req-53","res":{"statusCode":200},"responseTime":1.2564669996500015,"msg":"request completed"}
{"level":30,"time":1754329682270,"pid":19,"hostname":"29966661f171","reqId":"req-54","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":36040},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329682271,"pid":19,"hostname":"29966661f171","reqId":"req-54","res":{"statusCode":200},"responseTime":0.9699199944734573,"msg":"request completed"}
{"level":30,"time":1754329682317,"pid":19,"hostname":"29966661f171","reqId":"req-55","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":36052},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329682318,"pid":19,"hostname":"29966661f171","reqId":"req-55","res":{"statusCode":200},"responseTime":0.7607770040631294,"msg":"request completed"}
{"level":30,"time":1754329682361,"pid":19,"hostname":"29966661f171","reqId":"req-56","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":36060},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329682362,"pid":19,"hostname":"29966661f171","reqId":"req-56","res":{"statusCode":200},"responseTime":1.013822004199028,"msg":"request completed"}
{"level":30,"time":1754329682410,"pid":19,"hostname":"29966661f171","reqId":"req-57","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":36072},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329682411,"pid":19,"hostname":"29966661f171","reqId":"req-57","res":{"statusCode":200},"responseTime":0.986502006649971,"msg":"request completed"}
{"level":30,"time":1754329682454,"pid":19,"hostname":"29966661f171","reqId":"req-58","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":36086},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329682456,"pid":19,"hostname":"29966661f171","reqId":"req-58","res":{"statusCode":200},"responseTime":1.284410998225212,"msg":"request completed"}
{"level":30,"time":1754329682498,"pid":19,"hostname":"29966661f171","reqId":"req-59","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":36094},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329682500,"pid":19,"hostname":"29966661f171","reqId":"req-59","res":{"statusCode":200},"responseTime":1.3604049980640411,"msg":"request completed"}
{"level":30,"time":1754329682548,"pid":19,"hostname":"29966661f171","reqId":"req-5a","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":36108},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329682550,"pid":19,"hostname":"29966661f171","reqId":"req-5a","res":{"statusCode":200},"responseTime":1.5741140022873878,"msg":"request completed"}
{"level":30,"time":1754329682593,"pid":19,"hostname":"29966661f171","reqId":"req-5b","req":{"method":"POST","url":"/move","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":36114},"msg":"incoming request"}
Moving player: 1 Direction: up Game ID: ai
{"level":30,"time":1754329682595,"pid":19,"hostname":"29966661f171","reqId":"req-5b","res":{"statusCode":200},"responseTime":1.5224439948797226,"msg":"request completed"}
{"level":30,"time":1754329682595,"pid":19,"hostname":"29966661f171","reqId":"req-5c","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":36122},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329682596,"pid":19,"hostname":"29966661f171","reqId":"req-5c","res":{"statusCode":200},"responseTime":0.860275000333786,"msg":"request completed"}
{"level":30,"time":1754329682640,"pid":19,"hostname":"29966661f171","reqId":"req-5d","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":33672},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329682641,"pid":19,"hostname":"29966661f171","reqId":"req-5d","res":{"statusCode":200},"responseTime":0.670474998652935,"msg":"request completed"}
{"level":30,"time":1754329682684,"pid":19,"hostname":"29966661f171","reqId":"req-5e","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":33684},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329682685,"pid":19,"hostname":"29966661f171","reqId":"req-5e","res":{"statusCode":200},"responseTime":0.9584549963474274,"msg":"request completed"}
{"level":30,"time":1754329682728,"pid":19,"hostname":"29966661f171","reqId":"req-5f","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":33688},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329682729,"pid":19,"hostname":"29966661f171","reqId":"req-5f","res":{"statusCode":200},"responseTime":1.076151005923748,"msg":"request completed"}
{"level":30,"time":1754329682772,"pid":19,"hostname":"29966661f171","reqId":"req-5g","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":33700},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329682773,"pid":19,"hostname":"29966661f171","reqId":"req-5g","res":{"statusCode":200},"responseTime":0.9533400014042854,"msg":"request completed"}
{"level":30,"time":1754329682814,"pid":19,"hostname":"29966661f171","reqId":"req-5h","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":33708},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329682815,"pid":19,"hostname":"29966661f171","reqId":"req-5h","res":{"statusCode":200},"responseTime":0.8914569988846779,"msg":"request completed"}
{"level":30,"time":1754329682857,"pid":19,"hostname":"29966661f171","reqId":"req-5i","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":33716},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329682858,"pid":19,"hostname":"29966661f171","reqId":"req-5i","res":{"statusCode":200},"responseTime":0.999379001557827,"msg":"request completed"}
{"level":30,"time":1754329682900,"pid":19,"hostname":"29966661f171","reqId":"req-5j","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":33726},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329682902,"pid":19,"hostname":"29966661f171","reqId":"req-5j","res":{"statusCode":200},"responseTime":2.034300997853279,"msg":"request completed"}
{"level":30,"time":1754329682905,"pid":19,"hostname":"29966661f171","reqId":"req-5k","req":{"method":"POST","url":"/move","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":33730},"msg":"incoming request"}
Moving player: 1 Direction: up Game ID: ai
{"level":30,"time":1754329682906,"pid":19,"hostname":"29966661f171","reqId":"req-5k","res":{"statusCode":200},"responseTime":1.3287839964032173,"msg":"request completed"}
{"level":30,"time":1754329682946,"pid":19,"hostname":"29966661f171","reqId":"req-5l","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":33746},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329682947,"pid":19,"hostname":"29966661f171","reqId":"req-5l","res":{"statusCode":200},"responseTime":1.0217299982905388,"msg":"request completed"}
{"level":30,"time":1754329682990,"pid":19,"hostname":"29966661f171","reqId":"req-5m","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":33758},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329682991,"pid":19,"hostname":"29966661f171","reqId":"req-5m","res":{"statusCode":200},"responseTime":0.9701649993658066,"msg":"request completed"}
{"level":30,"time":1754329683035,"pid":19,"hostname":"29966661f171","reqId":"req-5n","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":33768},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329683036,"pid":19,"hostname":"29966661f171","reqId":"req-5n","res":{"statusCode":200},"responseTime":1.317891001701355,"msg":"request completed"}
{"level":30,"time":1754329683082,"pid":19,"hostname":"29966661f171","reqId":"req-5o","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":33778},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329683083,"pid":19,"hostname":"29966661f171","reqId":"req-5o","res":{"statusCode":200},"responseTime":0.9854760020971298,"msg":"request completed"}
{"level":30,"time":1754329683126,"pid":19,"hostname":"29966661f171","reqId":"req-5p","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":33788},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329683128,"pid":19,"hostname":"29966661f171","reqId":"req-5p","res":{"statusCode":200},"responseTime":1.2741260007023811,"msg":"request completed"}
{"level":30,"time":1754329683170,"pid":19,"hostname":"29966661f171","reqId":"req-5q","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":33802},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329683172,"pid":19,"hostname":"29966661f171","reqId":"req-5q","res":{"statusCode":200},"responseTime":1.2355749979615211,"msg":"request completed"}
{"level":30,"time":1754329683218,"pid":19,"hostname":"29966661f171","reqId":"req-5r","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":33818},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329683219,"pid":19,"hostname":"29966661f171","reqId":"req-5r","res":{"statusCode":200},"responseTime":0.9694099947810173,"msg":"request completed"}
{"level":30,"time":1754329683261,"pid":19,"hostname":"29966661f171","reqId":"req-5s","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":33830},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329683263,"pid":19,"hostname":"29966661f171","reqId":"req-5s","res":{"statusCode":200},"responseTime":1.2558680027723312,"msg":"request completed"}
{"level":30,"time":1754329683306,"pid":19,"hostname":"29966661f171","reqId":"req-5t","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":33834},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329683307,"pid":19,"hostname":"29966661f171","reqId":"req-5t","res":{"statusCode":200},"responseTime":1.0338789969682693,"msg":"request completed"}
{"level":30,"time":1754329683350,"pid":19,"hostname":"29966661f171","reqId":"req-5u","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":33842},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329683351,"pid":19,"hostname":"29966661f171","reqId":"req-5u","res":{"statusCode":200},"responseTime":1.0348140001296997,"msg":"request completed"}
{"level":30,"time":1754329683402,"pid":19,"hostname":"29966661f171","reqId":"req-5v","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":33856},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329683403,"pid":19,"hostname":"29966661f171","reqId":"req-5v","res":{"statusCode":200},"responseTime":1.0390420034527779,"msg":"request completed"}
{"level":30,"time":1754329683447,"pid":19,"hostname":"29966661f171","reqId":"req-5w","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":33860},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329683448,"pid":19,"hostname":"29966661f171","reqId":"req-5w","res":{"statusCode":200},"responseTime":1.0699409991502762,"msg":"request completed"}
{"level":30,"time":1754329683495,"pid":19,"hostname":"29966661f171","reqId":"req-5x","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":33874},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329683497,"pid":19,"hostname":"29966661f171","reqId":"req-5x","res":{"statusCode":200},"responseTime":1.0181099995970726,"msg":"request completed"}
{"level":30,"time":1754329683498,"pid":19,"hostname":"29966661f171","reqId":"req-5y","req":{"method":"POST","url":"/move","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":33890},"msg":"incoming request"}
Moving player: 1 Direction: down Game ID: ai
{"level":30,"time":1754329683500,"pid":19,"hostname":"29966661f171","reqId":"req-5y","res":{"statusCode":200},"responseTime":1.330989994108677,"msg":"request completed"}
{"level":30,"time":1754329683540,"pid":19,"hostname":"29966661f171","reqId":"req-5z","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":33900},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329683542,"pid":19,"hostname":"29966661f171","reqId":"req-5z","res":{"statusCode":200},"responseTime":1.2823000028729439,"msg":"request completed"}
{"level":30,"time":1754329683586,"pid":19,"hostname":"29966661f171","reqId":"req-60","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":33912},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329683587,"pid":19,"hostname":"29966661f171","reqId":"req-60","res":{"statusCode":200},"responseTime":1.0376809984445572,"msg":"request completed"}
{"level":30,"time":1754329683629,"pid":19,"hostname":"29966661f171","reqId":"req-61","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":33926},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329683630,"pid":19,"hostname":"29966661f171","reqId":"req-61","res":{"statusCode":200},"responseTime":0.8758749961853027,"msg":"request completed"}
{"level":30,"time":1754329683673,"pid":19,"hostname":"29966661f171","reqId":"req-62","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":33934},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329683674,"pid":19,"hostname":"29966661f171","reqId":"req-62","res":{"statusCode":200},"responseTime":1.3768270015716553,"msg":"request completed"}
{"level":30,"time":1754329683717,"pid":19,"hostname":"29966661f171","reqId":"req-63","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":33940},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329683719,"pid":19,"hostname":"29966661f171","reqId":"req-63","res":{"statusCode":200},"responseTime":1.1939989998936653,"msg":"request completed"}
{"level":30,"time":1754329683769,"pid":19,"hostname":"29966661f171","reqId":"req-64","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":33952},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329683770,"pid":19,"hostname":"29966661f171","reqId":"req-64","res":{"statusCode":200},"responseTime":1.5808139964938164,"msg":"request completed"}
{"level":30,"time":1754329683813,"pid":19,"hostname":"29966661f171","reqId":"req-65","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":33962},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329683814,"pid":19,"hostname":"29966661f171","reqId":"req-65","res":{"statusCode":200},"responseTime":1.0145829990506172,"msg":"request completed"}
{"level":30,"time":1754329683830,"pid":19,"hostname":"29966661f171","reqId":"req-66","req":{"method":"POST","url":"/move","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":33968},"msg":"incoming request"}
Moving player: 1 Direction: down Game ID: ai
{"level":30,"time":1754329683831,"pid":19,"hostname":"29966661f171","reqId":"req-66","res":{"statusCode":200},"responseTime":0.451213002204895,"msg":"request completed"}
{"level":30,"time":1754329683858,"pid":19,"hostname":"29966661f171","reqId":"req-67","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":33976},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329683859,"pid":19,"hostname":"29966661f171","reqId":"req-67","res":{"statusCode":200},"responseTime":1.0846639946103096,"msg":"request completed"}
{"level":30,"time":1754329683900,"pid":19,"hostname":"29966661f171","reqId":"req-68","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":33978},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329683901,"pid":19,"hostname":"29966661f171","reqId":"req-68","res":{"statusCode":200},"responseTime":0.9942580014467239,"msg":"request completed"}
{"level":30,"time":1754329683944,"pid":19,"hostname":"29966661f171","reqId":"req-69","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":33988},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329683945,"pid":19,"hostname":"29966661f171","reqId":"req-69","res":{"statusCode":200},"responseTime":1.0988980010151863,"msg":"request completed"}
{"level":30,"time":1754329683987,"pid":19,"hostname":"29966661f171","reqId":"req-6a","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":33990},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329683988,"pid":19,"hostname":"29966661f171","reqId":"req-6a","res":{"statusCode":200},"responseTime":0.9463439956307411,"msg":"request completed"}
{"level":30,"time":1754329684034,"pid":19,"hostname":"29966661f171","reqId":"req-6b","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":33996},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329684035,"pid":19,"hostname":"29966661f171","reqId":"req-6b","res":{"statusCode":200},"responseTime":1.0582960024476051,"msg":"request completed"}
{"level":30,"time":1754329684082,"pid":19,"hostname":"29966661f171","reqId":"req-6c","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":33998},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329684083,"pid":19,"hostname":"29966661f171","reqId":"req-6c","res":{"statusCode":200},"responseTime":0.9726359993219376,"msg":"request completed"}
{"level":30,"time":1754329684133,"pid":19,"hostname":"29966661f171","reqId":"req-6d","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34006},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329684133,"pid":19,"hostname":"29966661f171","reqId":"req-6d","res":{"statusCode":200},"responseTime":0.5502840057015419,"msg":"request completed"}
{"level":30,"time":1754329684175,"pid":19,"hostname":"29966661f171","reqId":"req-6e","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34012},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329684176,"pid":19,"hostname":"29966661f171","reqId":"req-6e","res":{"statusCode":200},"responseTime":0.9582860022783279,"msg":"request completed"}
{"level":30,"time":1754329684219,"pid":19,"hostname":"29966661f171","reqId":"req-6f","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34014},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329684220,"pid":19,"hostname":"29966661f171","reqId":"req-6f","res":{"statusCode":200},"responseTime":0.967801995575428,"msg":"request completed"}
{"level":30,"time":1754329684270,"pid":19,"hostname":"29966661f171","reqId":"req-6g","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34030},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329684271,"pid":19,"hostname":"29966661f171","reqId":"req-6g","res":{"statusCode":200},"responseTime":0.9509970024228096,"msg":"request completed"}
{"level":30,"time":1754329684315,"pid":19,"hostname":"29966661f171","reqId":"req-6h","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34040},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329684316,"pid":19,"hostname":"29966661f171","reqId":"req-6h","res":{"statusCode":200},"responseTime":0.9634979963302612,"msg":"request completed"}
{"level":30,"time":1754329684360,"pid":19,"hostname":"29966661f171","reqId":"req-6i","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34042},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329684361,"pid":19,"hostname":"29966661f171","reqId":"req-6i","res":{"statusCode":200},"responseTime":0.9689510017633438,"msg":"request completed"}
{"level":30,"time":1754329684407,"pid":19,"hostname":"29966661f171","reqId":"req-6j","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34052},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329684408,"pid":19,"hostname":"29966661f171","reqId":"req-6j","res":{"statusCode":200},"responseTime":0.9775979965925217,"msg":"request completed"}
{"level":30,"time":1754329684424,"pid":19,"hostname":"29966661f171","reqId":"req-6k","req":{"method":"POST","url":"/move","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34064},"msg":"incoming request"}
Moving player: 1 Direction: up Game ID: ai
{"level":30,"time":1754329684426,"pid":19,"hostname":"29966661f171","reqId":"req-6k","res":{"statusCode":200},"responseTime":1.0236980020999908,"msg":"request completed"}
{"level":30,"time":1754329684449,"pid":19,"hostname":"29966661f171","reqId":"req-6l","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34080},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329684450,"pid":19,"hostname":"29966661f171","reqId":"req-6l","res":{"statusCode":200},"responseTime":0.6784550026059151,"msg":"request completed"}
{"level":30,"time":1754329684490,"pid":19,"hostname":"29966661f171","reqId":"req-6m","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34082},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329684491,"pid":19,"hostname":"29966661f171","reqId":"req-6m","res":{"statusCode":200},"responseTime":0.9607330039143562,"msg":"request completed"}
{"level":30,"time":1754329684537,"pid":19,"hostname":"29966661f171","reqId":"req-6n","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34098},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329684537,"pid":19,"hostname":"29966661f171","reqId":"req-6n","res":{"statusCode":200},"responseTime":0.6294960007071495,"msg":"request completed"}
{"level":30,"time":1754329684579,"pid":19,"hostname":"29966661f171","reqId":"req-6o","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34106},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329684580,"pid":19,"hostname":"29966661f171","reqId":"req-6o","res":{"statusCode":200},"responseTime":0.9416100010275841,"msg":"request completed"}
{"level":30,"time":1754329684622,"pid":19,"hostname":"29966661f171","reqId":"req-6p","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34108},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329684623,"pid":19,"hostname":"29966661f171","reqId":"req-6p","res":{"statusCode":200},"responseTime":0.9520880058407784,"msg":"request completed"}
{"level":30,"time":1754329684657,"pid":19,"hostname":"29966661f171","reqId":"req-6q","req":{"method":"POST","url":"/move","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34110},"msg":"incoming request"}
Moving player: 1 Direction: up Game ID: ai
{"level":30,"time":1754329684659,"pid":19,"hostname":"29966661f171","reqId":"req-6q","res":{"statusCode":200},"responseTime":1.2895429953932762,"msg":"request completed"}
{"level":30,"time":1754329684664,"pid":19,"hostname":"29966661f171","reqId":"req-6r","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34120},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329684664,"pid":19,"hostname":"29966661f171","reqId":"req-6r","res":{"statusCode":200},"responseTime":0.6324919983744621,"msg":"request completed"}
{"level":30,"time":1754329684705,"pid":19,"hostname":"29966661f171","reqId":"req-6s","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34122},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329684706,"pid":19,"hostname":"29966661f171","reqId":"req-6s","res":{"statusCode":200},"responseTime":1.397430993616581,"msg":"request completed"}
{"level":30,"time":1754329684750,"pid":19,"hostname":"29966661f171","reqId":"req-6t","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34138},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329684751,"pid":19,"hostname":"29966661f171","reqId":"req-6t","res":{"statusCode":200},"responseTime":1.127989999949932,"msg":"request completed"}
{"level":30,"time":1754329684794,"pid":19,"hostname":"29966661f171","reqId":"req-6u","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34148},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329684795,"pid":19,"hostname":"29966661f171","reqId":"req-6u","res":{"statusCode":200},"responseTime":0.9519840031862259,"msg":"request completed"}
{"level":30,"time":1754329684838,"pid":19,"hostname":"29966661f171","reqId":"req-6v","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34152},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329684838,"pid":19,"hostname":"29966661f171","reqId":"req-6v","res":{"statusCode":200},"responseTime":0.5534290000796318,"msg":"request completed"}
{"level":30,"time":1754329684879,"pid":19,"hostname":"29966661f171","reqId":"req-6w","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34168},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329684881,"pid":19,"hostname":"29966661f171","reqId":"req-6w","res":{"statusCode":200},"responseTime":0.950202003121376,"msg":"request completed"}
{"level":30,"time":1754329684923,"pid":19,"hostname":"29966661f171","reqId":"req-6x","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34176},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329684924,"pid":19,"hostname":"29966661f171","reqId":"req-6x","res":{"statusCode":200},"responseTime":0.9361069947481155,"msg":"request completed"}
{"level":30,"time":1754329684968,"pid":19,"hostname":"29966661f171","reqId":"req-6y","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34184},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329684969,"pid":19,"hostname":"29966661f171","reqId":"req-6y","res":{"statusCode":200},"responseTime":0.981901004910469,"msg":"request completed"}
{"level":30,"time":1754329685011,"pid":19,"hostname":"29966661f171","reqId":"req-6z","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34186},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329685012,"pid":19,"hostname":"29966661f171","reqId":"req-6z","res":{"statusCode":200},"responseTime":0.9845149964094162,"msg":"request completed"}
{"level":30,"time":1754329685056,"pid":19,"hostname":"29966661f171","reqId":"req-70","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34200},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329685057,"pid":19,"hostname":"29966661f171","reqId":"req-70","res":{"statusCode":200},"responseTime":1.0475650057196617,"msg":"request completed"}
{"level":30,"time":1754329685100,"pid":19,"hostname":"29966661f171","reqId":"req-71","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34202},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329685101,"pid":19,"hostname":"29966661f171","reqId":"req-71","res":{"statusCode":200},"responseTime":1.048957996070385,"msg":"request completed"}
{"level":30,"time":1754329685145,"pid":19,"hostname":"29966661f171","reqId":"req-72","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34212},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329685146,"pid":19,"hostname":"29966661f171","reqId":"req-72","res":{"statusCode":200},"responseTime":0.8606479987502098,"msg":"request completed"}
{"level":30,"time":1754329685157,"pid":19,"hostname":"29966661f171","reqId":"req-73","req":{"method":"POST","url":"/move","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34224},"msg":"incoming request"}
Moving player: 1 Direction: down Game ID: ai
{"level":30,"time":1754329685158,"pid":19,"hostname":"29966661f171","reqId":"req-73","res":{"statusCode":200},"responseTime":1.4523040056228638,"msg":"request completed"}
{"level":30,"time":1754329685192,"pid":19,"hostname":"29966661f171","reqId":"req-74","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34234},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329685193,"pid":19,"hostname":"29966661f171","reqId":"req-74","res":{"statusCode":200},"responseTime":0.915120005607605,"msg":"request completed"}
{"level":30,"time":1754329685245,"pid":19,"hostname":"29966661f171","reqId":"req-75","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34248},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329685246,"pid":19,"hostname":"29966661f171","reqId":"req-75","res":{"statusCode":200},"responseTime":0.5926619991660118,"msg":"request completed"}
{"level":30,"time":1754329685288,"pid":19,"hostname":"29966661f171","reqId":"req-76","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34256},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329685289,"pid":19,"hostname":"29966661f171","reqId":"req-76","res":{"statusCode":200},"responseTime":0.9374990016222,"msg":"request completed"}
{"level":30,"time":1754329685332,"pid":19,"hostname":"29966661f171","reqId":"req-77","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34270},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329685333,"pid":19,"hostname":"29966661f171","reqId":"req-77","res":{"statusCode":200},"responseTime":0.9543850049376488,"msg":"request completed"}
{"level":30,"time":1754329685383,"pid":19,"hostname":"29966661f171","reqId":"req-78","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34286},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329685384,"pid":19,"hostname":"29966661f171","reqId":"req-78","res":{"statusCode":200},"responseTime":0.8894610032439232,"msg":"request completed"}
{"level":30,"time":1754329685428,"pid":19,"hostname":"29966661f171","reqId":"req-79","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34288},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329685429,"pid":19,"hostname":"29966661f171","reqId":"req-79","res":{"statusCode":200},"responseTime":1.0596549957990646,"msg":"request completed"}
{"level":30,"time":1754329685474,"pid":19,"hostname":"29966661f171","reqId":"req-7a","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34298},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329685475,"pid":19,"hostname":"29966661f171","reqId":"req-7a","res":{"statusCode":200},"responseTime":1.2360489964485168,"msg":"request completed"}
{"level":30,"time":1754329685518,"pid":19,"hostname":"29966661f171","reqId":"req-7b","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34308},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329685519,"pid":19,"hostname":"29966661f171","reqId":"req-7b","res":{"statusCode":200},"responseTime":0.950993999838829,"msg":"request completed"}
{"level":30,"time":1754329685562,"pid":19,"hostname":"29966661f171","reqId":"req-7c","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34312},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329685563,"pid":19,"hostname":"29966661f171","reqId":"req-7c","res":{"statusCode":200},"responseTime":0.9657710045576096,"msg":"request completed"}
{"level":30,"time":1754329685606,"pid":19,"hostname":"29966661f171","reqId":"req-7d","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34328},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329685607,"pid":19,"hostname":"29966661f171","reqId":"req-7d","res":{"statusCode":200},"responseTime":0.9461750015616417,"msg":"request completed"}
{"level":30,"time":1754329685648,"pid":19,"hostname":"29966661f171","reqId":"req-7e","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34334},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329685649,"pid":19,"hostname":"29966661f171","reqId":"req-7e","res":{"statusCode":200},"responseTime":0.6624249964952469,"msg":"request completed"}
{"level":30,"time":1754329685691,"pid":19,"hostname":"29966661f171","reqId":"req-7f","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34346},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329685692,"pid":19,"hostname":"29966661f171","reqId":"req-7f","res":{"statusCode":200},"responseTime":1.0595079958438873,"msg":"request completed"}
{"level":30,"time":1754329685735,"pid":19,"hostname":"29966661f171","reqId":"req-7g","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34360},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329685736,"pid":19,"hostname":"29966661f171","reqId":"req-7g","res":{"statusCode":200},"responseTime":0.9417929947376251,"msg":"request completed"}
{"level":30,"time":1754329685779,"pid":19,"hostname":"29966661f171","reqId":"req-7h","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34376},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329685781,"pid":19,"hostname":"29966661f171","reqId":"req-7h","res":{"statusCode":200},"responseTime":1.047365002334118,"msg":"request completed"}
{"level":30,"time":1754329685826,"pid":19,"hostname":"29966661f171","reqId":"req-7i","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34378},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329685827,"pid":19,"hostname":"29966661f171","reqId":"req-7i","res":{"statusCode":200},"responseTime":0.928116999566555,"msg":"request completed"}
{"level":30,"time":1754329685870,"pid":19,"hostname":"29966661f171","reqId":"req-7j","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34384},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329685872,"pid":19,"hostname":"29966661f171","reqId":"req-7j","res":{"statusCode":200},"responseTime":1.0005799978971481,"msg":"request completed"}
{"level":30,"time":1754329685887,"pid":19,"hostname":"29966661f171","reqId":"req-7k","req":{"method":"POST","url":"/move","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34398},"msg":"incoming request"}
Moving player: 1 Direction: up Game ID: ai
{"level":30,"time":1754329685888,"pid":19,"hostname":"29966661f171","reqId":"req-7k","res":{"statusCode":200},"responseTime":0.7493350058794022,"msg":"request completed"}
{"level":30,"time":1754329685913,"pid":19,"hostname":"29966661f171","reqId":"req-7l","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34408},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329685914,"pid":19,"hostname":"29966661f171","reqId":"req-7l","res":{"statusCode":200},"responseTime":0.9374839961528778,"msg":"request completed"}
{"level":30,"time":1754329685955,"pid":19,"hostname":"29966661f171","reqId":"req-7m","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34422},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329685956,"pid":19,"hostname":"29966661f171","reqId":"req-7m","res":{"statusCode":200},"responseTime":0.813512995839119,"msg":"request completed"}
{"level":30,"time":1754329685999,"pid":19,"hostname":"29966661f171","reqId":"req-7n","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34434},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329686000,"pid":19,"hostname":"29966661f171","reqId":"req-7n","res":{"statusCode":200},"responseTime":0.967287003993988,"msg":"request completed"}
{"level":30,"time":1754329686050,"pid":19,"hostname":"29966661f171","reqId":"req-7o","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34442},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329686051,"pid":19,"hostname":"29966661f171","reqId":"req-7o","res":{"statusCode":200},"responseTime":1.0673450008034706,"msg":"request completed"}
{"level":30,"time":1754329686093,"pid":19,"hostname":"29966661f171","reqId":"req-7p","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34458},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329686095,"pid":19,"hostname":"29966661f171","reqId":"req-7p","res":{"statusCode":200},"responseTime":0.9794009998440742,"msg":"request completed"}
{"level":30,"time":1754329686137,"pid":19,"hostname":"29966661f171","reqId":"req-7q","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34460},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329686138,"pid":19,"hostname":"29966661f171","reqId":"req-7q","res":{"statusCode":200},"responseTime":0.9921530038118362,"msg":"request completed"}
{"level":30,"time":1754329686188,"pid":19,"hostname":"29966661f171","reqId":"req-7r","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34474},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329686189,"pid":19,"hostname":"29966661f171","reqId":"req-7r","res":{"statusCode":200},"responseTime":0.9842910021543503,"msg":"request completed"}
{"level":30,"time":1754329686233,"pid":19,"hostname":"29966661f171","reqId":"req-7s","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34488},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329686234,"pid":19,"hostname":"29966661f171","reqId":"req-7s","res":{"statusCode":200},"responseTime":0.9980169981718063,"msg":"request completed"}
{"level":30,"time":1754329686278,"pid":19,"hostname":"29966661f171","reqId":"req-7t","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34494},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329686280,"pid":19,"hostname":"29966661f171","reqId":"req-7t","res":{"statusCode":200},"responseTime":1.0749739930033684,"msg":"request completed"}
{"level":30,"time":1754329686326,"pid":19,"hostname":"29966661f171","reqId":"req-7u","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34508},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329686327,"pid":19,"hostname":"29966661f171","reqId":"req-7u","res":{"statusCode":200},"responseTime":0.9732249975204468,"msg":"request completed"}
{"level":30,"time":1754329686369,"pid":19,"hostname":"29966661f171","reqId":"req-7v","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34510},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329686370,"pid":19,"hostname":"29966661f171","reqId":"req-7v","res":{"statusCode":200},"responseTime":0.9601139947772026,"msg":"request completed"}
{"level":30,"time":1754329686412,"pid":19,"hostname":"29966661f171","reqId":"req-7w","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34524},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329686413,"pid":19,"hostname":"29966661f171","reqId":"req-7w","res":{"statusCode":200},"responseTime":1.009281001985073,"msg":"request completed"}
{"level":30,"time":1754329686454,"pid":19,"hostname":"29966661f171","reqId":"req-7x","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34528},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329686454,"pid":19,"hostname":"29966661f171","reqId":"req-7x","res":{"statusCode":200},"responseTime":0.599602997303009,"msg":"request completed"}
{"level":30,"time":1754329686495,"pid":19,"hostname":"29966661f171","reqId":"req-7y","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34546},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329686496,"pid":19,"hostname":"29966661f171","reqId":"req-7y","res":{"statusCode":200},"responseTime":1.0057479962706566,"msg":"request completed"}
{"level":30,"time":1754329686538,"pid":19,"hostname":"29966661f171","reqId":"req-7z","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34552},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329686540,"pid":19,"hostname":"29966661f171","reqId":"req-7z","res":{"statusCode":200},"responseTime":1.0037660002708435,"msg":"request completed"}
{"level":30,"time":1754329686591,"pid":19,"hostname":"29966661f171","reqId":"req-80","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34566},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329686592,"pid":19,"hostname":"29966661f171","reqId":"req-80","res":{"statusCode":200},"responseTime":0.9126939997076988,"msg":"request completed"}
{"level":30,"time":1754329686638,"pid":19,"hostname":"29966661f171","reqId":"req-81","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34578},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329686639,"pid":19,"hostname":"29966661f171","reqId":"req-81","res":{"statusCode":200},"responseTime":1.0458389967679977,"msg":"request completed"}
{"level":30,"time":1754329686683,"pid":19,"hostname":"29966661f171","reqId":"req-82","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34592},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329686684,"pid":19,"hostname":"29966661f171","reqId":"req-82","res":{"statusCode":200},"responseTime":1.0795800015330315,"msg":"request completed"}
{"level":30,"time":1754329686726,"pid":19,"hostname":"29966661f171","reqId":"req-83","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34610},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329686726,"pid":19,"hostname":"29966661f171","reqId":"req-83","res":{"statusCode":200},"responseTime":0.5558620020747185,"msg":"request completed"}
{"level":30,"time":1754329686768,"pid":19,"hostname":"29966661f171","reqId":"req-84","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34612},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329686769,"pid":19,"hostname":"29966661f171","reqId":"req-84","res":{"statusCode":200},"responseTime":1.0922450050711632,"msg":"request completed"}
{"level":30,"time":1754329686809,"pid":19,"hostname":"29966661f171","reqId":"req-85","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34620},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329686809,"pid":19,"hostname":"29966661f171","reqId":"req-85","res":{"statusCode":200},"responseTime":0.35377900302410126,"msg":"request completed"}
{"level":30,"time":1754329686848,"pid":19,"hostname":"29966661f171","reqId":"req-86","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34634},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329686849,"pid":19,"hostname":"29966661f171","reqId":"req-86","res":{"statusCode":200},"responseTime":1.1164879947900772,"msg":"request completed"}
{"level":30,"time":1754329686889,"pid":19,"hostname":"29966661f171","reqId":"req-87","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34636},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329686890,"pid":19,"hostname":"29966661f171","reqId":"req-87","res":{"statusCode":200},"responseTime":0.7895810008049011,"msg":"request completed"}
{"level":30,"time":1754329686928,"pid":19,"hostname":"29966661f171","reqId":"req-88","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34646},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329686928,"pid":19,"hostname":"29966661f171","reqId":"req-88","res":{"statusCode":200},"responseTime":0.47149600088596344,"msg":"request completed"}
{"level":30,"time":1754329686966,"pid":19,"hostname":"29966661f171","reqId":"req-89","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34652},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329686966,"pid":19,"hostname":"29966661f171","reqId":"req-89","res":{"statusCode":200},"responseTime":0.4253770038485527,"msg":"request completed"}
{"level":30,"time":1754329687005,"pid":19,"hostname":"29966661f171","reqId":"req-8a","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34666},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329687005,"pid":19,"hostname":"29966661f171","reqId":"req-8a","res":{"statusCode":200},"responseTime":0.8427920043468475,"msg":"request completed"}
{"level":30,"time":1754329687043,"pid":19,"hostname":"29966661f171","reqId":"req-8b","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34670},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329687043,"pid":19,"hostname":"29966661f171","reqId":"req-8b","res":{"statusCode":200},"responseTime":0.5177009999752045,"msg":"request completed"}
{"level":30,"time":1754329687084,"pid":19,"hostname":"29966661f171","reqId":"req-8c","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34672},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329687085,"pid":19,"hostname":"29966661f171","reqId":"req-8c","res":{"statusCode":200},"responseTime":1.032931998372078,"msg":"request completed"}
{"level":30,"time":1754329687129,"pid":19,"hostname":"29966661f171","reqId":"req-8d","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34676},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329687130,"pid":19,"hostname":"29966661f171","reqId":"req-8d","res":{"statusCode":200},"responseTime":1.5742729976773262,"msg":"request completed"}
{"level":30,"time":1754329687174,"pid":19,"hostname":"29966661f171","reqId":"req-8e","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34686},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329687175,"pid":19,"hostname":"29966661f171","reqId":"req-8e","res":{"statusCode":200},"responseTime":1.0009419992566109,"msg":"request completed"}
{"level":30,"time":1754329687221,"pid":19,"hostname":"29966661f171","reqId":"req-8f","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34702},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329687222,"pid":19,"hostname":"29966661f171","reqId":"req-8f","res":{"statusCode":200},"responseTime":0.9748070016503334,"msg":"request completed"}
{"level":30,"time":1754329687264,"pid":19,"hostname":"29966661f171","reqId":"req-8g","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34716},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329687265,"pid":19,"hostname":"29966661f171","reqId":"req-8g","res":{"statusCode":200},"responseTime":0.878150999546051,"msg":"request completed"}
{"level":30,"time":1754329687297,"pid":19,"hostname":"29966661f171","reqId":"req-8h","req":{"method":"POST","url":"/move","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34720},"msg":"incoming request"}
Moving player: 1 Direction: down Game ID: ai
{"level":30,"time":1754329687298,"pid":19,"hostname":"29966661f171","reqId":"req-8h","res":{"statusCode":200},"responseTime":1.0281810015439987,"msg":"request completed"}
{"level":30,"time":1754329687306,"pid":19,"hostname":"29966661f171","reqId":"req-8i","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34722},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329687307,"pid":19,"hostname":"29966661f171","reqId":"req-8i","res":{"statusCode":200},"responseTime":0.8799489960074425,"msg":"request completed"}
{"level":30,"time":1754329687348,"pid":19,"hostname":"29966661f171","reqId":"req-8j","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34736},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329687349,"pid":19,"hostname":"29966661f171","reqId":"req-8j","res":{"statusCode":200},"responseTime":0.9822350069880486,"msg":"request completed"}
{"level":30,"time":1754329687397,"pid":19,"hostname":"29966661f171","reqId":"req-8k","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34750},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329687398,"pid":19,"hostname":"29966661f171","reqId":"req-8k","res":{"statusCode":200},"responseTime":0.9948410019278526,"msg":"request completed"}
{"level":30,"time":1754329687444,"pid":19,"hostname":"29966661f171","reqId":"req-8l","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34760},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329687445,"pid":19,"hostname":"29966661f171","reqId":"req-8l","res":{"statusCode":200},"responseTime":0.8450229987502098,"msg":"request completed"}
{"level":30,"time":1754329687487,"pid":19,"hostname":"29966661f171","reqId":"req-8m","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34772},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329687488,"pid":19,"hostname":"29966661f171","reqId":"req-8m","res":{"statusCode":200},"responseTime":1.0039769932627678,"msg":"request completed"}
{"level":30,"time":1754329687531,"pid":19,"hostname":"29966661f171","reqId":"req-8n","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34780},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329687532,"pid":19,"hostname":"29966661f171","reqId":"req-8n","res":{"statusCode":200},"responseTime":0.9495050013065338,"msg":"request completed"}
{"level":30,"time":1754329687575,"pid":19,"hostname":"29966661f171","reqId":"req-8o","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34788},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329687576,"pid":19,"hostname":"29966661f171","reqId":"req-8o","res":{"statusCode":200},"responseTime":1.0078880041837692,"msg":"request completed"}
{"level":30,"time":1754329687619,"pid":19,"hostname":"29966661f171","reqId":"req-8p","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34792},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329687620,"pid":19,"hostname":"29966661f171","reqId":"req-8p","res":{"statusCode":200},"responseTime":0.9613049998879433,"msg":"request completed"}
{"level":30,"time":1754329687662,"pid":19,"hostname":"29966661f171","reqId":"req-8q","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34804},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329687663,"pid":19,"hostname":"29966661f171","reqId":"req-8q","res":{"statusCode":200},"responseTime":1.0541609972715378,"msg":"request completed"}
{"level":30,"time":1754329687706,"pid":19,"hostname":"29966661f171","reqId":"req-8r","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34806},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329687708,"pid":19,"hostname":"29966661f171","reqId":"req-8r","res":{"statusCode":200},"responseTime":1.1100759953260422,"msg":"request completed"}
{"level":30,"time":1754329687749,"pid":19,"hostname":"29966661f171","reqId":"req-8s","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34816},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329687750,"pid":19,"hostname":"29966661f171","reqId":"req-8s","res":{"statusCode":200},"responseTime":0.63332399725914,"msg":"request completed"}
{"level":30,"time":1754329687794,"pid":19,"hostname":"29966661f171","reqId":"req-8t","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34820},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329687795,"pid":19,"hostname":"29966661f171","reqId":"req-8t","res":{"statusCode":200},"responseTime":0.9521320015192032,"msg":"request completed"}
{"level":30,"time":1754329687839,"pid":19,"hostname":"29966661f171","reqId":"req-8u","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34832},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329687840,"pid":19,"hostname":"29966661f171","reqId":"req-8u","res":{"statusCode":200},"responseTime":0.978351004421711,"msg":"request completed"}
{"level":30,"time":1754329687883,"pid":19,"hostname":"29966661f171","reqId":"req-8v","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34844},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329687884,"pid":19,"hostname":"29966661f171","reqId":"req-8v","res":{"statusCode":200},"responseTime":0.8901189938187599,"msg":"request completed"}
{"level":30,"time":1754329687926,"pid":19,"hostname":"29966661f171","reqId":"req-8w","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34856},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329687928,"pid":19,"hostname":"29966661f171","reqId":"req-8w","res":{"statusCode":200},"responseTime":1.0060300007462502,"msg":"request completed"}
{"level":30,"time":1754329687972,"pid":19,"hostname":"29966661f171","reqId":"req-8x","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34860},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329687973,"pid":19,"hostname":"29966661f171","reqId":"req-8x","res":{"statusCode":200},"responseTime":1.0038589984178543,"msg":"request completed"}
{"level":30,"time":1754329688015,"pid":19,"hostname":"29966661f171","reqId":"req-8y","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34878},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329688016,"pid":19,"hostname":"29966661f171","reqId":"req-8y","res":{"statusCode":200},"responseTime":0.9546310007572174,"msg":"request completed"}
{"level":30,"time":1754329688062,"pid":19,"hostname":"29966661f171","reqId":"req-8z","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34886},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329688062,"pid":19,"hostname":"29966661f171","reqId":"req-8z","res":{"statusCode":200},"responseTime":0.6385610029101372,"msg":"request completed"}
{"level":30,"time":1754329688104,"pid":19,"hostname":"29966661f171","reqId":"req-90","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34898},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329688105,"pid":19,"hostname":"29966661f171","reqId":"req-90","res":{"statusCode":200},"responseTime":1.0121000036597252,"msg":"request completed"}
{"level":30,"time":1754329688149,"pid":19,"hostname":"29966661f171","reqId":"req-91","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34910},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329688150,"pid":19,"hostname":"29966661f171","reqId":"req-91","res":{"statusCode":200},"responseTime":1.1307840049266815,"msg":"request completed"}
{"level":30,"time":1754329688196,"pid":19,"hostname":"29966661f171","reqId":"req-92","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34916},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329688197,"pid":19,"hostname":"29966661f171","reqId":"req-92","res":{"statusCode":200},"responseTime":1.1270949989557266,"msg":"request completed"}
{"level":30,"time":1754329688243,"pid":19,"hostname":"29966661f171","reqId":"req-93","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34920},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329688244,"pid":19,"hostname":"29966661f171","reqId":"req-93","res":{"statusCode":200},"responseTime":1.3443540036678314,"msg":"request completed"}
{"level":30,"time":1754329688290,"pid":19,"hostname":"29966661f171","reqId":"req-94","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34934},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329688291,"pid":19,"hostname":"29966661f171","reqId":"req-94","res":{"statusCode":200},"responseTime":1.1386480033397675,"msg":"request completed"}
{"level":30,"time":1754329688336,"pid":19,"hostname":"29966661f171","reqId":"req-95","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34948},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329688337,"pid":19,"hostname":"29966661f171","reqId":"req-95","res":{"statusCode":200},"responseTime":0.9864709973335266,"msg":"request completed"}
{"level":30,"time":1754329688382,"pid":19,"hostname":"29966661f171","reqId":"req-96","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34962},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329688384,"pid":19,"hostname":"29966661f171","reqId":"req-96","res":{"statusCode":200},"responseTime":1.338468000292778,"msg":"request completed"}
{"level":30,"time":1754329688427,"pid":19,"hostname":"29966661f171","reqId":"req-97","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34972},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329688428,"pid":19,"hostname":"29966661f171","reqId":"req-97","res":{"statusCode":200},"responseTime":1.2544049993157387,"msg":"request completed"}
{"level":30,"time":1754329688469,"pid":19,"hostname":"29966661f171","reqId":"req-98","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34978},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329688470,"pid":19,"hostname":"29966661f171","reqId":"req-98","res":{"statusCode":200},"responseTime":0.8909419998526573,"msg":"request completed"}
{"level":30,"time":1754329688512,"pid":19,"hostname":"29966661f171","reqId":"req-99","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":34988},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329688513,"pid":19,"hostname":"29966661f171","reqId":"req-99","res":{"statusCode":200},"responseTime":0.964651994407177,"msg":"request completed"}
{"level":30,"time":1754329688557,"pid":19,"hostname":"29966661f171","reqId":"req-9a","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35000},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329688558,"pid":19,"hostname":"29966661f171","reqId":"req-9a","res":{"statusCode":200},"responseTime":1.1275340020656586,"msg":"request completed"}
{"level":30,"time":1754329688609,"pid":19,"hostname":"29966661f171","reqId":"req-9b","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35008},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329688610,"pid":19,"hostname":"29966661f171","reqId":"req-9b","res":{"statusCode":200},"responseTime":1.0232610031962395,"msg":"request completed"}
{"level":30,"time":1754329688654,"pid":19,"hostname":"29966661f171","reqId":"req-9c","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35016},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329688655,"pid":19,"hostname":"29966661f171","reqId":"req-9c","res":{"statusCode":200},"responseTime":0.9768369942903519,"msg":"request completed"}
{"level":30,"time":1754329688699,"pid":19,"hostname":"29966661f171","reqId":"req-9d","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35032},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329688700,"pid":19,"hostname":"29966661f171","reqId":"req-9d","res":{"statusCode":200},"responseTime":1.0124690011143684,"msg":"request completed"}
{"level":30,"time":1754329688747,"pid":19,"hostname":"29966661f171","reqId":"req-9e","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35036},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329688748,"pid":19,"hostname":"29966661f171","reqId":"req-9e","res":{"statusCode":200},"responseTime":1.0318640023469925,"msg":"request completed"}
{"level":30,"time":1754329688791,"pid":19,"hostname":"29966661f171","reqId":"req-9f","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35048},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329688793,"pid":19,"hostname":"29966661f171","reqId":"req-9f","res":{"statusCode":200},"responseTime":1.130971997976303,"msg":"request completed"}
{"level":30,"time":1754329688835,"pid":19,"hostname":"29966661f171","reqId":"req-9g","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35052},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329688836,"pid":19,"hostname":"29966661f171","reqId":"req-9g","res":{"statusCode":200},"responseTime":1.0572129935026169,"msg":"request completed"}
{"level":30,"time":1754329688879,"pid":19,"hostname":"29966661f171","reqId":"req-9h","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35056},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329688880,"pid":19,"hostname":"29966661f171","reqId":"req-9h","res":{"statusCode":200},"responseTime":0.9798910021781921,"msg":"request completed"}
{"level":30,"time":1754329688923,"pid":19,"hostname":"29966661f171","reqId":"req-9i","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35066},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329688926,"pid":19,"hostname":"29966661f171","reqId":"req-9i","res":{"statusCode":200},"responseTime":2.1838760003447533,"msg":"request completed"}
{"level":30,"time":1754329688973,"pid":19,"hostname":"29966661f171","reqId":"req-9j","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35074},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329688974,"pid":19,"hostname":"29966661f171","reqId":"req-9j","res":{"statusCode":200},"responseTime":0.510283000767231,"msg":"request completed"}
{"level":30,"time":1754329689016,"pid":19,"hostname":"29966661f171","reqId":"req-9k","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35086},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329689018,"pid":19,"hostname":"29966661f171","reqId":"req-9k","res":{"statusCode":200},"responseTime":1.1753929927945137,"msg":"request completed"}
{"level":30,"time":1754329689077,"pid":19,"hostname":"29966661f171","reqId":"req-9l","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35092},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329689078,"pid":19,"hostname":"29966661f171","reqId":"req-9l","res":{"statusCode":200},"responseTime":0.9405540004372597,"msg":"request completed"}
{"level":30,"time":1754329689122,"pid":19,"hostname":"29966661f171","reqId":"req-9m","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35100},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329689123,"pid":19,"hostname":"29966661f171","reqId":"req-9m","res":{"statusCode":200},"responseTime":1.1230420023202896,"msg":"request completed"}
{"level":30,"time":1754329689175,"pid":19,"hostname":"29966661f171","reqId":"req-9n","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35110},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329689176,"pid":19,"hostname":"29966661f171","reqId":"req-9n","res":{"statusCode":200},"responseTime":0.5445659980177879,"msg":"request completed"}
{"level":30,"time":1754329689218,"pid":19,"hostname":"29966661f171","reqId":"req-9o","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35118},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329689219,"pid":19,"hostname":"29966661f171","reqId":"req-9o","res":{"statusCode":200},"responseTime":1.1204300001263618,"msg":"request completed"}
{"level":30,"time":1754329689263,"pid":19,"hostname":"29966661f171","reqId":"req-9p","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35134},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329689265,"pid":19,"hostname":"29966661f171","reqId":"req-9p","res":{"statusCode":200},"responseTime":1.1251929998397827,"msg":"request completed"}
{"level":30,"time":1754329689316,"pid":19,"hostname":"29966661f171","reqId":"req-9q","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35140},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329689318,"pid":19,"hostname":"29966661f171","reqId":"req-9q","res":{"statusCode":200},"responseTime":1.1285669952630997,"msg":"request completed"}
{"level":30,"time":1754329689361,"pid":19,"hostname":"29966661f171","reqId":"req-9r","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35150},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329689362,"pid":19,"hostname":"29966661f171","reqId":"req-9r","res":{"statusCode":200},"responseTime":1.2802139967679977,"msg":"request completed"}
{"level":30,"time":1754329689405,"pid":19,"hostname":"29966661f171","reqId":"req-9s","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35158},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329689406,"pid":19,"hostname":"29966661f171","reqId":"req-9s","res":{"statusCode":200},"responseTime":0.8870889991521835,"msg":"request completed"}
{"level":30,"time":1754329689450,"pid":19,"hostname":"29966661f171","reqId":"req-9t","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35162},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329689452,"pid":19,"hostname":"29966661f171","reqId":"req-9t","res":{"statusCode":200},"responseTime":1.179069995880127,"msg":"request completed"}
{"level":30,"time":1754329689493,"pid":19,"hostname":"29966661f171","reqId":"req-9u","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35174},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329689495,"pid":19,"hostname":"29966661f171","reqId":"req-9u","res":{"statusCode":200},"responseTime":1.6998189985752106,"msg":"request completed"}
{"level":30,"time":1754329689538,"pid":19,"hostname":"29966661f171","reqId":"req-9v","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35188},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329689539,"pid":19,"hostname":"29966661f171","reqId":"req-9v","res":{"statusCode":200},"responseTime":1.1191780045628548,"msg":"request completed"}
{"level":30,"time":1754329689588,"pid":19,"hostname":"29966661f171","reqId":"req-9w","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35204},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329689588,"pid":19,"hostname":"29966661f171","reqId":"req-9w","res":{"statusCode":200},"responseTime":0.5401399955153465,"msg":"request completed"}
{"level":30,"time":1754329689629,"pid":19,"hostname":"29966661f171","reqId":"req-9x","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35216},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329689630,"pid":19,"hostname":"29966661f171","reqId":"req-9x","res":{"statusCode":200},"responseTime":0.9548089951276779,"msg":"request completed"}
{"level":30,"time":1754329689681,"pid":19,"hostname":"29966661f171","reqId":"req-9y","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35222},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329689682,"pid":19,"hostname":"29966661f171","reqId":"req-9y","res":{"statusCode":200},"responseTime":0.6034210026264191,"msg":"request completed"}
{"level":30,"time":1754329689724,"pid":19,"hostname":"29966661f171","reqId":"req-9z","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35236},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329689725,"pid":19,"hostname":"29966661f171","reqId":"req-9z","res":{"statusCode":200},"responseTime":0.9935079962015152,"msg":"request completed"}
{"level":30,"time":1754329689767,"pid":19,"hostname":"29966661f171","reqId":"req-a0","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35246},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329689768,"pid":19,"hostname":"29966661f171","reqId":"req-a0","res":{"statusCode":200},"responseTime":1.030629001557827,"msg":"request completed"}
{"level":30,"time":1754329689819,"pid":19,"hostname":"29966661f171","reqId":"req-a1","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35250},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329689820,"pid":19,"hostname":"29966661f171","reqId":"req-a1","res":{"statusCode":200},"responseTime":1.0399910062551498,"msg":"request completed"}
{"level":30,"time":1754329689864,"pid":19,"hostname":"29966661f171","reqId":"req-a2","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35262},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329689865,"pid":19,"hostname":"29966661f171","reqId":"req-a2","res":{"statusCode":200},"responseTime":0.9833629950881004,"msg":"request completed"}
{"level":30,"time":1754329689913,"pid":19,"hostname":"29966661f171","reqId":"req-a3","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35274},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329689914,"pid":19,"hostname":"29966661f171","reqId":"req-a3","res":{"statusCode":200},"responseTime":1.1480510011315346,"msg":"request completed"}
{"level":30,"time":1754329689956,"pid":19,"hostname":"29966661f171","reqId":"req-a4","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35278},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329689958,"pid":19,"hostname":"29966661f171","reqId":"req-a4","res":{"statusCode":200},"responseTime":1.775179997086525,"msg":"request completed"}
{"level":30,"time":1754329690004,"pid":19,"hostname":"29966661f171","reqId":"req-a5","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35290},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329690006,"pid":19,"hostname":"29966661f171","reqId":"req-a5","res":{"statusCode":200},"responseTime":1.196593999862671,"msg":"request completed"}
{"level":30,"time":1754329690048,"pid":19,"hostname":"29966661f171","reqId":"req-a6","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35300},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329690049,"pid":19,"hostname":"29966661f171","reqId":"req-a6","res":{"statusCode":200},"responseTime":1.0282279998064041,"msg":"request completed"}
{"level":30,"time":1754329690094,"pid":19,"hostname":"29966661f171","reqId":"req-a7","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35310},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329690094,"pid":19,"hostname":"29966661f171","reqId":"req-a7","res":{"statusCode":200},"responseTime":0.49484600126743317,"msg":"request completed"}
{"level":30,"time":1754329690135,"pid":19,"hostname":"29966661f171","reqId":"req-a8","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35328},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329690137,"pid":19,"hostname":"29966661f171","reqId":"req-a8","res":{"statusCode":200},"responseTime":1.0834389999508858,"msg":"request completed"}
{"level":30,"time":1754329690186,"pid":19,"hostname":"29966661f171","reqId":"req-a9","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35336},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329690186,"pid":19,"hostname":"29966661f171","reqId":"req-a9","res":{"statusCode":200},"responseTime":0.5054399967193604,"msg":"request completed"}
{"level":30,"time":1754329690239,"pid":19,"hostname":"29966661f171","reqId":"req-aa","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35344},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329690240,"pid":19,"hostname":"29966661f171","reqId":"req-aa","res":{"statusCode":200},"responseTime":0.9645469933748245,"msg":"request completed"}
{"level":30,"time":1754329690282,"pid":19,"hostname":"29966661f171","reqId":"req-ab","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35346},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329690282,"pid":19,"hostname":"29966661f171","reqId":"req-ab","res":{"statusCode":200},"responseTime":0.7118300050497055,"msg":"request completed"}
{"level":30,"time":1754329690323,"pid":19,"hostname":"29966661f171","reqId":"req-ac","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35350},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329690324,"pid":19,"hostname":"29966661f171","reqId":"req-ac","res":{"statusCode":200},"responseTime":0.9894789978861809,"msg":"request completed"}
{"level":30,"time":1754329690368,"pid":19,"hostname":"29966661f171","reqId":"req-ad","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35358},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329690369,"pid":19,"hostname":"29966661f171","reqId":"req-ad","res":{"statusCode":200},"responseTime":0.9987829998135567,"msg":"request completed"}
{"level":30,"time":1754329690417,"pid":19,"hostname":"29966661f171","reqId":"req-ae","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35374},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329690418,"pid":19,"hostname":"29966661f171","reqId":"req-ae","res":{"statusCode":200},"responseTime":1.1060869991779327,"msg":"request completed"}
{"level":30,"time":1754329690460,"pid":19,"hostname":"29966661f171","reqId":"req-af","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35378},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329690461,"pid":19,"hostname":"29966661f171","reqId":"req-af","res":{"statusCode":200},"responseTime":1.0141019970178604,"msg":"request completed"}
{"level":30,"time":1754329690507,"pid":19,"hostname":"29966661f171","reqId":"req-ag","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35392},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329690508,"pid":19,"hostname":"29966661f171","reqId":"req-ag","res":{"statusCode":200},"responseTime":0.632032997906208,"msg":"request completed"}
{"level":30,"time":1754329690549,"pid":19,"hostname":"29966661f171","reqId":"req-ah","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35406},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329690551,"pid":19,"hostname":"29966661f171","reqId":"req-ah","res":{"statusCode":200},"responseTime":1.160901002585888,"msg":"request completed"}
{"level":30,"time":1754329690594,"pid":19,"hostname":"29966661f171","reqId":"req-ai","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35420},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329690595,"pid":19,"hostname":"29966661f171","reqId":"req-ai","res":{"statusCode":200},"responseTime":0.9597869962453842,"msg":"request completed"}
{"level":30,"time":1754329690639,"pid":19,"hostname":"29966661f171","reqId":"req-aj","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35422},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329690640,"pid":19,"hostname":"29966661f171","reqId":"req-aj","res":{"statusCode":200},"responseTime":0.9922809973359108,"msg":"request completed"}
{"level":30,"time":1754329690689,"pid":19,"hostname":"29966661f171","reqId":"req-ak","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35432},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329690689,"pid":19,"hostname":"29966661f171","reqId":"req-ak","res":{"statusCode":200},"responseTime":0.49447499960660934,"msg":"request completed"}
{"level":30,"time":1754329690731,"pid":19,"hostname":"29966661f171","reqId":"req-al","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35440},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329690732,"pid":19,"hostname":"29966661f171","reqId":"req-al","res":{"statusCode":200},"responseTime":1.0807080045342445,"msg":"request completed"}
{"level":30,"time":1754329690775,"pid":19,"hostname":"29966661f171","reqId":"req-am","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35448},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329690776,"pid":19,"hostname":"29966661f171","reqId":"req-am","res":{"statusCode":200},"responseTime":1.1337069943547249,"msg":"request completed"}
{"level":30,"time":1754329690825,"pid":19,"hostname":"29966661f171","reqId":"req-an","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35458},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329690825,"pid":19,"hostname":"29966661f171","reqId":"req-an","res":{"statusCode":200},"responseTime":0.45713700354099274,"msg":"request completed"}
{"level":30,"time":1754329690871,"pid":19,"hostname":"29966661f171","reqId":"req-ao","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35472},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329690872,"pid":19,"hostname":"29966661f171","reqId":"req-ao","res":{"statusCode":200},"responseTime":1.0837310031056404,"msg":"request completed"}
{"level":30,"time":1754329690919,"pid":19,"hostname":"29966661f171","reqId":"req-ap","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35476},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329690921,"pid":19,"hostname":"29966661f171","reqId":"req-ap","res":{"statusCode":200},"responseTime":1.1865120008587837,"msg":"request completed"}
{"level":30,"time":1754329690964,"pid":19,"hostname":"29966661f171","reqId":"req-aq","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35484},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329690965,"pid":19,"hostname":"29966661f171","reqId":"req-aq","res":{"statusCode":200},"responseTime":1.0835430026054382,"msg":"request completed"}
{"level":30,"time":1754329691012,"pid":19,"hostname":"29966661f171","reqId":"req-ar","req":{"method":"GET","url":"/state","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35494},"msg":"incoming request"}
Fetching game state... 1
Player session: { username: 'herer', id: 1, player: 1, gameid: 7, loggedin: false } session ID: Vq4qWC2oAN90c7CAh51U9eUUL0xGKJfp.U7ls5mY3zvYWIm3NGGS7TGD0mTtSnH7p1CsvtTy++ss
{"level":30,"time":1754329691014,"pid":19,"hostname":"29966661f171","reqId":"req-ar","res":{"statusCode":200},"responseTime":1.1448910012841225,"msg":"request completed"}
{"level":30,"time":1754329691074,"pid":19,"hostname":"29966661f171","reqId":"req-as","req":{"method":"POST","url":"/leave","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":35504},"msg":"incoming request"}
Player leaving game with ID: 7
Game updated in database: 7
Game updated in database before leaving: 7
Game retrieved from database: [
  {
    id: 7,
    player1: { id: 1, username: 'unknown' },
    player2: { id: 0, username: 'ai' },
    player1Score: 0,
    player2Score: 2,
    winner: 'Player 2',
    createdAt: 2025-08-04T17:48:11.000Z
  },
  {
    id: 6,
    player1: { id: 1, username: 'unknown' },
    player2: { id: 0, username: 'ai' },
    player1Score: 0,
    player2Score: 0,
    winner: 'Draw',
    createdAt: 2025-08-04T16:09:46.000Z
  }
]
Game with ID: 7 has been removed. Remaining games: 0
{"level":30,"time":1754329691085,"pid":19,"hostname":"29966661f171","reqId":"req-as","res":{"statusCode":200},"responseTime":10.78048400580883,"msg":"request completed"}
{"level":30,"time":1754329697952,"pid":19,"hostname":"29966661f171","reqId":"req-at","req":{"method":"GET","url":"/db/getGamesForPlayer","hostname":"game:3002","remoteAddress":"172.18.0.6","remotePort":45742},"msg":"incoming request"}
Fetching games for player ID: 1
Games fetched for player ID: 1 Number of games: 2
{"level":30,"time":1754329697958,"pid":19,"hostname":"29966661f171","reqId":"req-at","res":{"statusCode":200},"responseTime":5.698478996753693,"msg":"request completed"}
