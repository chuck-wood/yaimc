'use strict';

process.stdin.setEncoding('utf8');

const pages = [];
pages.push({});

process.stdin.on('readable', () => {
    let chunk;
    while ((chunk = process.stdin.read()) !== null) {

        if (!chunk.trim()) return;

        const params = chunk
            .split(/\s/)
            .filter(p => !!p)
            .map(p => p.trim())
        ;

        const cmdName = params.shift();
        if (!cmdName) return;

        const command = commands[cmdName.toUpperCase()];
        if (command instanceof Function) {
            const result = command(params);
            if (result !== undefined && result !== null) {
                console.log(result);
            }
        } else {
            console.log(`${cmdName} is not a valid command`);
        }

    }
});

const commands = {

    "SET": params => {
        const [key, val] = params.splice(0,2);
        if (!key) return;
        getCurrentPage()[key] = val;
    },

    "GET": params => {
        const key = params.shift();
        if (!key) return;
        const val = getCurrentPage()[key];
        return val || "NULL";
    },

    "UNSET": params => {
        const key = params.shift();
        getCurrentPage()[key] = undefined;
    },

    "NUMEQUALTO": params => {
        const val = params.shift();
        const page = getCurrentPage();
        return Object.keys(page).reduce((count, key) => {
            if (page[key] === val) count++;
            return count;
        }, 0);
    },

    "BEGIN": () => {
        // NB: shallow copy!
        const page = {...pages[pages.length-1]};
        pages.push(page);
    },

    "COMMIT": () => {
        if (pages.length === 1) return "NO TRANSACTION";
        const length = pages.length;
        for (let i = length - 1; i > 0; i--) {
            let current = pages[i];
            let prev = pages[i-1];

            // NB: shallow copy!
            pages[i-1] = {...prev, ...current};
            pages.pop();
        }
    },

    "ROLLBACK": () => {
        if (pages.length === 1) return "NO TRANSACTION";
        pages.pop();
    },

    "END": () => {
        process.exit(0);
    }

};

function getCurrentPage() {
    return pages[pages.length-1];
}

