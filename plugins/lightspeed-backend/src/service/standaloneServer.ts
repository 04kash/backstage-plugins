import {
  createServiceBuilder,
  loadBackendConfig,
} from '@backstage/backend-common';
import { LoggerService } from '@backstage/backend-plugin-api';

import { Server } from 'http';

import { createRouter } from './router';

export interface ServerOptions {
  port: number;
  enableCors: boolean;
  logger: LoggerService;
}

export async function startStandaloneServer(
  options: ServerOptions,
): Promise<Server> {
  const logger = options.logger.child({ service: 'lightspeed-backend' });
  const config = await loadBackendConfig({ logger, argv: process.argv });
  logger.debug('Starting application server...');
  const router = await createRouter({
    logger,
    config,

    // TODO: for user authentication
    // httpAuth: mockServices.httpAuth({
    //   pluginId: 'lightspeed',
    //   defaultCredentials: mockCredentials.user(),
    // }),
    // userInfo: mockServices.userInfo({
    //   userEntityRef: 'user1',
    // }),
  });

  let service = createServiceBuilder(module)
    .setPort(options.port)
    .addRouter('/lightspeed', router);
  if (options.enableCors) {
    service = service.enableCors({ origin: 'http://localhost:3000' });
  }

  return await service.start().catch(err => {
    logger.error('Dev server failed:', err);
    process.exit(1);
  });
}

module.hot?.accept();
