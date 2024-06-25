// Returns all of the knight's legal moves.
function legalMoves(position) {
    const moves = [
        [2, -1], [2, 1], [-2, -1], [-2, 1], [1, -2], [1, 2], [-1, -2], [-1, 2]
    ];
    return moves.map(move => [position[0] + move[0], position[1] + move[1]]);
}

// Will find the optimal path for the knight to take.
function search(start, end) {
    const visited = new Set();
    const queue = [{ position: start, moves: 0, path: [] }];

    while (queue.length > 0) {
        const { position, moves, path } = queue.shift();
        if (JSON.stringify(position) === JSON.stringify(end)) {
            return [...path, position];
        }

        if (!visited.has(JSON.stringify(position))) {
            visited.add(JSON.stringify(position));
            legalMoves(position).forEach(move => {
                const newPosition = [Math.abs(move[0] % 8), Math.abs(move[1] % 8)];
                if (!visited.has(JSON.stringify(newPosition))) {
                    queue.push({ position: newPosition, moves: moves + 1, path: [...path, position] });
                }
            });
        }
    }
    return [];
}

// Wraps everything together.
function knightMoves(start, end) {
    const path = search(start, end);
    if (path.length > 0) {
        return `You made it in ${path.length - 1} moves! Here's your path:\n${path.map(pos => JSON.stringify(pos)).join('\n')}`;
    } else {
        return "No path found.";
    }
}

console.log(knightMoves([0, 1], [0, 1]));