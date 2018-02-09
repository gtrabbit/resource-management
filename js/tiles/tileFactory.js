define(['tiles/Civic', 'tiles/Square', 'tiles/Wilds'],
    function(Civic, Square, Wilds){

        return function(type, x, y, grid, terrain, growthRate){
            let tile;
            switch(type){
                case 'wilds':
                    tile = new Wilds(x, y, grid, terrain, growthRate);
                    break;

                case 'civic':
                    tile = new Civic(x, y, grid, terrain);
                    break;

                case 'square':
                default:
                    tile = new Square(x, y, grid, terrain);
                    break;
            }

            return tile;
        }
})