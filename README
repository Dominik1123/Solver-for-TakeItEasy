# Solver for Take It Easy

Computes solutions for the board game Take It Easy where _all_ tiles _fully_ contribute to the final score,
i.e. all lines on the board are without interruption.

The different solutions are stored in JSON format as a list. Each solution has the following format:

    [tile_on_site_0, tile_on_site_1, ..., tile_on_site_18]

where each tile is a list itself, containing the three numbers in the following order `[vertical, counter-clockwise, clockwise]`
(e.g. `[1, 3, 2]`).

The sites on the board are labeled from 0 to 18 as follows:

                  ____
                 /    \
            ____/  0   \____
           /    \      /    \
      ____/  11  \____/  1   \____
     /    \      /    \      /    \
    /  10  \____/  12  \____/  2   \
    \      /    \      /    \      /
     \____/  17  \____/  13  \____/
     /    \      /    \      /    \
    /  9   \____/  18  \____/  3   \
    \      /    \      /    \      /
     \____/  16  \____/  14  \____/
     /    \      /    \      /    \
    /  8   \____/  15  \____/  4   \
    \      /    \      /    \      /
     \____/  7   \____/  5   \____/
          \      /    \      /
           \____/  6   \____/
                \      /
                 \____/
