import Rollbar from 'rollbar';
import config from 'config';

let rollbarInstance;

function isRollbarEnabled() {
  return config.rollbar.enabled && window.location.hostname !== 'localhost';
}

export const initRollbar = () => {
  if (isRollbarEnabled()) {
    rollbarInstance = new Rollbar({
      accessToken: config.rollbar.accessToken,
      captureUncaught: true,
      captureUnhandledRejections: true,
      payload: {
        environment: config.env,
        client: {
          javascript: {
            source_map_enabled: true,
            guess_uncaught_frames: true,
          },
        },
      },
      autoInstrument: true,
      scrubTelemetryInputs: true,
    });

    window.rollbarInstance = rollbarInstance;
  }
};

export const configureRollbar = (rollbarConfig) => {
  if (isRollbarEnabled() && rollbarInstance) {
    rollbarInstance.configure({
      payload: rollbarConfig,
    });
  }
};

export const sendErrorToRollbar = (e) => {
  if (isRollbarEnabled()) {
    rollbarInstance.error(e, { sentManually: true });
  }
};

export const sendCriticalToRollbar = (e) => {
  if (isRollbarEnabled()) {
    rollbarInstance.critical(e, { sentManually: true });
  }
};

export const setTenantId = (tenantIdentifier) => {
  configureRollbar({
    custom: {
      tenantIdentifier,
    },
  });
};
