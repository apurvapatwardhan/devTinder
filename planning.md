

## Auth router
/signup POST
/login POST
/logout POST


## profile router
/profile/view GET
/profile/edit PATCH
/profile/password PATCH

Connection request outgoing: interested, ignore
Connection request incoming: accept, reject


## connection request router
/request/send/interested/userid POST
/request/send/ignored/userid POST
/request/review/accept/requestid POST
/request/review/reject/requestid POST


## user router
/connections GET
/request/recieved GET
/feed GET


