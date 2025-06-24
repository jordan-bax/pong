#INFO

although the andpoints start with /api/*/ that is purely for nginx to do the proxy the services itself only have whats behind it
example:
'/api/user/me' is only '/me' in the userService backend