import { createBackend } from '@backstage/backend-defaults';

import { catalogModuleKeycloakEntityProvider } from '../src/module/catalogModuleKeycloakEntityProvider';

const backend = createBackend();
backend.add(import('@backstage/plugin-catalog-backend/alpha'));
backend.add(catalogModuleKeycloakEntityProvider);
backend.start();
