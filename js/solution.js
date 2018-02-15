(function (root) {
    var WATER = root.SHRI_ISLANDS.WATER;
    var ISLAND = root.SHRI_ISLANDS.ISLAND;

    var isNewIsland,
        checkAdjacentCells;

    /**
     * Функция находит кол-во островов на карте
     * ВАЖНО! Сигнатуру функции изменять нельзя!
     *
     * @param {number[][]} map карта островов представленная двумерной матрицей чисел
     * @returns {number} кол-во островов
     */
    function solution(map) {
        var mapForCheck = getMapForCheck(map);
        var count = 0;

        isNewIsland = curryIsNewIsland(map, mapForCheck);
        checkAdjacentCells = curryCheckAdjacentCells(map, mapForCheck);

        map.forEach(function(line, lineKey) {
            line.forEach(function(cell, cellKey) {
                if(isNewIsland(lineKey, cellKey)) {
                    count += 1;

                    checkAdjacentCells(lineKey, cellKey);
                }
            })
        })

        return count;
    }

    function curryIsNewIsland(map, mapForCheck) {
        return function(lineKey, cellKey) {
            return !mapForCheck[lineKey][cellKey] && map[lineKey][cellKey] === ISLAND;
        }
    }

    function curryCheckAdjacentCells(map, mapForCheck) {
        return function(lineKey, cellKey) {
            mapForCheck[lineKey][cellKey] = true;

            // проверка клетки слева
            if(cellKey - 1 >= 0 && isNewIsland(lineKey, cellKey - 1)) {
                checkAdjacentCells(lineKey, cellKey - 1);
            }

            // проверка клетки справа
            if(cellKey + 1 < map[lineKey].length && isNewIsland(lineKey, cellKey + 1)) {
                checkAdjacentCells(lineKey, cellKey + 1);
            }

            // проверка клетки сверху
            if(lineKey - 1 >= 0 && isNewIsland(lineKey - 1, cellKey)) {
                checkAdjacentCells(lineKey - 1, cellKey);
            }

            // проверка клетки снизу
            if(lineKey + 1 < map.length && isNewIsland(lineKey + 1, cellKey)) {
                checkAdjacentCells(lineKey + 1, cellKey);
            }
        }
    }

    function getMapForCheck(map) {
        return map.reduce(function(previousLine, currentLine) {
            previousLine.push(currentLine.map(function() {
                return false;
            }));

            return previousLine;
        }, []);
    }

    root.SHRI_ISLANDS.solution = solution;
})(this);
