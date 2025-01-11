import * as migration_20250110_191955_initial from './20250110_191955_initial';
import * as migration_20250111_124321 from './20250111_124321';

export const migrations = [
  {
    up: migration_20250110_191955_initial.up,
    down: migration_20250110_191955_initial.down,
    name: '20250110_191955_initial',
  },
  {
    up: migration_20250111_124321.up,
    down: migration_20250111_124321.down,
    name: '20250111_124321'
  },
];
