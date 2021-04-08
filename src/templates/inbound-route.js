import { v4 as uuidv4 } from 'uuid';

const dataClassifiers = {
  'credit-card-number': 'card-number',
  'card-security-code': 'cvv',
  'card-expiration-date': 'expiry',
  'ssn': 'ssn',
  'password': 'password',
}


const getEntry = (endpoint, name, type) => {
  const tag = dataClassifiers[type];
  return {
    "classifiers": tag ? {"TAGS": tag} : {},
    "config": {
      "condition": "AND",
      "rules": [
          {
            "condition": null,
            "expression": {
                "field": "PathInfo",
                "operator": "equals",
                "type": "string",
                "values": [
                  endpoint
                ]
            }
          },
          {
            "condition": null,
            "expression": {
                "field": "ContentType",
                "operator": "equals",
                "type": "string",
                "values": [
                  "application/json;charset=UTF-8"
                ]
            }
          }
      ]
    },
    "id": uuidv4(),
    "id_selector": null,
    "operation": "REDACT",
    "operations": null,
    "phase": "REQUEST",
    "public_token_generator": "UUID",
    "targets": [
      "body"
    ],
    "token_manager": `${type === 'card-security-code' ? "VOLATILE" : "PERSISTENT"}`,
    "transformer": "JSON_PATH",
    "transformer_config": [
      `$.${name}`
    ],
    "transformer_config_map": null
  }
}


const getRouteConfig = (state) => {
  return {
    "data": [
        {
          "attributes": {
              "destination_override_endpoint": "https://echo.apps.verygood.systems",
              "entries": state.form.map(field => getEntry(state.endpoint, field.name, field.type)),
              "host_endpoint": "(.*)\\.verygoodproxy\\.io",
              "port": 80,
              "protocol": "http",
              "source_endpoint": "*",
              "transport": "HTTP",
              "tags": {
                "name": "echo.apps.verygood.systems-collect-form",
                "source": "Collect Form Builder"
              },
          },
          "type": "rule_chain"
        }
    ],
    "version": 1
  }
};

export default getRouteConfig;
