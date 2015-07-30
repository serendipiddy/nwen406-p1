# nwen406-p1

First project,

A server in an cluster of servers. Each takes a JSON string, alters a value, and passes it on.

listens on port 3000.

RESTful interface:
GET: /alive
  check if server is alive

GET: /log 
  prints the current logs (supplied by forever)

GET: /api
  prints the latest files processed

POST: /api
  input for the JSON to be manipulated.

  accepts JSON of the structure:
  ```javascript
  {
    value: 'string to be altered',
    count: 0,    /* number of nodes successfully visited */
    audit: {},   /* visited nodes */
    order: [],   /* queue of addresses to be visited */
  }
  ```

  Returns HTTP 202 accepted.

## Manipulation

The value string received is hased (MD5). The hash is then used to determine four positions from within Pride And Prejudice to read text from. the first 50 characters of this output is then sent as the next value.

Other book options are available, but must be set in code.
