# YAIMC
"Yet Another In-Memory Cache"

This application implements a basic in-memory [key-value store](https://en.wikipedia.org/wiki/Key-value_database) (conceptually similar to [Memcached](https://memcached.org/)), with support for transactions.

## Getting Started

For a quick and easy way to demo YAIMC, visit https://glitch.com/edit/console.html?yaimc, type `node app.js`, and hit Enter. This will start you right up in the application, where you can run [commands](#basic-commands) immediately. When you are done, simply close the window.

> [Glitch](https://glitch.com/) is a quick and easy way to prototype web applications, with or without Node.js.

Visit https://glitch.com/edit/#!/yaimc to view or remix the code. Note that, while Glitch will reload web apps as they are changed, console apps must be restarted manually (by issuing the `END` command and then restarting with `node app.js`).

### Installation

If you prefer to run YAIMC locally, you will first need to install [Node.js](https://nodejs.org).

> Visit https://nodejs.org/en/download/current/ to download and install the latest version of Node.

After installing Node, download the file [app.js](app.js) to anywhere on your computer. Then open a command prompt in that location, type `node app.js`, and hit Enter to start up YAIMC.

### Usage

YAIMC is very laconic. It won't really give you any feedback as you enter commands, except to let you know if it doesn't recognize a command, or in response to commands like `GET`. Generally speaking, as they say, no news is good news.

### Basic Commands

| Command | Example | Purpose | Notes |
|---------|---------|---------|------|
| SET _key_ _value_ | `SET foo bar` | Set the variable _key_ to _value_. | Neither _key_ nor _value_ should not contain spaces. If _value_ contains spaces, only the first word will be saved. |
| GET _key_ | `GET foo` | Print the value associated to _key_. | Prints `NULL` when _key_ is not set. |
| UNSET _key_ | `UNSET foo` | Remove _key_ (and its associated value) from the cache. | |
| NUMEQUALTO _value_ | `NUMEQUALTO bar` | Print the number of variables that are currently set to _value_. | Prints `0` if no variables are set to _value_. |
| END | `END` | Exit the program. | |

### Transaction Commands

YAIMC supports the notion of _[transactions](https://en.wikipedi.org/wiki/Database_transaction)_ -- in short, commands can be grouped into _blocks_ in order to ensure that related updates all happen in a single [consistent action](https://en.wikipedia.org/wiki/ACID_(computer_science).

| Command | Purpose | Notes |
|---------|---------|------|
| BEGIN | Open a new transaction block. | Transaction blocks can be nested: a `BEGIN` can be issued within an existing block. |
| ROLLBACK | Undo all of the data commands issued within the most recent transaction block and close that block. | Prints `NO TRANSACTION` if no transaction is in progress. |
| COMMIT | Close _all_ open transaction blocks, permanently applying all data commands made within them. | Prints `NO TRANSACTION` if no transaction is in progress. |

> Any command executed outside of a transaction block will be committed immediately.

## Further Development

How could this application be improved?

* This application has not been tested for concurrent use.
* Interaction is through stdin/stdout, which is not necessarily the most flexible or performant.
* For that matter, refactoring to use another I/O method won't be as easy as it could, as I/O was not done through a generic interface.
* Isolation levels for transactions.