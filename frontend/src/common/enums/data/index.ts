import { ApiPaths, ApiRoutes } from 'shared/dist';

enum DataStatus {
  IDLE = 'idle',
  PENDING = 'pending',
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected',
}

export { ApiPaths, ApiRoutes, DataStatus };
