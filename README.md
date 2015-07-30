# nwen406-p1

The first project for NWEN406.

A server in an cluster of servers. Each takes a JSON string, alters a value, and passes it on.

listens on port 3000.

##RESTful Interface:
**GET: /alive**
  check if server is alive

**GET: /log**
  prints the current logs (supplied by forever)

**GET: /api**
  prints the latest files processed

**POST: /api**
  input for the JSON to be manipulated.
  Returns HTTP 202 Accepted.
  Accepts JSON of the structure:
  ```javascript
  {
    value: 'string to be altered',
    count: 0,    /* number of nodes successfully visited */
    audit: {},   /* visited nodes */
    order: [],   /* queue of addresses to be visited */
  }
  ```
  
  Where audit is an object inserted by each hop, of the form:
  ```javascript
  {
    input: 'string to be altered',
    output: 'string altered',
    index: 0,                /* this nodes hop count */
    time: "Day, ... GMT",    /* time of receipt of input */
  }
  ```

  

## Data Manipulation Performed

The value string received is hased (MD5). The hash is then used to determine four positions from within Pride And Prejudice to read up to 5 words from that point. The first 50 characters of this output is then sent as the next value.

Other book options are available, but must be set in code.
