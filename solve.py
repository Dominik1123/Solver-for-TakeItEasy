from argparse import ArgumentParser
import itertools as it
import json


# Order: vertical (top), counter-clockwise rotated, clockwise rotated.
groups = [(1, 5, 9), (3, 4, 8), (2, 6, 7)]
tiles = list(it.product(*groups))


class Node:
    def __init__(self, nr):
        self.nr = nr
        self.tile = None
        # For each node number the neighbors clockwise starting at the topmost one.
        self.neighbors = [None] * 6


nodes = [Node(i) for i in range(19)]

nodes[0].neighbors[2] = nodes[1]
nodes[0].neighbors[3] = nodes[12]
nodes[0].neighbors[4] = nodes[11]

nodes[1].neighbors[2] = nodes[2]
nodes[1].neighbors[3] = nodes[13]
nodes[1].neighbors[4] = nodes[12]
nodes[1].neighbors[5] = nodes[0]

nodes[2].neighbors[3] = nodes[3]
nodes[2].neighbors[4] = nodes[13]
nodes[2].neighbors[5] = nodes[1]

nodes[3].neighbors[0] = nodes[2]
nodes[3].neighbors[3] = nodes[4]
nodes[3].neighbors[4] = nodes[14]
nodes[3].neighbors[5] = nodes[13]

nodes[4].neighbors[0] = nodes[3]
nodes[4].neighbors[4] = nodes[5]
nodes[4].neighbors[5] = nodes[14]

nodes[5].neighbors[0] = nodes[14]
nodes[5].neighbors[1] = nodes[4]
nodes[5].neighbors[4] = nodes[6]
nodes[5].neighbors[5] = nodes[15]

nodes[6].neighbors[0] = nodes[15]
nodes[6].neighbors[1] = nodes[5]
nodes[6].neighbors[5] = nodes[7]

nodes[7].neighbors[0] = nodes[16]
nodes[7].neighbors[1] = nodes[15]
nodes[7].neighbors[2] = nodes[6]
nodes[7].neighbors[5] = nodes[8]

nodes[8].neighbors[0] = nodes[9]
nodes[8].neighbors[1] = nodes[16]
nodes[8].neighbors[2] = nodes[7]

nodes[9].neighbors[0] = nodes[10]
nodes[9].neighbors[1] = nodes[17]
nodes[9].neighbors[2] = nodes[16]
nodes[9].neighbors[3] = nodes[8]

nodes[10].neighbors[1] = nodes[11]
nodes[10].neighbors[2] = nodes[17]
nodes[10].neighbors[3] = nodes[9]

nodes[11].neighbors[1] = nodes[0]
nodes[11].neighbors[2] = nodes[12]
nodes[11].neighbors[3] = nodes[17]
nodes[11].neighbors[4] = nodes[10]

nodes[12].neighbors[0] = nodes[0]
nodes[12].neighbors[1] = nodes[1]
nodes[12].neighbors[2] = nodes[13]
nodes[12].neighbors[3] = nodes[18]
nodes[12].neighbors[4] = nodes[17]
nodes[12].neighbors[5] = nodes[11]

nodes[13].neighbors[0] = nodes[1]
nodes[13].neighbors[1] = nodes[2]
nodes[13].neighbors[2] = nodes[3]
nodes[13].neighbors[3] = nodes[14]
nodes[13].neighbors[4] = nodes[18]
nodes[13].neighbors[5] = nodes[12]

nodes[14].neighbors[0] = nodes[13]
nodes[14].neighbors[1] = nodes[3]
nodes[14].neighbors[2] = nodes[4]
nodes[14].neighbors[3] = nodes[5]
nodes[14].neighbors[4] = nodes[15]
nodes[14].neighbors[5] = nodes[18]

nodes[15].neighbors[0] = nodes[18]
nodes[15].neighbors[1] = nodes[14]
nodes[15].neighbors[2] = nodes[5]
nodes[15].neighbors[3] = nodes[6]
nodes[15].neighbors[4] = nodes[7]
nodes[15].neighbors[5] = nodes[16]

nodes[16].neighbors[0] = nodes[17]
nodes[16].neighbors[1] = nodes[18]
nodes[16].neighbors[2] = nodes[15]
nodes[16].neighbors[3] = nodes[7]
nodes[16].neighbors[4] = nodes[8]
nodes[16].neighbors[5] = nodes[9]

nodes[17].neighbors[0] = nodes[11]
nodes[17].neighbors[1] = nodes[12]
nodes[17].neighbors[2] = nodes[18]
nodes[17].neighbors[3] = nodes[16]
nodes[17].neighbors[4] = nodes[9]
nodes[17].neighbors[5] = nodes[10]

nodes[18].neighbors[0] = nodes[12]
nodes[18].neighbors[1] = nodes[13]
nodes[18].neighbors[2] = nodes[14]
nodes[18].neighbors[3] = nodes[15]
nodes[18].neighbors[4] = nodes[16]
nodes[18].neighbors[5] = nodes[17]


# "Neighbor-to-number indices";
# Indicate which number on a tile is relevant for a given neighbor index.
ntn_indices = {
    0: 0,
    1: 2,
    2: 1,
    3: 0,
    4: 2,
    5: 1,
}


class Board:
    def __init__(self, nodes):
        self.nodes = nodes

    def solve(self, tiles, debug_depth=0):
        debug_range = range(debug_depth)

        current_node = 0
        tile_used = [False] * len(tiles)
        solutions = []

        def _check_neighbors(node, tile):
            """Check if the given tile fits the numbers of all surrounding neighbors."""
            return all(map(
                lambda x: x[1] is None or x[1].tile is None or x[1].tile[ntn_indices[x[0]]] == tile[ntn_indices[x[0]]],
                enumerate(node.neighbors)
            ))

        def _solve():
            nonlocal debug_range
            nonlocal current_node
            nonlocal tile_used
            nonlocal solutions

            if sum(tile_used) == 19:
                s = list(map(lambda n: n.tile, self.nodes))
                solutions.append(s)
                return None

            not_used = filter(lambda x: not tile_used[x[0]], enumerate(tiles))
            fits = list(filter(
                lambda x: _check_neighbors(self.nodes[current_node], x[1]),
                not_used
            ))

            for index, tile in fits:
                if current_node in debug_range:
                    print(('  ' * current_node) + '[Node #{}] Placing tile #{} {}'.format(current_node, index, tile))
                self.nodes[current_node].tile = tile
                tile_used[index] = True
                current_node += 1
                _solve()
                current_node -= 1
                tile_used[index] = False
                self.nodes[current_node].tile = None

            return None

        _solve()
        return solutions


if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('--debug-depth', default=5, type=int)
    args = parser.parse_args()

    board = Board(nodes)
    solutions = board.solve(tiles, args.debug_depth)
    print('#solutions: ', len(solutions))

    with open('solutions.json', 'w') as fp:
        json.dump(solutions, fp)
